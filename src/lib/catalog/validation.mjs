export class CatalogError extends Error {
  constructor(status, message, fields = {}) { super(message); this.status = status; this.fields = fields; }
}
/** @type {Record<'read'|'write'|'delete'|'restore', import('@prisma/client').UserRole[]>} */
export const catalogRoles = { read: ['ADMIN', 'STAFF'], write: ['ADMIN', 'STAFF'], delete: ['ADMIN'], restore: ['ADMIN'] };
export function object(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new CatalogError(422, 'Expected an object.');
  return value;
}
export function text(value, field, max = 191, required = false) {
  if (value == null && !required) return null;
  if (typeof value !== 'string' || value.trim().length > max || (required && !value.trim()) || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) {
    throw new CatalogError(422, `Invalid ${field}.`, { [field]: `Required text, maximum ${max} characters.` });
  }
  return value.trim() || null;
}
export function slug(value) {
  const result = text(value, 'slug', 191, true);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(result)) throw new CatalogError(422, 'Slug must use lowercase letters, numbers and single hyphens.', { slug: 'Invalid slug.' });
  return result;
}
export function productInput(input) {
  const body = object(input);
  const data = {};
  for (const key of ['model', 'name', 'brandId', 'categoryId']) data[key] = text(body[key], key, 191, true);
  data.slug = slug(body.slug);
  for (const key of ['series', 'type', 'width', 'finish']) data[key] = text(body[key], key);
  data.description = text(body.description, 'description', 16000);
  if (!['DRAFT', 'ACTIVE', 'ARCHIVED'].includes(body.status)) throw new CatalogError(422, 'Invalid product status.', { status: 'Choose Draft, Active or Archived.' });
  data.status = body.status;
  if (!Array.isArray(body.features) || body.features.length > 100 || body.features.some(v => typeof v !== 'string' || !v.trim() || v.length > 1000)) throw new CatalogError(422, 'Features must be up to 100 non-empty text entries.', { features: 'Invalid features.' });
  data.featuresJson = body.features.map(v => v.trim());
  const specs = object(body.specs);
  if (Object.keys(specs).length > 100 || Object.entries(specs).some(([k,v]) => !k.trim() || k.length > 100 || ['__proto__', 'constructor', 'prototype'].includes(k) || typeof v !== 'string' || v.length > 2000)) throw new CatalogError(422, 'Specs must be up to 100 text key/value pairs.', { specs: 'Invalid specifications.' });
  data.specsJson = specs;
  return data;
}
export function version(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}T/.test(value) || !Number.isFinite(Date.parse(value))) throw new CatalogError(422, 'Reload the product before saving.');
  return new Date(value);
}
export function listInput(params) {
  const page = params.get('page') || '1';
  if (!/^[1-9]\d{0,5}$/.test(page)) throw new CatalogError(422, 'Invalid page.');
  const status = params.get('status') || '';
  if (status && !['DRAFT', 'ACTIVE', 'ARCHIVED'].includes(status)) throw new CatalogError(422, 'Invalid status filter.');
  const deleted = params.get('deleted') || 'live';
  if (!['live', 'deleted'].includes(deleted)) throw new CatalogError(422, 'Invalid deleted filter.');
  return { page: Number(page), pageSize: 20, q: text(params.get('q'), 'search', 100) || '', status, deleted,
    brandId: text(params.get('brandId'), 'brandId') || '', categoryId: text(params.get('categoryId'), 'categoryId') || '' };
}
export function imageEdits(value, currentIds) {
  if (!Array.isArray(value) || value.length !== currentIds.length || new Set(value.map(i => i?.id)).size !== value.length || value.some(i => !currentIds.includes(i?.id))) throw new CatalogError(409, 'Images changed. Reload before sorting.');
  return value.map((i, sortOrder) => ({ id: i.id, alt: text(i.alt, 'alt', 500), sortOrder }));
}
export function validateTree(rows, id, parentId, brandId) {
  const seen = new Set([id]);
  let next = parentId;
  while (next) {
    if (seen.has(next)) throw new CatalogError(422, 'Category parent would create a cycle.');
    seen.add(next);
    const parent = rows.find(r => r.id === next);
    if (!parent) throw new CatalogError(422, 'Parent category does not exist.');
    if (parent.brandId && parent.brandId !== brandId) throw new CatalogError(422, 'Parent category belongs to another brand.');
    next = parent.parentId;
  }
}
