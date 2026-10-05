import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
const root=fs.realpathSync(process.cwd());
if(path.basename(root)!=='new.subzerowolf-sea.com'||process.env.NEXT_PUBLIC_SITE_URL!=='https://new.subzerowolf-sea.com')throw Error('Staging only.');
const { getPrisma } = await import(pathToFileURL(path.join(root,'scripts/admin-db.mjs')).href);
const payload=path.join(root,'.products-payload'),backup=path.join(root,'.products-backups','20261005-products');
const manifest=JSON.parse(fs.readFileSync(path.join(payload,'manifest.json'),'utf8'));
const hash=s=>createHash('sha256').update(s.replace(/\r\n/g,'\n').trim()).digest('hex');
function scoped(base,file){
 if(!/^(src\/(lib\/catalog\/|components\/AdminCatalog\/|app\/admin\/(products\/|catalog\/|page\.tsx$)|app\/api\/(admin\/(products\/|catalog\/)|products\/route\.ts$|product-images\/))|prisma\/(schema\.prisma$|migrations\/20261005020000_catalog_indexes\/migration\.sql$)|scripts\/admin-products[a-z.-]*\.mjs$|package(-lock)?\.json$|\.gitignore$)/.test(file))throw Error('Unexpected release path.');
 const target=path.resolve(base,file);if(!target.startsWith(base+path.sep))throw Error('Unsafe path.');return target;
}
const run=(args,env=process.env)=>execFileSync(process.execPath,args,{cwd:root,env,stdio:'inherit'});
const restart=()=>{fs.mkdirSync(path.join(root,'tmp'),{recursive:true});fs.writeFileSync(path.join(root,'tmp','restart.txt'),String(Date.now()));};
function restoreSources(){const state=JSON.parse(fs.readFileSync(path.join(backup,'state.json')));for(const item of state){const target=scoped(root,item.file);if(item.exists)fs.copyFileSync(scoped(path.join(backup,'source'),item.file),target);else if(!item.file.startsWith('prisma/migrations/')&&fs.existsSync(target))fs.unlinkSync(target);}}
function rollback(){
 restoreSources();
 if(fs.existsSync(path.join(root,'.next')))fs.renameSync(path.join(root,'.next'),path.join(backup,'failed-next-'+Date.now()));
 execFileSync('tar',['-xzf',path.join(backup,'build.tar.gz'),'-C',root]);
 if(fs.existsSync(path.join(root,'public/_next')))fs.renameSync(path.join(root,'public/_next'),path.join(backup,'failed-static-'+Date.now()));
 execFileSync('tar',['-xzf',path.join(backup,'static.tar.gz'),'-C',root]);
 run(['node_modules/prisma/build/index.js','generate']);restart();console.log('PRODUCTS_ROLLBACK_OK; catalog rows and additive indexes retained.');
}
if(process.argv[2]==='rollback'){rollback();}
else {
 if(fs.existsSync(backup))throw Error('Backup already exists. Use rollback; never overwrite.');
 for(const item of manifest.files){if(hash(fs.readFileSync(scoped(payload,item.file),'utf8'))!==item.hash)throw Error('Payload checksum mismatch.');if(!manifest.baseline[item.file]&&fs.existsSync(scoped(root,item.file)))throw Error('New release path already exists: '+item.file);}
 for(const [file,expected]of Object.entries(manifest.baseline)){const target=path.resolve(root,file);if(!target.startsWith(root+path.sep)||hash(fs.readFileSync(target,'utf8'))!==expected)throw Error('Server baseline differs: '+file);}
 fs.mkdirSync(path.join(backup,'source'),{recursive:true,mode:0o700});fs.chmodSync(path.dirname(backup),0o700);fs.chmodSync(backup,0o700);
 const files=[...manifest.files.map(i=>i.file),'package.json','package-lock.json','.gitignore'];
 const state=[...new Set(files)].map(file=>({file,exists:fs.existsSync(scoped(root,file))}));
 for(const item of state)if(item.exists){const saved=scoped(path.join(backup,'source'),item.file);fs.mkdirSync(path.dirname(saved),{recursive:true});fs.copyFileSync(scoped(root,item.file),saved);}
 fs.writeFileSync(path.join(backup,'state.json'),JSON.stringify(state),{mode:0o600});
 const db=getPrisma();try{
   const snapshot=await db.$transaction(async tx=>({products:await tx.product.findMany(),images:await tx.productImage.findMany(),brands:await tx.brand.findMany(),categories:await tx.productCategory.findMany(),audit:await tx.auditLog.findMany()}),{isolationLevel:'RepeatableRead'});
   fs.writeFileSync(path.join(backup,'catalog.json'),JSON.stringify(snapshot),{mode:0o600});
   console.log('PASS consistent catalog database backup',snapshot.products.length,'products');
 }finally{await db.$disconnect();}
 execFileSync('tar',['-czf',path.join(backup,'build.tar.gz'),'-C',root,'.next']);
 execFileSync('tar',['-czf',path.join(backup,'static.tar.gz'),'-C',root,'public/_next']);
 if(fs.existsSync(path.join(root,'.product-media')))fs.cpSync(path.join(root,'.product-media'),path.join(backup,'media'),{recursive:true});
 for(const file of ['build.tar.gz','static.tar.gz']){fs.chmodSync(path.join(backup,file),0o600);execFileSync('tar',['-tzf',path.join(backup,file)],{stdio:'ignore'});}
 console.log('PASS source/build/static backup archives verified');
 const config=fs.readFileSync(path.join(root,'tsconfig.json'),'utf8'), hold=path.join(backup,'static-hold');
 try {
   for(const item of manifest.files){const target=scoped(root,item.file);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(scoped(payload,item.file),target);}
   const pkg=JSON.parse(fs.readFileSync(path.join(root,'package.json')));pkg.dependencies.sharp='0.34.5';fs.writeFileSync(path.join(root,'package.json'),JSON.stringify(pkg,null,2)+'\n');
   execFileSync('npm',['install','--package-lock-only','--ignore-scripts'],{cwd:root,stdio:'inherit'});
   fs.appendFileSync(path.join(root,'.gitignore'),'\n.product-media/\n.products-backups/\n.products-payload/\nadmin-products-release.zip\n');
   run(['node_modules/prisma/build/index.js','migrate','deploy']);run(['node_modules/prisma/build/index.js','generate']);
   run(['--test','scripts/admin-products.test.mjs','scripts/admin-auth.test.mjs']);run(['node_modules/eslint/bin/eslint.js','src','scripts']);
   const cfg=JSON.parse(config);cfg.include=cfg.include.filter(s=>!s.startsWith('.next'));fs.writeFileSync(path.join(root,'tsconfig.json'),JSON.stringify(cfg));
   fs.renameSync(path.join(root,'public/_next'),hold);
   run(['node_modules/next/dist/bin/next','build'],{...process.env,NEXT_DEV_DIST_DIR:'.next-products-candidate'});
   fs.renameSync(path.join(root,'.next'),path.join(backup,'old-next'));
   fs.renameSync(path.join(root,'.next-products-candidate'),path.join(root,'.next'));
   run(['scripts/prepare-plesk-assets.mjs']);restart();console.log('PRODUCTS_RELEASE_OK');
 }catch{console.error('Release failed. Restoring source/build (no reset/drop).');rollback();process.exitCode=1;}
 finally{fs.writeFileSync(path.join(root,'tsconfig.json'),config);}
}
