import { NextResponse } from "next/server";
import { showrooms } from "@/lib/site-data";

export async function GET() {
  return NextResponse.json({
    data: showrooms,
    meta: {
      appointmentRouting: "country",
    },
  });
}
