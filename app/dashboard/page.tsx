import dynamic from "next/dynamic";
import LoadingScreen from "@/src/components/LoadingScreen";

const DashboardPage = dynamic(() => import("@/src/view/Dashboard"), {
  loading: () => <LoadingScreen />,
});

export default function Dashboard() {
  return <DashboardPage />;
}
