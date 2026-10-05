import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const root=fs.realpathSync(process.cwd()),base=process.env.NEXT_PUBLIC_SITE_URL;
if(path.basename(root)!=='new.subzerowolf-sea.com'||base!=='https://new.subzerowolf-sea.com')throw Error('Staging only.');
const {getPrisma}=await import(pathToFileURL(path.join(root,'scripts/admin-db.mjs')).href),db=getPrisma();
const backup=path.join(root,'.inventory-backups','20261005-inventory'),drill=path.join(backup,'rollback-drill');
if(fs.existsSync(drill))throw Error('Drill already exists; never overwrite.');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'.inventory-payload','manifest.json')));
const files=manifest.files.map(i=>i.file);
function scoped(base,file){const resolved=path.resolve(base,file);if(!resolved.startsWith(base+path.sep))throw Error('Unsafe path');return resolved;}
const hash=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
async function databaseHash(){return hash(await db.$transaction(async tx=>({inventory:await tx.inventory.findMany({orderBy:{id:'asc'}}),movements:await tx.stockMovement.findMany({orderBy:{id:'asc'}}),audits:await tx.auditLog.findMany({orderBy:{id:'asc'}}),posts:await tx.post.findMany({orderBy:{id:'asc'},include:{tags:{orderBy:{id:'asc'}}}}),seo:await tx.seoMeta.findMany({orderBy:{id:'asc'}}),tags:await tx.postTag.findMany({orderBy:{id:'asc'}}),postCategories:await tx.postCategory.findMany({orderBy:{id:'asc'}}),media:await tx.media.findMany({orderBy:{id:'asc'}}),products:await tx.product.findMany({orderBy:{id:'asc'}}),brands:await tx.brand.findMany({orderBy:{id:'asc'}}),categories:await tx.productCategory.findMany({orderBy:{id:'asc'}}),images:await tx.productImage.findMany({orderBy:{id:'asc'}}),users:await tx.user.findMany({orderBy:{id:'asc'},select:{id:true,role:true,updatedAt:true}}),sessions:await tx.adminSession.findMany({orderBy:{tokenHash:'asc'}})}),{isolationLevel:'RepeatableRead'}));}
const {randomUUID}=await import('node:crypto');
const {randomToken,digest}=await import(pathToFileURL(path.join(root,'src/lib/auth/crypto.mjs')).href);
const testUser=await db.user.create({data:{name:'Disposable inventory rollback check',email:'inventory-rollback-'+randomUUID()+'@example.invalid',role:'STAFF',passwordHash:'disabled-no-login'}});const token=randomToken();
await db.adminSession.create({data:{tokenHash:digest(token),userId:testUser.id,expiresAt:new Date(Date.now()+900000)}});
const before=await databaseHash();
fs.mkdirSync(path.join(drill,'source'),{recursive:true,mode:0o700});fs.chmodSync(drill,0o700);
for(const file of files){const saved=scoped(path.join(drill,'source'),file);fs.mkdirSync(path.dirname(saved),{recursive:true});fs.copyFileSync(scoped(root,file),saved);}
for(const [archive,target]of [['verified-build.tar.gz','.next'],['verified-static.tar.gz','public/_next']]){execFileSync('tar',['-czf',path.join(drill,archive),'-C',root,target]);fs.chmodSync(path.join(drill,archive),0o600);}
const run=args=>execFileSync(process.execPath,args,{cwd:root,stdio:'inherit'});
async function waitPublic(expectInventory){for(let i=0;i<30;i++){try{const r=await fetch(base+'/api/admin/inventory',{headers:{cookie:'__Host-sz-admin='+token}});if(r.status===(expectInventory?200:404))return;}catch{}await new Promise(resolve=>setTimeout(resolve,1000));}throw Error('Live inventory build did not switch.');}
let restored=false;
try {
  run(['.inventory-payload/scripts/admin-inventory-release.mjs','rollback']);
  assert(!fs.existsSync(path.join(root,'src/app/admin/inventory/page.tsx')));
  await waitPublic(false);
  assert.equal((await fetch(base+'/api/admin/session')).status,401);
  assert.equal((await fetch(base+'/admin/setup')).status,404);
  assert.equal((await fetch(base+'/')).status,200);
  assert.equal(await databaseHash(),before);
  console.log('PASS actual rollback: previous HTTPS build, auth closed, stock/history/audit/catalog/session data unchanged');
}finally{
  for(const file of files)fs.copyFileSync(scoped(path.join(drill,'source'),file),scoped(root,file));
  for(const [archive,target]of [['verified-build.tar.gz','.next'],['verified-static.tar.gz','public/_next']]){if(fs.existsSync(path.join(root,target)))fs.renameSync(path.join(root,target),path.join(drill,'rolledback-'+path.basename(target)));execFileSync('tar',['-xzf',path.join(drill,archive),'-C',root]);}
  run(['node_modules/prisma/build/index.js','generate']);fs.writeFileSync(path.join(root,'tmp/restart.txt'),String(Date.now()));restored=true;
  await waitPublic(true);assert.equal(await databaseHash(),before);console.log('PASS verified inventory restored: HTTPS private DB API and original data unchanged');
  await db.adminSession.deleteMany({where:{userId:testUser.id}});await db.user.delete({where:{id:testUser.id}});
  await db.$disconnect();
}
if(restored)console.log('INVENTORY_ROLLBACK_DRILL_OK');
