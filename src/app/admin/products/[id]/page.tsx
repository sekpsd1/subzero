import { notFound } from 'next/navigation';
import { requirePage } from '@/lib/auth/server';
import { getPrisma } from '@/lib/prisma';
import { catalogOptions, productSelect } from '@/lib/catalog/service';
import CatalogShell from '@/components/AdminCatalog/CatalogShell';
import ProductEditor from '@/components/AdminCatalog/ProductEditor';
export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requirePage(['ADMIN','STAFF']); const { id } = await params;
  const product = await getPrisma().product.findUnique({ where: { id }, select: productSelect });
  if (!product) notFound();
  return <CatalogShell title={`Edit ${product.model}`}><ProductEditor key={product.updatedAt.toISOString()} initial={{ ...product, updatedAt: product.updatedAt.toISOString(), deletedAt: product.deletedAt?.toISOString() || null }} options={await catalogOptions()} admin={session.user.role === 'ADMIN'} /></CatalogShell>;
}
