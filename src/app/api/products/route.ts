import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const products = await getPrisma().product.findMany({
      where: { status: 'ACTIVE', deletedAt: null }, orderBy: { model: 'asc' },
      select: { model: true, series: true, type: true, width: true, finish: true,
        brand: { select: { name: true } }, category: { select: { name: true } },
        images: { take: 1, orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }], select: { url: true } } },
    });
    return NextResponse.json({
      data: products.map(product => ({ model: product.model, brand: product.brand.name,
        category: product.category.name, series: product.series || '', type: product.type || '',
        width: product.width || '', finish: product.finish || '', image: product.images[0]?.url || '' })),
      meta: { pricingPublic: false, stockPublic: false, importMode: 'manual-csv' },
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch { return NextResponse.json({ error: 'Catalog service unavailable.' }, { status: 503, headers: { 'Cache-Control': 'no-store' } }); }
}
