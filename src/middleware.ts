// import { NextResponse } from 'next/server';
// import redirects from './public/redirects.json' assert { type: 'json' };

// export function middleware(req: any) {
//   const url = req.nextUrl.clone();
//   const redirect = redirects.find(r => r.from === url.pathname);

//   if (redirect) {
//     url.pathname = redirect.to;
//     const status = redirect.permanent ? 308 : 307;
//     return NextResponse.redirect(url, status);
//   }

//   return NextResponse.next();
// }

// import { NextResponse } from 'next/server';
// import redirectsData from '../public/redirects.json'; // Import directly (adjust path if needed)

// export async function middleware(req: Request) {
//   const url = new URL(req.url);
//   const pathname = url.pathname;

//   // 1. Check Redirects FIRST
//   const redirect = redirectsData.find((r: any) => r.from === pathname);

//   if (redirect) {
//     url.pathname = redirect.to;
//     const status = redirect.permanent ? 308 : 307;
//     return NextResponse.redirect(url, status);
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!_next|favicon.ico).*)'],
// };


import { NextResponse } from "next/server";
import redirectsData from "../public/redirects.json";

export function middleware(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const parts = pathname.split("/").filter(Boolean);

  /**
   * 🚫 Block this pattern ONLY:
   * /india/delhi/tour-packages
   * /international-holidays/turkey/tour-packages
   */
  if (
    (pathname.startsWith("/india/") ||
      pathname.startsWith("/international-holidays/")) &&
    parts.length === 3 &&
    parts[2] === "tour-packages"
  ) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  //  your existing redirects
  const redirect = redirectsData.find((r: any) => r.from === pathname);
  if (redirect) {
    url.pathname = redirect.to;
    const status = redirect.permanent ? 308 : 307;
    return NextResponse.redirect(url, status);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
