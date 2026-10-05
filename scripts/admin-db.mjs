import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
export function getPrisma() {
 let url;
 try { url = new URL(process.env.DATABASE_URL); } catch { throw new Error('Database configuration invalid.'); }
 if (url.protocol !== 'mysql:') throw new Error('MySQL required.');
 for (const key of url.searchParams.keys()) if (key !== 'ssl') throw new Error('Unsupported database option.');
 const ssl = url.searchParams.get('ssl');
 if (ssl && ssl !== 'true') throw new Error('Unsupported TLS setting.');
 return new PrismaClient({adapter: new PrismaMariaDb({
  host:url.hostname,port:Number(url.port || 3306),user:decodeURIComponent(url.username),
  password:decodeURIComponent(url.password),database:decodeURIComponent(url.pathname.slice(1)),
  connectionLimit:2,connectTimeout:5000,...(ssl === 'true' ? {ssl:{rejectUnauthorized:true}} : {}),
 })});
}
