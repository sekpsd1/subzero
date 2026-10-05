import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { createHash, randomBytes } from 'node:crypto';
import { execFileSync } from 'node:child_process';
const root = fs.realpathSync(process.cwd());
if (new URL(process.env.NEXT_PUBLIC_SITE_URL || '').origin !== 'https://new.subzerowolf-sea.com' || path.basename(root) !== 'new.subzerowolf-sea.com') throw new Error('Staging root only.');
const payload = path.join(root, 'admin-auth-payload');
const backup = path.join(root, '.auth-backups', '20261005-admin-auth');
const manifest = JSON.parse(fs.readFileSync(path.join(payload, 'manifest.json'), 'utf8').replace(/^\uFEFF/, ''));
function hash(text) { return createHash('sha256').update(text.replace(/^\uFEFF/, '').replace(/\r\n/g,'\n').trim()).digest('hex'); }
function resolveScoped(base, relative) {
 if (!/^(src\/(lib\/auth\/|app\/admin\/|app\/api\/admin\/|proxy\.ts$)|prisma\/(schema\.prisma$|migrations\/20261005010000_admin_auth\/migration\.sql$)|scripts\/admin-[a-z.-]+\.mjs$)/.test(relative)) throw new Error('Unexpected release file.');
 const dest = path.resolve(base,relative);
 if (!dest.startsWith(base+path.sep)) throw new Error('Unsafe release path.');
 return dest;
}
function run(args, env = process.env) { execFileSync(process.execPath,args,{cwd:root,env,stdio:'inherit'}); }
if (process.argv[2] === 'rollback') {
 const state = JSON.parse(fs.readFileSync(path.join(backup,'state.json'),'utf8'));
 for (const item of state) {
  const target=resolveScoped(root,item.path);
  if (item.existed) fs.copyFileSync(resolveScoped(path.join(backup,'source'),item.path)+'.bak',target);
  else if(fs.existsSync(target) && !item.path.startsWith('prisma/migrations/')) fs.unlinkSync(target);
 }
 // Keep added auth tables; never reverse/reset/drop a migration.
 if (fs.existsSync(path.join(backup,'build.tar.gz'))) {
  fs.renameSync(path.join(root,'.next'),path.join(root,'.next-auth-failed-'+Date.now()));
  execFileSync('tar',['-xzf',path.join(backup,'build.tar.gz'),'-C',root]);
 }
 if(fs.existsSync(path.join(backup,'public-next.tar.gz'))) {
  fs.renameSync(path.join(root,'public','_next'),path.join(backup,'public-next-failed-'+Date.now()));
  execFileSync('tar',['-xzf',path.join(backup,'public-next.tar.gz'),'-C',root]);
 }
 // The old dashboard was public. A rollback must keep admin paths in maintenance.
 const oldEntry = fs.readFileSync(path.join(backup,'app.js'),'utf8');
 const guardedEntry = oldEntry.replace('handle(req, res);', "let authPath; try { authPath = new URL(decodeURIComponent(req.url || '/'), 'http://localhost').pathname; } catch { res.writeHead(400); res.end(); return; } if (authPath === '/admin' || authPath.startsWith('/admin/') || authPath === '/api/admin' || authPath.startsWith('/api/admin/')) { res.writeHead(503, {'Cache-Control':'no-store'}); res.end('Admin maintenance'); return; }\n    handle(req, res);");
 if(guardedEntry === oldEntry) throw new Error('Maintenance guard could not be installed.');
 fs.writeFileSync(path.join(root,'app.js'),guardedEntry);
 run(['node_modules/prisma/build/index.js','generate']);
 fs.mkdirSync(path.join(root,'tmp'),{recursive:true}); fs.writeFileSync(path.join(root,'tmp','restart.txt'),String(Date.now()));
 console.log('Rollback complete; admin is in maintenance. Added DB tables retained.');
} else {
 if (fs.existsSync(backup)) throw new Error('Backup already exists; refusing to overwrite.');
 for(const item of manifest.files) {
  if(hash(fs.readFileSync(resolveScoped(payload,item.path),'utf8')) !== item.hash) throw new Error('Payload integrity failed.');
 }
 for(const [relative,expected] of Object.entries(manifest.baseline)) {
  if(hash(fs.readFileSync(path.join(root,relative),'utf8')) !== expected) throw new Error('Server baseline differs: '+relative);
 }
 fs.mkdirSync(path.join(backup,'source'),{recursive:true,mode:0o700}); fs.chmodSync(path.dirname(backup),0o700); fs.chmodSync(backup,0o700);
 const state=[];
 for(const item of manifest.files) {
  const target=resolveScoped(root,item.path), saved=resolveScoped(path.join(backup,'source'),item.path);
  const existed=fs.existsSync(target); state.push({path:item.path,existed});
  if(existed) { fs.mkdirSync(path.dirname(saved),{recursive:true}); fs.copyFileSync(target,saved+'.bak'); }
 }
 fs.writeFileSync(path.join(backup,'state.json'),JSON.stringify(state));
 fs.copyFileSync(path.join(root,'app.js'),path.join(backup,'app.js'));
 // Snapshot live compiled output before mutation.
 if(fs.existsSync(path.join(root,'.next'))) execFileSync('tar',['-czf',path.join(backup,'build.tar.gz'),'-C',root,'.next']);
 if(fs.existsSync(path.join(root,'public','_next'))) execFileSync('tar',['-czf',path.join(backup,'public-next.tar.gz'),'-C',root,'public/_next']);
 console.log('PASS source/build rollback snapshot created outside public');
 for(const item of manifest.files) {
  const target=resolveScoped(root,item.path); fs.mkdirSync(path.dirname(target),{recursive:true}); fs.copyFileSync(resolveScoped(payload,item.path),target);
 }
 if(!process.env.AUTH_SECRET) {
  const secret=randomBytes(48).toString('hex');
  fs.appendFileSync(path.join(root,'.env'),'\nAUTH_SECRET="'+secret+'"\n',{mode:0o600});
  process.env.AUTH_SECRET=secret;
 }
 fs.chmodSync(path.join(root,'.env'),0o600);
 if(process.env.AUTH_SECRET.length<32) throw new Error('AUTH_SECRET invalid.');
 try { run(['node_modules/prisma/build/index.js','migrate','status']); } catch { console.log('Migration status reports pending work; deploy will validate and apply.'); }
 run(['node_modules/prisma/build/index.js','migrate','deploy']);
 run(['node_modules/prisma/build/index.js','generate']);
 run(['--test','scripts/admin-auth.test.mjs']);
 run(['node_modules/eslint/bin/eslint.js','src','scripts']);
 const oldStatic = path.join(root,'public','_next');
 const staticHold = path.join(backup,'live-public-next');
 const configBefore = fs.readFileSync(path.join(root,'tsconfig.json'),'utf8');
 if(fs.existsSync(oldStatic)) fs.renameSync(oldStatic,staticHold);
 try {
  run(['node_modules/next/dist/bin/next','build'],{...process.env,NEXT_DEV_DIST_DIR:'.next-auth-candidate'});
 } catch (error) {
  if(fs.existsSync(staticHold) && !fs.existsSync(oldStatic)) fs.renameSync(staticHold,oldStatic);
  throw error;
 } finally { fs.writeFileSync(path.join(root,'tsconfig.json'),configBefore); }
 if(fs.existsSync(path.join(root,'.next'))) fs.renameSync(path.join(root,'.next'),path.join(root,'.next-before-auth-'+Date.now()));
 fs.renameSync(path.join(root,'.next-auth-candidate'),path.join(root,'.next'));
 run(['scripts/prepare-plesk-assets.mjs']);
 fs.mkdirSync(path.join(root,'tmp'),{recursive:true}); fs.writeFileSync(path.join(root,'tmp','restart.txt'),String(Date.now()));
 console.log('PASS auth release installed; restart requested');
}
