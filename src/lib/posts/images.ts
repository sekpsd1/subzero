import "server-only";
import sharp from "sharp";
import path from "node:path";
import { mkdir, writeFile, unlink, readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { getPrisma } from "@/lib/prisma";
import { audit } from "@/lib/catalog/service";
import { CatalogError } from "@/lib/catalog/validation.mjs";
import { boundedBody } from "@/lib/catalog/http";
import { lockPost, postInclude } from "./service";
export function mediaRoot() {
  return path.join(process.cwd(), ".post-media");
}
export async function uploadImage(
  request: Request,
  userId: string,
  postId: string,
  isAdmin: boolean,
) {
  if (!request.headers.get("content-type")?.startsWith("multipart/form-data;"))
    throw new CatalogError(415, "Multipart upload required.");
  const body = await boundedBody(request, 6 * 1024 * 1024);
  let form: FormData;
  try {
    form = await new Request("http://localhost", {
      method: "POST",
      headers: { "content-type": request.headers.get("content-type")! },
      body: new Uint8Array(body),
    }).formData();
  } catch {
    throw new CatalogError(400, "Invalid upload.");
  }
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0 || file.size > 5 * 1024 * 1024)
    throw new CatalogError(422, "Choose one image, maximum 5 MiB.");
  const formats: Record<string, string> = {
    "image/jpeg": "jpeg",
    "image/png": "png",
    "image/webp": "webp",
  };
  if (!formats[file.type])
    throw new CatalogError(415, "Only JPEG, PNG and WebP are supported.");
  const bytes = Buffer.from(await file.arrayBuffer());
  let output: Buffer;
  try {
    const image = sharp(bytes, {
      limitInputPixels: 24_000_000,
      failOn: "warning",
      animated: true,
    });
    const meta = await image.metadata();
    if (
      meta.format !== formats[file.type] ||
      !meta.width ||
      !meta.height ||
      meta.width > 8000 ||
      meta.height > 8000 ||
      (meta.pages || 1) > 1
    )
      throw new Error("Invalid image");
    // Full decode/re-encode removes metadata, appended payloads and original filenames.
    output = await image.rotate().webp({ quality: 90 }).toBuffer();
  } catch {
    throw new CatalogError(
      422,
      "Image is invalid, animated, too large, or does not match its declared type.",
    );
  }

  const id = randomUUID();
  const url = `/api/post-images/${id}`;
  const root = mediaRoot();
  await mkdir(root, { recursive: true, mode: 0o700 });
  const filename = path.join(root, `${id}.webp`);
  await writeFile(filename, output, { flag: "wx", mode: 0o600 });
  try {
    return await getPrisma().$transaction(async (tx) => {
      const post = await lockPost(tx, postId, form.get("updatedAt") ?? null);
      if (post.status === "PUBLISHED" && !isAdmin)
        throw new CatalogError(403, "Only ADMIN can change published covers.");
      await tx.media.create({
        data: { id, url, mimeType: "image/webp", size: output.length },
      });
      const saved = await tx.post.update({
        where: { id: postId },
        data: {
          coverImage: url,
          seoMeta: {
            upsert: { create: { ogImage: url }, update: { ogImage: url } },
          },
          updatedAt: new Date(
            Math.max(Date.now(), post.updatedAt.getTime() + 1),
          ),
        },
        include: postInclude,
      });
      await audit(tx, userId, "UPLOAD_COVER", "Post", postId);
      return saved;
    });
  } catch (error) {
    await unlink(filename).catch(() => {});
    throw error;
  }
}

export async function removeCover(
  userId: string,
  postId: string,
  input: Record<string, unknown>,
  isAdmin: boolean,
) {
  return getPrisma().$transaction(async (tx) => {
    const p = await lockPost(tx, postId, input.updatedAt);
    if (p.status === "PUBLISHED" && !isAdmin)
      throw new CatalogError(403, "Only ADMIN can change published covers.");
    const saved = await tx.post.update({
      where: { id: postId },
      data: {
        coverImage: null,
        seoMeta: {
          upsert: { create: { ogImage: null }, update: { ogImage: null } },
        },
        updatedAt: new Date(Math.max(Date.now(), p.updatedAt.getTime() + 1)),
      },
      include: postInclude,
    });
    await audit(tx, userId, "REMOVE_COVER", "Post", postId);
    return saved;
  });
}
export async function readImage(id: string) {
  if (!/^[a-f0-9-]{36}$/.test(id)) throw new Error("Invalid image.");
  return readFile(
    /* turbopackIgnore: true */ path.join(mediaRoot(), id + ".webp"),
  );
}
