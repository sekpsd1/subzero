import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, verifyPassword, randomToken, digest, roleAllowed, sessionActive } from '../src/lib/auth/crypto.mjs';
test('salted password verification and wrong/unknown password', async () => {
 const password = randomToken(), hash = await hashPassword(password);
 assert.notEqual(hash, await hashPassword(password));
 assert.equal(await verifyPassword(password, hash), true);
 assert.equal(await verifyPassword(randomToken(), hash), false);
 assert.equal(await verifyPassword(password, ''), false);
 await assert.rejects(hashPassword('short'));
});
test('expiry, revocation and missing session', () => {
 const now = new Date();
 assert.equal(sessionActive(null, now), false);
 assert.equal(sessionActive({expiresAt:now,revokedAt:null},now),false);
 assert.equal(sessionActive({expiresAt:new Date(+now+1000),revokedAt:now},now),false);
 assert.equal(sessionActive({expiresAt:new Date(+now+1000),revokedAt:null},now),true);
});
test('role restrictions', () => {
 assert.equal(roleAllowed('STAFF',['ADMIN']),false);
 assert.equal(roleAllowed('ADMIN',['ADMIN']),true);
 assert.equal(roleAllowed('STAFF',['ADMIN','STAFF']),true);
 assert.equal(roleAllowed('CLIENT',['ADMIN','STAFF']),false);
});
test('secret configuration and opaque tokens', () => {
 const old = process.env.AUTH_SECRET;
 try {
 delete process.env.AUTH_SECRET; assert.throws(()=>digest(randomToken()));
 process.env.AUTH_SECRET = randomToken();
 const token=randomToken(); assert.match(token,/^[a-f0-9]{64}$/); assert.notEqual(token,digest(token));
 } finally { if(old===undefined)delete process.env.AUTH_SECRET;else process.env.AUTH_SECRET=old; }
});


test('rollback guard blocks normal and encoded admin paths while preserving public routes', () => {
 const source=readFileSync(new URL('./admin-release.mjs',import.meta.url),'utf8');
 const expression=source.match(/const guardedEntry = (.+);/)[1];
 const guard=new Function('oldEntry','return '+expression)('handle(req, res);');
 const execute=new Function('req','res','handle',guard);
 for(const url of ['/admin','/%61dmin','/api/admin/session','/api%2fadmin/session','/admin?x=1','/%2e%2e/admin']) {
  let status=0,handled=false;
  execute({url},{writeHead:code=>{status=code;},end:()=>{}},()=>{handled=true;});
  assert.equal(status,503);assert.equal(handled,false);
 }
 let handled=false;
 execute({url:'/cooking/ranges'},{writeHead:()=>{},end:()=>{}},()=>{handled=true;});
 assert.equal(handled,true);
});
