import { rm } from "node:fs/promises";
import path from "node:path";

await rm(path.join(process.cwd(), "public", "_next"), {
  recursive: true,
  force: true,
});
