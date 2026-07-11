"use client";

import { motion } from "framer-motion";
import { Sparkles, FileText, CheckCircle2 } from "lucide-react";
import CometCard from "./CometCard";
import { steps } from "../constants/loadingScreen";

export default function LoadingScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cornsilk px-6">
      {/* Background blobs */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut",
        }}
        className="absolute left-20 top-20 h-72 w-72 rounded-full bg-tea-green/30 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "easeInOut",
        }}
        className="absolute bottom-16 right-20 h-80 w-80 rounded-full bg-papaya-whip blur-3xl"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Badge */}
        <CometCard>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/40 bg-tea-green px-4 py-2 text-sm font-semibold text-slate-800 shadow"
          >
            <Sparkles className="h-4 w-4" />
            AI Resume Optimizer
          </motion.div>

          {/* Card */}

          <motion.div className="overflow-hidden rounded-3xl border border-white/40 bg-white/40 p-6 shadow-2xl backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tea-green">
                <FileText className="text-slate-700" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">Tailor your resume</h3>

                <p className="text-sm text-slate-500">
                  This should only take a moment.
                </p>
              </div>
            </div>

            {/* Steps */}

            <div className="mt-8 space-y-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    repeat: Infinity,
                    delay: index * 0.4,
                    duration: 2,
                  }}
                  className="flex items-center gap-3 text-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                  <span className="text-slate-600">{step}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </CometCard>
      </div>
    </div>
  );
}
