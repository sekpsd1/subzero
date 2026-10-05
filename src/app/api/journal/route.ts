import { NextResponse } from "next/server";
import { publicJournal } from "@/lib/posts/public";
export async function GET() {
  try {
    return NextResponse.json(
      {
        data: await publicJournal(),
        meta: {
          workflow: "wordpress-like",
          supportsCategories: true,
          supportsSeoAeo: true,
        },
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { error: "Journal service unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
