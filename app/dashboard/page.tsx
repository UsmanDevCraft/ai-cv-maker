import dynamic from "next/dynamic";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import LoadingScreen from "@/src/components/LoadingScreen";

const ALLOWED_EMAILS =
  process.env.NEXT_PUBLIC_ALLOWED_ADMIN_EMAILS?.split(",").map((email) =>
    email.trim(),
  ) ?? [];

const DashboardPage = dynamic(() => import("@/src/view/Dashboard"), {
  loading: () => <LoadingScreen />,
});

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) {
    notFound();
  }

  const userEmails = user.emailAddresses.map((e) =>
    e.emailAddress.toLowerCase(),
  );
  const isRoleAdmin = user.publicMetadata?.role === "admin";
  const isWhitelistedEmail = userEmails.some((email) =>
    ALLOWED_EMAILS.includes(email),
  );

  if (!isRoleAdmin && !isWhitelistedEmail) {
    notFound();
  }

  return <DashboardPage />;
}
