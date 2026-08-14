import { readFile, writeFile } from "node:fs/promises";

const [, , sourcePath, outputPath] = process.argv;

if (!sourcePath || !outputPath) {
  throw new Error("Usage: node scripts/generate-brochure-catalog.mjs <source-html> <output-ts>");
}

const html = await readFile(sourcePath, "utf8");
const origin = "https://www.subzero-wolf.com";

function decode(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&nbsp;", " ")
    .trim();
}

function extractBrand(brand, startMarker, endMarker) {
  const start = html.indexOf(startMarker);
  const end = endMarker ? html.indexOf(endMarker, start + startMarker.length) : html.length;
  if (start < 0 || end < 0) throw new Error(`Unable to find ${brand} section`);

  const section = html.slice(start, end);
  const categoryMatches = [...section.matchAll(/<h4 class="h4">([^<]+)<\/h4>/g)];
  const products = [];

  for (let index = 0; index < categoryMatches.length; index += 1) {
    const categoryMatch = categoryMatches[index];
    const category = decode(categoryMatch[1]);
    const categoryEnd = categoryMatches[index + 1]?.index ?? section.length;
    const categoryHtml = section.slice(categoryMatch.index, categoryEnd);
    const itemPattern = /<li class="accordion-list__item js-accordion-list__item">([\s\S]*?)(?=<li class="accordion-list__item js-accordion-list__item">|<\/ul>)/g;

    for (const itemMatch of categoryHtml.matchAll(itemPattern)) {
      const item = itemMatch[1];
      const model = item.match(/<span class="model-number-copy">\s*([^<]+?)\s*<\/span>/)?.[1];
      const name = item.match(/<p class="product-name-copy">([\s\S]*?)<\/p>/)?.[1];
      const image = item.match(/<img src="([^"]+)" alt="">/)?.[1];
      if (!model || !name || !image) continue;

      const decodedModel = decode(model);
      products.push({
        id: `${brand.toLowerCase()}:${decodedModel}`,
        brand,
        category,
        image: image.startsWith("http") ? decode(image) : origin + decode(image),
        isNew: />\s*New\s*</i.test(item),
        model: decodedModel,
        name: decode(name.replace(/<[^>]*>/g, "")),
      });
    }
  }

  return products;
}

const products = [
  ...extractBrand("Wolf", '<h5 class="text-center mt0">Wolf products</h5>', '<h5 class="text-center mt0">Cove products</h5>'),
  ...extractBrand("Cove", '<h5 class="text-center mt0">Cove products</h5>'),
];

const output = `import type { BrochureProduct } from "./brochure-products";\n\n` +
  `export const referenceWolfCoveProducts = ${JSON.stringify(products, null, 2)} as const satisfies readonly BrochureProduct[];\n`;

await writeFile(outputPath, output, "utf8");
console.log(JSON.stringify({ total: products.length, wolf: products.filter((product) => product.brand === "Wolf").length, cove: products.filter((product) => product.brand === "Cove").length }));
