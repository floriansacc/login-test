import { NextRequest, NextResponse } from "next/server";
import { isTokenExpired } from "./lib/functions/dat";

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (!accessToken || isTokenExpired(accessToken)) {
    // return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// export const config = {
//   matcher: [
//     // Dashboard (root path)
//     "/((?!login|api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|public)^/$)",
//   ],
// };
