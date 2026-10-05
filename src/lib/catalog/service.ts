import 'server-only';
import { Prisma } from '@prisma/client';
import { getPrisma } from '@/lib/prisma';
import { CatalogError, productInput, version, listInput, text, slug, validateTree } from './validation.mjs';

export const productSelect = { id: true, model: true, name: true, slug: true, brandId: true, categoryId: true, series: true, type: true, width: true, finish: true, description: true, featuresJson: true, specsJson: true, status: true, deletedAt: true, updatedAt: true, images: { orderBy: [{ sortOrder: 'asc' as const }, { id: 'asc' as const }] } } satisfies Prisma.ProductSelect;
export async function catalogOptions() {
  const db = getPrisma();
  const [brands, categories] = await Promise.all([db.brand.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, slug: true } }), db.productCategory.findMany({ orderBy: { name: 'asc' }, select: { id: true, name: true, slug: true, parentId: true, brandId: true } })]);
  return { brands, categories };
}
export async function listProducts(params: URLSearchParams) {
  const filters = listInput(params);
  const where: Prisma.ProductWhereInput = { deletedAt: filters.deleted === 'deleted' ? { not: null } : null,
    ...(filters.status ? { status: filters.status as 'DRAFT' | 'ACTIVE' | 'ARCHIVED' } : {}),
    ...(filters.brandId ? { brandId: filters.brandId } : {}), ...(filters.categoryId ? { categoryId: filters.categoryId } : {}),
    ...(filters.q ? { OR: ['model', 'name', 'slug'].map(key => ({ [key]: { contains: filters.q } })) } : {}) };
  return getPrisma().$transaction(async tx => {
    const total = await tx.product.count({ where });
    const pages = Math.max(1, Math.ceil(total / filters.pageSize));
    const page = Math.min(filters.page, pages);
    const products = await tx.product.findMany({ where, skip: (page - 1) * filters.pageSize, take: filters.pageSize, orderBy: [{ updatedAt: 'desc' }, { id: 'asc' }], select: { id: true, model: true, name: true, status: true, deletedAt: true, brand: { select: { name: true } }, category: { select: { name: true } } } });
    return { products, total, page, pages, filters };
  }, { isolationLevel: Prisma.TransactionIsolationLevel.RepeatableRead });
}
export async function audit(tx: Prisma.TransactionClient, userId: string, action: string, entity: string, entityId: string) {
  await tx.auditLog.create({ data: { userId, action, entity, entityId } });
}
export async function lockProduct(tx: Prisma.TransactionClient, id: string, expected?: unknown, allowDeleted = false) {
  await tx.$queryRaw`SELECT id FROM Product WHERE id = ${id} FOR UPDATE`;
  const product = await tx.product.findUnique({ where: { id }, select: productSelect });
  if (!product) throw new CatalogError(404, 'Product not found.');
  if (!allowDeleted && product.deletedAt) throw new CatalogError(409, 'Restore this product before editing.');
  if (expected !== undefined && product.updatedAt.getTime() !== version(expected).getTime()) throw new CatalogError(409, 'Product changed. Reload before saving.');
  return product;
}
export async function saveProduct(userId: string, input: unknown, id?: string) {
  const data = productInput(input) as unknown as Omit<Prisma.ProductUncheckedCreateInput, 'id'>;
  return getPrisma().$transaction(async tx => {
    if (id) await lockProduct(tx, id, (input as { updatedAt?: string }).updatedAt ?? null);
    const category = await tx.productCategory.findUnique({ where: { id: data.categoryId } });
    if (!category || !await tx.brand.findUnique({ where: { id: data.brandId } })) throw new CatalogError(422, 'Choose an existing brand and category.');
    const rows = await tx.productCategory.findMany();
    validateTree(rows, category.id, category.parentId, data.brandId);
    if (category.brandId && category.brandId !== data.brandId) throw new CatalogError(422, 'Category belongs to another brand.');
    const product = id ? await tx.product.update({ where: { id }, data, select: productSelect }) : await tx.product.create({ data, select: productSelect });
    await audit(tx, userId, id ? 'UPDATE' : 'CREATE', 'Product', product.id);
    return product;
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}
export async function productLifecycle(userId: string, id: string, input: { updatedAt?: string }, restore: boolean) {
  return getPrisma().$transaction(async tx => {
    const old = await lockProduct(tx, id, input.updatedAt ?? null, true);
    if (restore !== Boolean(old.deletedAt)) throw new CatalogError(409, restore ? 'Product is already restored.' : 'Product is already deleted.');
    const product = await tx.product.update({ where: { id }, data: { deletedAt: restore ? null : new Date(), ...(restore ? { status: 'DRAFT' } : {}) }, select: productSelect });
    await audit(tx, userId, restore ? 'RESTORE_AS_DRAFT' : 'SOFT_DELETE', 'Product', id);
    return product;
  });
}
export async function saveTaxonomy(userId: string, kind: 'brands' | 'categories', input: Record<string, unknown>, id?: string) {
  const data = { name: text(input.name, 'name', 191, true)!, slug: slug(input.slug)! };
  return getPrisma().$transaction(async tx => {
    let record;
    if (kind === 'brands') record = id ? await tx.brand.update({ where: { id }, data }) : await tx.brand.create({ data });
    else {
      const parentId = text(input.parentId, 'parentId'); const brandId = text(input.brandId, 'brandId');
      const rows = await tx.productCategory.findMany();
      validateTree(rows, id || '', parentId, brandId);
      if (brandId && !await tx.brand.findUnique({ where: { id: brandId } })) throw new CatalogError(422, 'Brand does not exist.');
      // Check every descendant and assigned product when changing an existing branch brand.
      if (id) {
        const affected = new Set([id]);
        for (let changed = true; changed;) { changed = false; for (const row of rows) if (row.parentId && affected.has(row.parentId) && !affected.has(row.id)) { affected.add(row.id); changed = true; } }
        if (brandId && (rows.some(r => affected.has(r.id) && r.id !== id && r.brandId && r.brandId !== brandId) || await tx.product.count({ where: { categoryId: { in: [...affected] }, brandId: { not: brandId } } }))) throw new CatalogError(422, 'Branch contains products or categories of another brand.');
      }
      const category = { ...data, parentId, brandId };
      record = id ? await tx.productCategory.update({ where: { id }, data: category }) : await tx.productCategory.create({ data: category });
    }
    await audit(tx, userId, id ? 'UPDATE' : 'CREATE', kind, record.id);
    return record;
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}
export async function deleteTaxonomy(userId: string, kind: 'brands' | 'categories', id: string) {
  return getPrisma().$transaction(async tx => {
    if (await tx.product.count({ where: kind === 'brands' ? { brandId: id } : { categoryId: id } })) throw new CatalogError(409, 'Record is used by products, including deleted products.');
    if (kind === 'brands' ? await tx.productCategory.count({ where: { brandId: id } }) : await tx.productCategory.count({ where: { parentId: id } })) throw new CatalogError(409, 'Move associated categories first.');
    if (kind === 'brands') await tx.brand.delete({ where: { id } }); else await tx.productCategory.delete({ where: { id } });
    await audit(tx, userId, 'DELETE', kind, id);
    return { id };
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
}
