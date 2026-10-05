import 'dotenv/config';
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import path from 'node:path';
import { unlink } from 'node:fs/promises';
import sharp from 'sharp';
import { getPrisma } from './admin-db.mjs';
import { digest, randomToken } from '../src/lib/auth/crypto.mjs';
const base = process.env.NEXT_PUBLIC_SITE_URL;
if (base !== 'https://new.subzerowolf-sea.com' || path.basename(process.cwd()) !== 'new.subzerowolf-sea.com') throw Error('Staging only.');
const db = getPrisma(), marker = `catalog-test-${randomBytes(8).toString('hex')}`;
const users = [], brands = [], categories = [], products = [], imageIds = [];
let checks = 0;
function ok(value, name) { assert(value, name); checks++; console.log('PASS', name); }
async function call(route, { method = 'GET', body, cookie, origin = base, contentType, raw } = {}) {
  const response = await fetch(base + route, { method, redirect: 'manual', headers: { ...(cookie ? { cookie } : {}), ...(origin ? { origin } : {}), ...(body ? { 'content-type': 'application/json' } : {}), ...(contentType ? { 'content-type': contentType } : {}) }, ...(body ? { body: JSON.stringify(body) } : raw ? { body: raw } : {}) });
  let value; try { value = await response.json(); } catch { value = null; }
  return { status: response.status, value };
}
try {
  const ownerBefore = await db.user.findMany({ where: { role: 'ADMIN' }, select: { id: true, updatedAt: true } });
  for (const role of ['ADMIN','STAFF']) {
    const user = await db.user.create({ data: { name: 'Disposable catalog test', email: `${marker}-${role}@example.invalid`, role, passwordHash: 'disabled-disposable-test-no-login' } }); users.push(user.id);
    const token = randomToken(); await db.adminSession.create({ data: { userId: user.id, tokenHash: digest(token), expiresAt: new Date(Date.now() + 15 * 60 * 1000) } }); user.cookie = `__Host-sz-admin=${token}`; users[role] = user;
  }
  const admin = users.ADMIN.cookie, staff = users.STAFF.cookie;
  ok((await call('/api/admin/products')).status === 401, 'unauthenticated API denied');
  ok((await call('/admin/products')).status === 307, 'unauthenticated page redirected');
  for (const route of ['/api/admin/products','/api/admin/catalog/brands','/api/admin/catalog/categories']) ok((await call(route,{method:'POST',cookie:staff,origin:'https://example.com',body:{}})).status === 403, `Origin denied ${route}`);
  ok((await call('/api/admin/products',{method:'POST',cookie:staff,origin:null,body:{}})).status === 403, 'missing Origin denied');
  ok((await call('/api/admin/products',{method:'POST',cookie:staff,body:{}})).status === 422, 'invalid fields denied');
  ok((await call('/api/admin/products',{method:'POST',cookie:staff,raw:'{broken',contentType:'application/json'})).status === 400, 'malformed JSON denied');
  ok((await call('/api/admin/products',{method:'POST',cookie:staff,raw:'x'.repeat(262145),contentType:'application/json'})).status === 413, 'bounded JSON request');
  let r = await call('/api/admin/catalog/brands',{method:'POST',cookie:staff,body:{name:marker,slug:marker}}); ok(r.status === 201,'STAFF creates brand'); const brand = r.value.data; brands.push(brand.id);
  r = await call('/api/admin/catalog/categories',{method:'POST',cookie:staff,body:{name:marker,slug:marker,brandId:brand.id}}); ok(r.status === 201,'STAFF creates category'); const category = r.value.data; categories.push(category.id);
  r = await call('/api/admin/catalog/categories',{method:'POST',cookie:staff,body:{name:marker+' child',slug:marker+'-child',brandId:brand.id,parentId:category.id}}); ok(r.status === 201,'subcategory persisted'); const child = r.value.data; categories.push(child.id);
  ok((await call('/api/admin/catalog/categories',{method:'PATCH',cookie:staff,body:{...category,parentId:child.id}})).status === 422,'category cycle denied');
  ok((await call('/api/admin/catalog/brands',{method:'POST',cookie:staff,body:{name:marker,slug:marker}})).status === 409,'duplicate taxonomy denied');
  const payload = { model: marker, name: 'Database product', slug: marker, brandId:brand.id, categoryId:child.id, series:'Test series',type:'Oven',width:'30',finish:'Steel',description:'Persistent description',features:['Test feature'],specs:{Width:'30 inches'},status:'DRAFT',price:777,stock:999,role:'ADMIN' };
  r = await call('/api/admin/products',{method:'POST',cookie:staff,body:payload}); ok(r.status === 201,'STAFF creates Draft product'); let product = r.value.data; products.push(product.id);
  const route = `/api/admin/products/${product.id}`;
  ok((await db.product.findUnique({where:{id:product.id}})).description === payload.description,'actual MySQL persistence');
  ok((await db.product.findUnique({where:{id:product.id}})).price === null,'private field injection ignored');
  ok((await call(route,{cookie:staff})).value.data.specsJson.Width === '30 inches','reload retains specs');
  ok(!(await call('/api/products')).value.data.some(p=>p.model === marker),'public Draft hidden');
  ok((await call('/api/admin/products',{method:'POST',cookie:staff,body:payload})).status === 409,'duplicate model/slug denied');
  const originalVersion = product.updatedAt;
  r = await call(route,{method:'PATCH',cookie:staff,body:{...payload,name:'Edited database product',updatedAt:product.updatedAt}}); ok(r.status === 200,'STAFF update persisted'); product = r.value.data;
  ok((await call(route,{method:'PATCH',cookie:staff,body:{...payload,updatedAt:originalVersion}})).status === 409,'stale update denied');
  ok((await call(route,{method:'DELETE',cookie:staff,body:{updatedAt:product.updatedAt,role:'ADMIN'}})).status === 403,'STAFF cannot delete with forged role');
  const png = await sharp({create:{width:40,height:30,channels:3,background:'#999'}}).png().toBuffer();
  async function upload(bytes,mime='image/png') { const form = new FormData(); form.set('file',new Blob([bytes],{type:mime}),'test.png'); form.set('alt','Test alt'); form.set('updatedAt',product.updatedAt); return call(route+'/images',{method:'POST',cookie:staff,raw:form}); }
  ok((await upload(Buffer.from('<svg/>'),'image/svg+xml')).status === 415,'SVG rejected');
  ok((await upload(Buffer.from('not an image'))).status === 422,'spoofed image rejected');
  ok((await upload(png,'image/jpeg')).status === 422,'MIME mismatch rejected');
  ok((await upload(Buffer.alloc(5*1024*1024+1))).status === 422,'oversized file rejected');
  r = await upload(png); ok(r.status === 201,'decoded image uploaded'); imageIds.push(r.value.data.id);
  product = (await call(route,{cookie:staff})).value.data;
  ok((await call(product.images[0].url)).status === 404,'public Draft image denied');
  ok((await fetch(base+product.images[0].url,{headers:{cookie:staff}})).status === 200,'authenticated image served');
  r = await upload(png); ok(r.status === 201,'second image uploaded'); imageIds.push(r.value.data.id); product = (await call(route,{cookie:staff})).value.data;
  const edits = [...product.images].reverse().map((i,index)=>({id:i.id,alt:'Alt '+index}));
  r = await call(route+'/images',{method:'PATCH',cookie:staff,body:{updatedAt:product.updatedAt,images:edits}}); ok(r.status === 200,'image order and alt saved'); product = (await call(route,{cookie:staff})).value.data;
  ok(product.images[0].id === edits[0].id && product.images[0].alt === 'Alt 0','image reload preserves order/alt');
  ok((await call(route+'/images',{method:'PATCH',cookie:staff,body:{updatedAt:product.updatedAt,images:[{id:'foreign'}]}})).status === 409,'foreign image permutation denied');
  r = await call(route,{method:'PATCH',cookie:staff,body:{...payload,status:'ACTIVE',updatedAt:product.updatedAt}}); ok(r.status === 200,'Active persisted'); product = r.value.data;
  await db.product.update({where:{id:product.id},data:{price:777,showPrice:false}});
  let publicProduct = (await call('/api/products')).value.data.find(p=>p.model === marker);
  ok(publicProduct && Object.keys(publicProduct).sort().join(',') === 'brand,category,finish,image,model,series,type,width','public contract exact allowlist no price/stock/reserved');
  ok((await fetch(base+product.images[0].url)).status === 200,'public Active image served');
  product = (await call(route,{cookie:staff})).value.data;
  r = await call(route,{method:'PATCH',cookie:staff,body:{...payload,status:'ARCHIVED',updatedAt:product.updatedAt}}); ok(r.status === 200,'Archived persisted'); product = r.value.data;
  ok(!(await call('/api/products')).value.data.some(p=>p.model===marker),'Archived hidden publicly');
  r = await call(route,{method:'DELETE',cookie:admin,body:{updatedAt:product.updatedAt}}); ok(r.status === 200,'ADMIN soft delete'); product = r.value.data;
  ok(!!(await db.product.findUnique({where:{id:product.id}})).deletedAt,'soft delete retains row');
  ok((await call(route+'/restore',{method:'POST',cookie:staff,body:{updatedAt:product.updatedAt}})).status === 403,'STAFF cannot restore');
  ok((await call(route,{method:'PATCH',cookie:staff,body:{...payload,updatedAt:product.updatedAt}})).status === 409,'deleted product cannot be edited');
  r = await call(route+'/restore',{method:'POST',cookie:admin,body:{updatedAt:product.updatedAt}}); ok(r.status === 200 && r.value.data.status === 'DRAFT' && !r.value.data.deletedAt,'ADMIN restores as Draft'); product = r.value.data;
  r = await call(route+'/images',{method:'PATCH',cookie:staff,body:{updatedAt:product.updatedAt,deleteId:product.images[0].id}}); ok(r.status === 200,'image removal persists');
  ok((await call(`/api/product-images/${edits[0].id}`,{cookie:staff})).status === 404,'removed image route denied');
  ok((await call('/api/admin/catalog/brands',{method:'DELETE',cookie:staff,body:{id:brand.id}})).status === 403,'STAFF taxonomy delete denied');
  ok((await call('/api/admin/catalog/brands',{method:'DELETE',cookie:admin,body:{id:brand.id}})).status === 409,'used brand delete denied');
  ok((await call('/api/admin/catalog/categories',{method:'DELETE',cookie:admin,body:{id:category.id}})).status === 409,'parent category delete denied');
  const listing = (await call(`/api/admin/products?q=${marker}&brandId=${brand.id}&categoryId=${child.id}&status=DRAFT&page=1`,{cookie:staff})).value.data;
  ok(listing.total === 1 && listing.products[0].id === product.id,'server search/filter intersection');
  for(let i=0;i<21;i++){const p=await db.product.create({data:{model:marker+'-'+i,name:'Pagination',slug:marker+'-'+i,brandId:brand.id,categoryId:child.id}});products.push(p.id);}
  const page1=(await call(`/api/admin/products?q=${marker}&page=1`,{cookie:staff})).value.data;
  const page2=(await call(`/api/admin/products?q=${marker}&page=2`,{cookie:staff})).value.data;
  ok(page1.products.length===20 && page2.products.length===2 && page2.page===2 && !page1.products.some(a=>page2.products.some(b=>a.id===b.id)),'server pagination has no duplicate rows');
  ok(await db.auditLog.count({where:{userId:{in:[...users]},entityId:product.id}})>=5,'mutation audit entries persisted');
  await db.user.update({where:{id:users.ADMIN.id},data:{role:'STAFF'}});
  product=(await call(route,{cookie:staff})).value.data;
  ok((await call(route,{method:'DELETE',cookie:admin,body:{updatedAt:product.updatedAt}})).status===403,'database role change takes effect immediately');
  assert.deepEqual(await db.user.findMany({where:{id:{in:ownerBefore.map(u=>u.id)}},select:{id:true,updatedAt:true}}),ownerBefore);
  ok(true,'owner accounts unchanged');
  console.log(`CATALOG_INTEGRATION_OK ${checks} checks`);
} catch (error) { console.error('CATALOG_INTEGRATION_FAILED', error instanceof assert.AssertionError ? error.message : 'Unexpected service/test failure (details withheld).'); process.exitCode=1; }
finally {
  await db.productImage.deleteMany({where:{productId:{in:products}}});
  await db.product.deleteMany({where:{id:{in:products}}});
  for(const id of [...categories].reverse()) await db.productCategory.deleteMany({where:{id}});
  await db.brand.deleteMany({where:{id:{in:brands}}});
  await db.auditLog.deleteMany({where:{userId:{in:[...users]}}});
  await db.user.deleteMany({where:{id:{in:[...users]}}});
  for(const id of imageIds) await unlink(path.join(process.env.PRODUCT_MEDIA_DIR || '.product-media',`${id}.webp`)).catch(()=>{});
  await db.$disconnect(); console.log('Disposable catalog cleanup complete.');
}
