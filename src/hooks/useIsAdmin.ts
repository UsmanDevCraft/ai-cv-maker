"use client";

import { useUser } from "@clerk/nextjs";

const ALLOWED_EMAILS =
  process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS?.split(",").map((email) =>
    email.trim().toLowerCase(),
  ) ?? [];

export function useIsAdmin() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn || !user) {
    return { isAdmin: false, isLoaded };
  }

  const isRoleAdmin = user.publicMetadata?.role === "admin";

  const userEmails = user.emailAddresses.map((e) =>
    e.emailAddress.toLowerCase(),
  );

  const isWhitelistedEmail = userEmails.some((email) =>
    ALLOWED_EMAILS.includes(email),
  );

  const isAdmin = isRoleAdmin || isWhitelistedEmail;

  return { isAdmin, isLoaded };
}
