import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export function getPrisma() {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required.");
  const url = new URL(process.env.DATABASE_URL);
  if (url.protocol !== "mysql:" || !url.hostname || url.pathname.length < 2) throw new Error("Invalid MySQL connection URL.");
  for (const key of url.searchParams.keys()) {
    if (key !== "ssl") throw new Error(`Unsupported MySQL option: ${key}`);
  }
  const ssl = url.searchParams.get("ssl");
  if (ssl && ssl !== "true") throw new Error("ssl must be true when provided.");
  const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: Number(url.port || 3306),
    user: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    database: decodeURIComponent(url.pathname.slice(1)),
    connectionLimit: 5,
    connectTimeout: 5000,
    ...(ssl === "true" ? { ssl: { rejectUnauthorized: true } } : {}),
  });
  globalForPrisma.prisma = new PrismaClient({ adapter });
  return globalForPrisma.prisma;
}
