import {
  clerkMiddleware,
  createRouteMatcher,
  clerkClient,
} from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const ALLOWED_EMAILS =
  process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS?.split(",").map((email) =>
    email.trim(),
  ) ?? [];

const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isDashboardRoute(request)) {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }

    try {
      const client = await clerkClient();
      const user = await client.users.getUser(userId);
      const emails = user.emailAddresses.map((e) =>
        e.emailAddress.toLowerCase(),
      );

      const isRoleAdmin = user.publicMetadata?.role === "admin";
      const isWhitelistedEmail = emails.some((email) =>
        ALLOWED_EMAILS.includes(email),
      );

      if (!isRoleAdmin && !isWhitelistedEmail) {
        return NextResponse.rewrite(new URL("/not-found", request.url));
      }
    } catch {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
