import "dotenv/config";

let failed = false;
function report(ok, label) {
  console.log(`${ok ? "PASS" : "FAIL"} ${label}`);
  if (!ok) failed = true;
}
report(Boolean(process.env.AUTH_SECRET && process.env.AUTH_SECRET.length >= 32 && !process.env.AUTH_SECRET.includes("replace-with")), "AUTH_SECRET has at least 32 characters");
report(Boolean(process.env.NEXT_PUBLIC_SITE_URL && /^https?:\/\//.test(process.env.NEXT_PUBLIC_SITE_URL)), "Site URL is configured");
let client;
try {
  if (!process.env.DATABASE_URL) throw new Error("Missing database");
  const { default: prismaPackage } = await import("@prisma/client");
  const { PrismaClient } = prismaPackage;
  const { PrismaMariaDb } = await import("@prisma/adapter-mariadb");
  const url = new URL(process.env.DATABASE_URL);
  if (url.protocol !== "mysql:" || url.hostname === "host" || url.pathname.length < 2) throw new Error("Invalid URL");
  for (const key of url.searchParams.keys()) {
    if (key !== "ssl") throw new Error("Unsupported URL option");
  }
  if (url.searchParams.has("ssl") && url.searchParams.get("ssl") !== "true") throw new Error("Invalid TLS option");
  const adapter = new PrismaMariaDb({ host: url.hostname, port: Number(url.port || 3306), user: decodeURIComponent(url.username), password: decodeURIComponent(url.password), database: decodeURIComponent(url.pathname.slice(1)), connectionLimit: 1, connectTimeout: 5000, ...(url.searchParams.get("ssl") === "true" ? { ssl: { rejectUnauthorized: true } } : {}) });
  client = new PrismaClient({ adapter });
  await client.$queryRaw`SELECT 1`;
  report(true, "Database connection succeeds");
  await client.user.count();
  report(true, "User table exists");
} catch {
  report(false, "Database configuration, connection or schema is unavailable. Check .env and migrations.");
} finally { await client?.$disconnect(); }
process.exitCode = failed ? 1 : 0;
