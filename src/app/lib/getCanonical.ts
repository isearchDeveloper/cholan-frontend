// lib/getCanonical.ts
import { headers } from "next/headers";

export async function getCanonical(pathname: string = "") {
  // ✅ headers() is async in Next.js 15+
  const headersList = await headers();

  // Safely read the host (fallback to production domain)
  const host = headersList.get("host") || "www.cholantours.com";

  // Choose protocol
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  // Normalize path
  const normalizedPath =
    pathname && !pathname.startsWith("/") ? `/${pathname}` : pathname;

  // Return the canonical URL
  return `${"https"}://${host}${normalizedPath}`;
}
