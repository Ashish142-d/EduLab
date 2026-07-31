import { clerkMiddleware } from "@clerk/nextjs/server";

const satelliteDomain = process.env.NEXT_PUBLIC_CLERK_SATELLITE_DOMAIN;

export default clerkMiddleware(
  satelliteDomain
    ? { satellite: { domain: satelliteDomain, signInUrl: "/" } }
    : {}
);

export const config = {
  matcher: [
    // Skip Next.js internals and static files unless found in search params
    "/((?!_next|.*\\..*|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};
