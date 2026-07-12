import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import { cvCreationSteps } from "../constants/loadingScreen";

const CvCreationLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) =>
        prev < cvCreationSteps.length - 1 ? prev + 1 : prev,
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-xl mx-auto border border-white/50 bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-2xl text-center space-y-6"
    >
      <div className="relative w-24 h-24 mx-auto bg-light-bronze/10 rounded-full flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-light-bronze border-t-transparent animate-spin" />
        <Sparkles className="h-10 w-10 text-light-bronze animate-pulse" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-900">
          Tailoring Your Assets
        </h3>
        <p className="text-sm text-slate-500">
          Please wait. Our AI is optimizing your profile for the target role.
        </p>
      </div>

      <div className="text-left space-y-3 bg-white/50 rounded-2xl p-6 border border-white/30">
        {cvCreationSteps.map((step, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 text-xs font-semibold"
          >
            {idx < currentStep ? (
              <div className="h-5 w-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <Check className="h-3 w-3" />
              </div>
            ) : idx === currentStep ? (
              <div className="h-5 w-5 rounded-full border-2 border-light-bronze border-t-transparent animate-spin" />
            ) : (
              <div className="h-5 w-5 rounded-full bg-slate-100 border border-slate-200" />
            )}
            <span
              className={
                idx === currentStep
                  ? "text-slate-900 font-bold"
                  : idx < currentStep
                    ? "text-slate-500 line-through"
                    : "text-slate-400"
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default CvCreationLoader;
