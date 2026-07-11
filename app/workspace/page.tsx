import dynamic from "next/dynamic";
import LoadingScreen from "@/src/components/LoadingScreen";

const CvCreationPage = dynamic(() => import("@/src/view/CvCreationPage"), {
  loading: () => <LoadingScreen />,
});

export default function WorkspacePage() {
  return <CvCreationPage />;
}
