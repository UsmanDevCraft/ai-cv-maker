import dynamic from "next/dynamic";
import LoadingScreen from "@/src/components/LoadingScreen";

const LandingPage = dynamic(() => import("@/src/view/LandingPage"), {
  loading: () => <LoadingScreen />,
});

export default function Page() {
  return <LandingPage />;
}
