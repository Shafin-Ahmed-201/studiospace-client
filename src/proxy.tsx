
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
  // Check whether the user has a Better Auth session cookie
  const sessionCookie = getSessionCookie(request);

  // If the user is not logged in, redirect to sign-in
  if (!sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);

    // Remember the page the user wanted to visit
    signInUrl.searchParams.set(
      "callbackURL",
      request.nextUrl.pathname
    );

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/add-studio/:path*",
    "/my-listings/:path*",
    "/my-bookings/:path*",
    "/edit-studio/:path*",
    "/studios/edit/:path*",
  ],
};
