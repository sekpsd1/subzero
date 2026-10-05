import { spawnSync } from 'node:child_process';
import 'dotenv/config';
import assert from 'node:assert/strict';
import { getPrisma } from './admin-db.mjs';
import { randomToken, digest, hashPassword } from '../src/lib/auth/crypto.mjs';
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL).origin;
if (origin !== 'https://new.subzerowolf-sea.com') throw new Error('Staging site only.');
const db = getPrisma();
const prefix = 'auth-test-' + randomToken().slice(0, 12);
const ids = [];
const rateKeys = [];
const cookieName = '__Host-sz-admin';
let checks = 0;
async function request(path, options={}) { return fetch(origin + path, {redirect:'manual',...options}); }
function pass(name) { checks++; console.log('PASS ' + name); }
function cookie(token) { return {Cookie:cookieName+'='+token}; }
try {
 assert.equal(await db.user.count(),0,'Disposable test environment must have no users');
 let r = await request('/admin'); assert.equal(r.status,307); assert.ok(r.headers.get('location').endsWith('/admin/login')); pass('unauthenticated admin redirect');
 r = await request('/api/admin/session'); assert.equal(r.status,401); pass('unauthenticated API');
 r = await request('/api/admin/not-implemented'); assert.equal(r.status,401); pass('namespace guard');
 r = await request('/api/admin/session',{headers:{Cookie:'__Host-sz-admin=forged'}}); assert.equal(r.status,401); pass('forged cookie rejected');
 r = await request('/api/admin/login',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'email=invalid'}); assert.equal(r.status,403); pass('missing-origin mutation rejected');
 r = await request('/api/admin/login',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded'},body:'x'.repeat(4097)}); assert.equal(r.status,413); pass('oversized login body rejected');
 r = await request('/api/admin/login',{method:'POST',headers:{Origin:'https://attacker.example','Content-Type':'application/x-www-form-urlencoded'},body:'email=invalid'}); assert.equal(r.status,403); pass('cross-origin login rejected');
 const password = randomToken();
 const passwordHash = await hashPassword(password);
 const admin = await db.user.create({data:{name:'Disposable auth test',email:prefix+'-admin@example.invalid',passwordHash,role:'ADMIN'}}); ids.push(admin.id);
 const staff = await db.user.create({data:{name:'Disposable auth test',email:prefix+'-staff@example.invalid',passwordHash,role:'STAFF'}}); ids.push(staff.id);
 const bootstrapCheck=spawnSync(process.execPath,['scripts/admin-bootstrap.mjs'],{encoding:'utf8'});
 assert.equal(bootstrapCheck.status,1); assert.match(bootstrapCheck.stderr,/Setup closed/); pass('bootstrap refuses while an ADMIN exists');
 rateKeys.push(digest('login:account:'+staff.email),digest('login:account:'+admin.email));
 const formHeaders = {Origin:origin,'Content-Type':'application/x-www-form-urlencoded'};
 r = await request('/api/admin/login',{method:'POST',headers:formHeaders,body:new URLSearchParams({email:staff.email,password:randomToken()})});
 assert.equal(r.status,303); assert.ok(r.headers.get('location').includes('error=invalid')); assert.equal(r.headers.get('set-cookie'),null); pass('wrong password rejected');
 const variantEmail=staff.email.replace('auth','áuth');
 rateKeys.push(digest('login:account:'+variantEmail));
 r = await request('/api/admin/login',{method:'POST',headers:formHeaders,body:new URLSearchParams({email:variantEmail,password})});
 assert.equal(r.status,303); assert.ok(r.headers.get('location').includes('error=invalid')); assert.equal(r.headers.get('set-cookie'),null); pass('MySQL collation alias cannot bypass account throttle');
 r = await request('/api/admin/login',{method:'POST',headers:formHeaders,body:new URLSearchParams({email:staff.email,password})});
 assert.equal(r.status,303);
 const setCookie = r.headers.get('set-cookie');
 assert.match(setCookie,/HttpOnly/i); assert.match(setCookie,/Secure/i); assert.match(setCookie,/SameSite=lax/i); assert.match(setCookie,/Max-Age=28800/i);
 const token = setCookie.match(/__Host-sz-admin=([a-f0-9]{64})/)[1];
 pass('STAFF login and secure expiry cookie');
 r = await request('/admin',{headers:cookie(token)}); assert.equal(r.status,200); pass('authenticated dashboard');
 r = await request('/api/admin/sessions/revoke',{method:'POST',headers:{...cookie(token),Origin:origin}}); assert.equal(r.status,403); pass('STAFF forbidden from ADMIN action');
 await db.user.update({where:{id:staff.id},data:{role:'ADMIN'}});
 r = await request('/api/admin/session',{headers:cookie(token)}); assert.equal((await r.json()).user.role,'ADMIN'); pass('role reread from database');
 await db.user.update({where:{id:staff.id},data:{role:'STAFF'}});
 r = await request('/api/admin/logout',{method:'POST',headers:{...cookie(token),Origin:'https://attacker.example'}}); assert.equal(r.status,403); pass('cross-origin logout rejected');
 await db.adminSession.update({where:{tokenHash:digest(token)},data:{expiresAt:new Date(Date.now()-1000)}});
 r = await request('/api/admin/session',{headers:cookie(token)}); assert.equal(r.status,401); pass('expired session denied');
 const logoutToken=randomToken();
 await db.adminSession.create({data:{tokenHash:digest(logoutToken),userId:staff.id,expiresAt:new Date(Date.now()+60000)}});
 r = await request('/api/admin/logout',{method:'POST',headers:{...cookie(logoutToken),Origin:origin}});
 assert.equal(r.status,303); assert.match(r.headers.get('set-cookie'),/Max-Age=0/i);
 r = await request('/api/admin/session',{headers:cookie(logoutToken)}); assert.equal(r.status,401);
 assert.ok((await db.adminSession.findUnique({where:{tokenHash:digest(logoutToken)}})).revokedAt); pass('logout revokes database session and replay denied');
 const adminToken=randomToken();
 await db.adminSession.create({data:{tokenHash:digest(adminToken),userId:admin.id,expiresAt:new Date(Date.now()+60000)}});
 r = await request('/api/admin/sessions/revoke',{method:'POST',headers:{...cookie(adminToken),Origin:origin}}); assert.equal(r.status,303);
 r = await request('/api/admin/session',{headers:cookie(adminToken)}); assert.equal(r.status,401); pass('ADMIN revocation and replay denied');
 for(let i=0;i<3;i++) await request('/api/admin/login',{method:'POST',headers:formHeaders,body:new URLSearchParams({email:staff.email,password:randomToken()})});
 r = await request('/api/admin/login',{method:'POST',headers:formHeaders,body:new URLSearchParams({email:staff.email,password})});
 assert.ok(r.headers.get('location').includes('error=limited')); pass('persistent account throttling blocks sixth attempt');
 console.log('PASS total '+checks);
} catch {
 console.error('FAIL authentication integration check. No credentials logged.'); process.exitCode=1;
} finally {
 if(ids.length) {
  await db.auditLog.deleteMany({where:{userId:{in:ids}}});
  await db.user.deleteMany({where:{id:{in:ids},email:{startsWith:prefix}}});
 }
 if(rateKeys.length) await db.authRateLimit.deleteMany({where:{key:{in:rateKeys}}});
 await db.$disconnect();
 console.log('Disposable test accounts cleaned up.');
}
