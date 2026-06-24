import { cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const projectRoot = process.cwd();
const nextStatic = path.join(projectRoot, ".next", "static");
const publicNext = path.join(projectRoot, "public", "_next");

if (!existsSync(nextStatic)) {
  console.warn("Skipping Plesk static asset copy: .next/static was not found.");
  process.exit(0);
}

await rm(publicNext, { recursive: true, force: true });
await cp(nextStatic, path.join(publicNext, "static"), { recursive: true });

console.log("Copied .next/static to public/_next/static for Plesk.");
