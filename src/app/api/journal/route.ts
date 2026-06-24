import { NextResponse } from "next/server";
import { journalPosts } from "@/lib/site-data";

export async function GET() {
  return NextResponse.json({
    data: journalPosts,
    meta: {
      workflow: "wordpress-like",
      supportsCategories: true,
      supportsSeoAeo: true,
    },
  });
}
