import test from 'node:test';
import assert from 'node:assert/strict';
import { productInput, listInput, imageEdits, validateTree, catalogRoles, version, CatalogError } from '../src/lib/catalog/validation.mjs';
import { roleAllowed } from '../src/lib/auth/crypto.mjs';
const valid = { model: 'ICB-TEST', name: 'Test', slug: 'icb-test', brandId: 'b', categoryId: 'c', status: 'DRAFT', features: ['Feature'], specs: { Width: '30 inches' } };
const invalid = fn => assert.throws(fn, CatalogError);
test('catalog fields are validated and private fields cannot be mutated', () => {
  const result = productInput({ ...valid, price: 2, stock: 20, role: 'ADMIN' });
  assert.equal(result.model, valid.model); assert.equal(result.price, undefined); assert.equal(result.stock, undefined);
  for (const patch of [{ model: '' }, { slug: '../file' }, { status: 'PUBLISHED' }, { features: [''] }, { specs: { Width: 30 } }, { name: 'x'.repeat(192) }, { description: 'x'.repeat(16001) }]) invalid(() => productInput({ ...valid, ...patch }));
  invalid(() => productInput(null)); invalid(() => productInput([]));
});
test('server pagination and filters reject invalid requests', () => {
  assert.equal(listInput(new URLSearchParams()).page, 1);
  assert.equal(listInput(new URLSearchParams('page=2&q=oven&status=ACTIVE&deleted=deleted')).page, 2);
  for (const query of ['page=0','page=-1','page=1.2','page=1000000','deleted=all','status=bad',`q=${'x'.repeat(101)}`]) invalid(() => listInput(new URLSearchParams(query)));
});
test('tree rejects cycles, unknown parents and mixed brand ancestors', () => {
  const rows = [{ id: 'a', parentId: null, brandId: 'b' }, { id: 'c', parentId: 'a', brandId: null }];
  validateTree(rows, 'd', 'c', 'b');
  invalid(() => validateTree(rows, 'a', 'c', 'b')); invalid(() => validateTree(rows, 'd', 'missing', 'b')); invalid(() => validateTree(rows, 'd', 'c', 'other'));
});
test('image order must be an exact permutation with bounded alt', () => {
  assert.deepEqual(imageEdits([{ id: '2', alt: 'Second' }, { id: '1', alt: 'First' }], ['1','2']).map(i => i.sortOrder), [0,1]);
  invalid(() => imageEdits([{ id: '1' }, { id: '1' }], ['1','2'])); invalid(() => imageEdits([{ id: 'other' }], ['1'])); invalid(() => imageEdits([{ id: '1', alt: 'x'.repeat(501) }], ['1']));
});
test('STAFF can write but only ADMIN deletes and restores', () => {
  for (const role of ['ADMIN','STAFF']) for (const operation of ['read','write']) assert(roleAllowed(role, catalogRoles[operation]));
  for (const operation of ['delete','restore']) { assert(roleAllowed('ADMIN',catalogRoles[operation])); assert(!roleAllowed('STAFF',catalogRoles[operation])); }
  for (const operation of Object.keys(catalogRoles)) assert(!roleAllowed('FORGED',catalogRoles[operation]));
});
test('optimistic version requires a real timestamp', () => { assert.equal(version('2026-10-05T00:00:00.000Z').getUTCFullYear(), 2026); for (const value of [null, '', 'wrong', {}, '2026-99-99T00:00:00Z']) invalid(() => version(value)); });
