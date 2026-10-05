import 'dotenv/config';
import { emitKeypressEvents, createInterface } from 'node:readline';
import { getPrisma } from './admin-db.mjs';
import { digest, hashPassword } from '../src/lib/auth/crypto.mjs';
const MARKER = 'auth:first-admin-created';
async function ask(label) {
 const rl = createInterface({input: process.stdin, output: process.stdout});
 try { return await new Promise(resolve => rl.question(label, resolve)); } finally { rl.close(); }
}
async function hidden(label) {
 if (!process.stdin.isTTY || !process.stdout.isTTY) throw new Error('Private interactive terminal required.');
 process.stdout.write(label); emitKeypressEvents(process.stdin); process.stdin.setRawMode(true);
 return new Promise((resolve, reject) => {
  let value = '';
  const finish = () => { process.stdin.off('keypress', onKey); process.stdin.setRawMode(false); process.stdin.pause(); process.stdout.write('\n'); };
  const onKey = (text, key) => {
   if (key?.ctrl && key.name === 'c') { finish(); reject(new Error('Cancelled.')); }
   else if (key?.name === 'return') { finish(); resolve(value); }
   else if (key?.name === 'backspace') value = value.slice(0, -1);
   else if (text && !key?.ctrl && !key?.meta && !/[\x00-\x1f\x7f]/.test(text)) value += text;
  };
  process.stdin.on('keypress', onKey); process.stdin.resume();
 });
}
const db = getPrisma();
try {
 digest('configuration-check');
 if (await db.siteSetting.findUnique({where:{key:MARKER}}) || await db.user.count({where:{role:'ADMIN'}})) throw new Error('Setup closed.');
 const name = String(await ask('Owner name: ')).trim();
 const email = String(await ask('Owner email: ')).trim().toLowerCase();
 if (!name || name.length > 191 || email.length > 191 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid name or email.');
 let password = String(await hidden('Password (hidden, at least 15 characters): '));
 let confirmation = String(await hidden('Confirm password (hidden): '));
 if (password !== confirmation) throw new Error('Passwords do not match.');
 const passwordHash = await hashPassword(password); password = ''; confirmation = '';
 await db.$transaction(async tx => {
  if (await tx.siteSetting.findUnique({where:{key:MARKER}}) || await tx.user.count({where:{role:'ADMIN'}})) throw new Error('Setup closed.');
  await tx.siteSetting.create({data:{key:MARKER,value:{closed:true}}});
  const user = await tx.user.create({data:{name,email,passwordHash,role:'ADMIN'}});
  await tx.auditLog.create({data:{userId:user.id,action:'FIRST_ADMIN_CREATED',entity:'User',entityId:user.id}});
 }, {isolationLevel:'Serializable'});
 console.log('ADMIN created. Setup closed permanently.');
} catch (error) {
 console.error(error instanceof Error && !error.constructor.name.includes('Prisma') ? error.message : 'Bootstrap failed; no credentials logged.');
 process.exitCode = 1;
} finally { await db.$disconnect(); }
