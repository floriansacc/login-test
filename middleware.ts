import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const loginInfo = request.cookies.get("loginInfo")?.value;

  if (!loginInfo) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Dashboard (root path)
    "/((?!login|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public)^/$)",
  ],
};
