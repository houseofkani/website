import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/** Exit draft preview and fall back to the published site. */
export async function GET(request: Request) {
  (await draftMode()).disable();
  return NextResponse.redirect(new URL("/journal", request.url));
}
