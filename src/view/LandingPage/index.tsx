"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  CheckCircle2,
  ArrowRight,
  UploadCloud,
  Globe,
  LayoutGrid,
  Link2,
  Check,
  Play,
  X,
  Briefcase,
  Cpu,
  FileCheck,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CometCard from "@/src/components/CometCard";
import Testimonials from "@/src/components/Testimonials";
import Navbar from "@/src/components/shared/Navbar";
import { ProductTabs } from "@/src/types/shared";

// Floating background blobs component for organic visual depth
const FloatingBlobs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[10%] left-[5%] w-[35rem] h-[35rem] rounded-full bg-tea-green/20 blur-[120px] animate-pulse duration-[8000ms]" />
    <div className="absolute top-[30%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-papaya-whip/40 blur-[100px] animate-pulse duration-[10000ms]" />
    <div className="absolute bottom-[20%] left-[15%] w-[40rem] h-[40rem] rounded-full bg-beige/30 blur-[130px] animate-pulse duration-[12000ms]" />
  </div>
);

export default function LandingPage() {
  const router = useRouter();
  const [demoOpen, setDemoOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState<ProductTabs>("rewriter");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const productTabs: ProductTabs[] = ["rewriter", "cover", "ats"];

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (typeof window !== "undefined" && window.innerWidth < 1024) {
        return;
      }

      setActiveTab((prev) => {
        const currentIndex = productTabs.indexOf(prev);
        const nextIndex = (currentIndex + 1) % productTabs.length;
        return productTabs[nextIndex];
      });
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Prevent scroll when demo video modal is open
  useEffect(() => {
    if (demoOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [demoOpen]);

  // Simulate file drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      triggerUploadAnimation();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      triggerUploadAnimation();
    }
  };

  const triggerUploadAnimation = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      router.push("/makeyourcv");
    }, 1800);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cornsilk font-sans text-slate-800 antialiased selection:bg-tea-green">
      <FloatingBlobs />

      {/* 1. NAVIGATION BAR */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-12 pb-24 md:px-8 md:pt-20 md:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Heading Copy */}
          <div className="flex flex-col items-start text-left lg:col-span-7">
            {/* Soft Green Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-tea-green px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 text-slate-800 animate-pulse" />
              100% Free & Fully Automated ATS Optimization
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
            >
              Land the Interview. <br />
              <span className="relative inline-block text-light-bronze">
                Tailor Your CV
              </span>{" "}
              in Seconds.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl"
            >
              Instantly adjust your professional experience to match any
              company&apos;s job requirements using advanced AI. High-impact
              bullet points, custom cover letters, and zero hassle.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Link
                href="/makeyourcv"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-light-bronze px-8 py-4 text-base font-bold text-white shadow-xl shadow-light-bronze/25 transition-all duration-300 hover:bg-light-bronze-hover hover:shadow-light-bronze/35 hover:-translate-y-1 active:translate-y-0"
              >
                Tailor Your CV Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-white/50 bg-white/20 px-6 py-4 text-base font-bold text-slate-700 backdrop-blur-md transition-all duration-300 hover:bg-white/40 hover:-translate-y-0.5 active:translate-y-0 shadow-sm"
              >
                <Play className="h-5 w-5 text-light-bronze fill-light-bronze" />
                Watch Demo
              </button>
            </motion.div>

            {/* Client logos trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 w-full border-t border-slate-900/10 pt-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Our users work at top companies
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm font-extrabold text-slate-700 opacity-60">
                <span>Google</span>
                <span>Microsoft</span>
                <span>Stripe</span>
                <span>Airbnb</span>
                <span>Netflix</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Preview Card Visual */}
          <div className="relative flex items-center justify-center lg:col-span-5">
            {/* Visual Box Behind */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-tea-green/20 to-papaya-whip/50 opacity-70 blur-xl" />

            <CometCard
              className="w-full max-w-[420px]"
              scaleFactor={1.03}
              rotateDepth={12}
              translateDepth={10}
            >
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
                className="relative w-full rounded-3xl border border-white/40 bg-white/30 p-5 shadow-2xl backdrop-blur-md"
              >
                {/* Job Requirements Box Header */}
                <div className="mb-4 rounded-xl border border-white/50 bg-[#e9edc9]/50 p-3 shadow-inner">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-light-bronze" />
                      <span className="text-xs font-black tracking-tight text-slate-900">
                        Target Role: Senior AI Engineer
                      </span>
                    </div>
                    <span className="rounded-full bg-light-bronze/10 px-2 py-0.5 text-[9px] font-bold text-light-bronze">
                      Active Matcher
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 border border-white/30">
                      TypeScript
                    </span>
                    <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 border border-white/30">
                      Next.js 14+
                    </span>
                    <span className="rounded bg-white/70 px-1.5 py-0.5 text-[10px] font-semibold text-slate-700 border border-white/30">
                      Framer Motion
                    </span>
                  </div>
                </div>

                {/* CV Wrapper representing the transformation */}
                <div className="relative rounded-2xl border border-white/40 bg-white/80 p-4 shadow-md overflow-hidden">
                  {/* Scanner bar animation */}
                  <motion.div
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                    }}
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-light-bronze to-transparent opacity-80"
                    style={{ top: "0%" }}
                  />

                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="h-8 w-8 rounded-full bg-tea-green/80 flex items-center justify-center text-xs font-black">
                      JD
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        John Doe
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Frontend & AI Systems Developer
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    {/* Experience item 1 */}
                    <div>
                      <div className="flex justify-between items-center">
                        <h5 className="text-[10px] font-bold text-slate-900">
                          Lead Web Developer
                        </h5>
                        <span className="text-[9px] text-slate-400">
                          2023 - Present
                        </span>
                      </div>
                      {/* Skeleton bullet points transforming */}
                      <div className="mt-2.5 space-y-2">
                        <div className="flex items-start gap-1.5">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 4,
                              delay: 0.5,
                            }}
                          >
                            <CheckCircle2 className="h-3 w-3 mt-0.5 text-emerald-600 flex-shrink-0" />
                          </motion.div>
                          <p className="text-[10px] text-slate-600 leading-normal">
                            Built responsive dashboards using{" "}
                            <span className="font-bold text-emerald-700 bg-tea-green/40 px-1 rounded">
                              Next.js 14+
                            </span>
                            , resulting in a 40% performance gain.
                          </p>
                        </div>

                        <div className="flex items-start gap-1.5">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{
                              repeat: Infinity,
                              duration: 4,
                              delay: 1,
                            }}
                          >
                            <CheckCircle2 className="h-3 w-3 mt-0.5 text-emerald-600 flex-shrink-0" />
                          </motion.div>
                          <p className="text-[10px] text-slate-600 leading-normal">
                            Engineered fluid transitions and keyframe layouts
                            using{" "}
                            <span className="font-bold text-emerald-700 bg-tea-green/40 px-1 rounded">
                              Framer Motion
                            </span>{" "}
                            to increase user session duration.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Experience item 2 */}
                    <div className="opacity-60">
                      <div className="flex justify-between items-center">
                        <h5 className="text-[10px] font-bold text-slate-900">
                          Software Developer
                        </h5>
                        <span className="text-[9px] text-slate-400">
                          2021 - 2023
                        </span>
                      </div>
                      <div className="mt-1 h-1.5 w-full rounded bg-slate-200" />
                      <div className="mt-1 h-1.5 w-5/6 rounded bg-slate-200" />
                    </div>
                  </div>

                  {/* Score badge popping up */}
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 1,
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 3,
                    }}
                    className="absolute bottom-2 right-2 rounded-lg bg-emerald-600 px-2 py-1 text-[10px] font-black text-white shadow-md flex items-center gap-1"
                  >
                    <TrendingUp className="h-3 w-3" />
                    ATS: 98%
                  </motion.div>
                </div>
              </motion.div>
            </CometCard>
          </div>
        </div>
      </section>

      {/* 3. CORE PRODUCT CAPABILITIES GRID */}
      <section
        id="features"
        className="relative z-10 border-t border-white/20 bg-white/20 py-24 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-light-bronze">
              Product Features
            </h2>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Engineered for High-Conversion Resumes
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Generic resumes fail ATS screenings. CVForbes uses schema-driven
              semantic mapping to match experience structure directly with
              specific target roles.
            </p>
          </div>

          {/* Interactive Tab Navigation */}
          <div className="mt-12 flex justify-center gap-2">
            {[
              { id: "rewriter", name: "AI CV Rewriter", icon: Cpu },
              { id: "cover", name: "Instant Cover Letters", icon: FileText },
              { id: "ats", name: "ATS Compatibility Matrix", icon: FileCheck },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    setActiveTab(tab.id as any);
                    if (intervalRef.current) {
                      clearInterval(intervalRef.current);
                      intervalRef.current = null;
                    }
                  }}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-light-bronze text-white shadow-md shadow-light-bronze/10"
                      : "border border-white/40 bg-white/30 text-slate-600 hover:bg-white/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Feature Grid Content Display */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              {activeTab === "rewriter" && (
                <motion.div
                  key="rewriter"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid gap-8 lg:grid-cols-12 items-center"
                >
                  <div className="lg:col-span-7 rounded-3xl border border-white/50 bg-[#faedcdff]/30 p-8 shadow-xl backdrop-blur-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-light-bronze shadow-md">
                      <Cpu className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-2xl font-black text-slate-900">
                      JSON-Driven AI CV Rewriter
                    </h3>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      Our system extracts your profile details into a strict
                      JSON Schema standard. Using low-temperature model
                      endpoints, the engine rewrites bullet points to highlight
                      your target responsibilities without fabricating details.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {[
                        "Standardizes experience format into schema-compliant syntax",
                        "Highlights impact and metrics (KPIs) mapped to target parameters",
                        "Strict factual integrity controls to avoid AI hallucinations",
                        "Maintains chronological format for recruiters' convenience",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"
                        >
                          <Check className="h-4.5 w-4.5 text-emerald-700 bg-tea-green rounded-full p-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-5 p-6 rounded-3xl border border-white/40 bg-white/40 shadow-lg backdrop-blur-md">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      AI Engine Playground
                    </h4>
                    <div className="rounded-xl bg-slate-900 p-4 text-xs font-mono text-emerald-400 overflow-x-auto shadow-inner">
                      <span className="text-slate-500">
                        Schema Alignment Output
                      </span>
                      <pre className="mt-2 text-[10px] leading-relaxed whitespace-pre-wrap break-words">
                        {`{
  "original_bullet": "Made dashboard components.",
  "target_keywords": ["Next.js", "Performance"],
  "tailored_bullet": "Engineered client-side dashboard 
   elements in Next.js 14, improving page 
   load metrics by 35% through custom caches."
}`}
                      </pre>
                    </div>
                    <div className="mt-4 text-center">
                      <span className="inline-block rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-800">
                        JSON Schema Validated
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "cover" && (
                <motion.div
                  key="cover"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid gap-8 lg:grid-cols-12 items-center"
                >
                  <div className="lg:col-span-7 rounded-3xl border border-white/50 bg-[#faedcdff]/30 p-8 shadow-xl backdrop-blur-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-light-bronze shadow-md">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-2xl font-black text-slate-900">
                      Instant Contextual Cover Letters
                    </h3>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      Stop writing standard cover letters. CVForbes
                      cross-references your core competencies with details about
                      the hiring manager, target team, and product offering to
                      draft short, high-impact introductory notes.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {[
                        "Includes hiring company's values and products natively",
                        "Highlights your specific match for their pain points",
                        "Maintains a confident, professional, and natural voice",
                        "Exactly aligns formatting with your tailored resume theme",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"
                        >
                          <Check className="h-4.5 w-4.5 text-emerald-700 bg-tea-green rounded-full p-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-5 p-6 rounded-3xl border border-white/40 bg-white/40 shadow-lg backdrop-blur-md">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      Matching Preview
                    </h4>
                    <div className="rounded-xl bg-white border border-slate-100 p-4 text-xs text-slate-700 shadow-inner">
                      <div className="font-bold text-slate-900">
                        Subject: Applying for Frontend Engineer position
                      </div>
                      <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
                        Dear Hiring Team at Vercel,
                        <br />
                        <br />I followed your latest developer tool release with
                        great interest. With my experience building React
                        templates and optimizing bundlers...
                      </p>
                    </div>
                    <div className="mt-4 text-center">
                      <span className="inline-block rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-[11px] font-bold text-amber-800">
                        Personalized for Vercel
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "ats" && (
                <motion.div
                  key="ats"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="grid gap-8 lg:grid-cols-12 items-center"
                >
                  <div className="lg:col-span-7 rounded-3xl border border-white/50 bg-[#faedcdff]/30 p-8 shadow-xl backdrop-blur-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-light-bronze shadow-md">
                      <FileCheck className="h-6 w-6" />
                    </div>
                    <h3 className="mt-6 text-2xl font-black text-slate-900">
                      ATS Keyword Alignment Checker
                    </h3>
                    <p className="mt-4 text-slate-600 leading-relaxed">
                      Avoid the filter bin. We run custom similarity checks
                      between your experience description and the target JD. The
                      analyzer highlights missing tools or frameworks and maps
                      out key alignments before you hit apply.
                    </p>
                    <ul className="mt-6 space-y-3">
                      {[
                        "Extracts keywords based on semantic priority, not simple count",
                        "Visualizes compatibility gaps with actionable instructions",
                        "Recommends alternative phrasing based on actual resume patterns",
                        "Instant score mapping (0 to 100%) showing profile readiness",
                      ].map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2.5 text-sm font-semibold text-slate-700"
                        >
                          <Check className="h-4.5 w-4.5 text-emerald-700 bg-tea-green rounded-full p-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-5 p-6 rounded-3xl border border-white/40 bg-white/40 shadow-lg backdrop-blur-md">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      ATS Compatibility
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                          <span>Developer Tooling Core Match</span>
                          <span className="text-emerald-700">92%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: "92%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                          <span>Responsive Styling Match</span>
                          <span className="text-emerald-700">85%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full"
                            style={{ width: "85%" }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[11px] font-bold text-slate-700 mb-1">
                          <span>Animation Frameworks Match</span>
                          <span className="text-amber-600">60%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: "60%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-light-bronze">
              Simple Process
            </h2>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Three Steps to a Tailored Application
            </p>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Our automated engine does the heavy lifting. You only need to drop
              details and download files.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Upload Base CV (PDF)",
                desc: "Drop your existing general-purpose resume as a PDF file. We'll parse your experience data cleanly.",
                color: "bg-tea-green",
              },
              {
                step: "02",
                title: "Paste Target Job Specs",
                desc: "Paste the company name and job details, or link the listing, to fetch required skills instantly.",
                color: "bg-papaya-whip",
              },
              {
                step: "03",
                title: "Download Assets",
                desc: "Export your customized, high-compatibility CV and cover letter, fully compiled and ready to submit.",
                color: "bg-beige",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl border border-white/50 bg-white/30 p-8 shadow-md backdrop-blur-md group hover:border-light-bronze/40 transition-all duration-300"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl font-black text-slate-800 ${step.color} shadow-sm mb-6`}
                >
                  {step.step}
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-light-bronze transition-colors">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT TESTIMONIALS SECTION */}
      <Testimonials />

      {/* PRICING SECTION */}
      <section
        id="pricing"
        className="relative z-10 border-t border-white/20 bg-white/20 py-24 backdrop-blur-sm"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-light-bronze">
              Flexible Pricing
            </h2>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Simple Plans for Every Candidate
            </p>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              Get started for free or upgrade to handle high-frequency
              application tailoring.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Starter Plan */}
            <div className="rounded-3xl border border-white/50 bg-white/40 p-8 shadow-lg backdrop-blur-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Starter Plan
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  Perfect for casual applicants looking for a quick match.
                </p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-black text-slate-900">$0</span>
                  <span className="ml-2 text-sm text-slate-500">/ forever</span>
                </div>
                <ul className="mt-8 space-y-4">
                  {[
                    "3 custom CV runs / mo",
                    "Standard AI rewriter",
                    "ATS alignment check",
                    "Standard PDF formats",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                    >
                      <Check className="h-4.5 w-4.5 text-slate-800 bg-beige rounded-full p-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/makeyourcv"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-slate-900/10 bg-white px-6 py-3.5 text-center text-sm font-bold text-slate-800 shadow-sm transition-all hover:bg-slate-50"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-3xl border border-light-bronze/30 bg-[#faedcdff]/50 p-8 shadow-xl backdrop-blur-md flex flex-col justify-between overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute top-0 right-6 rounded-b-xl bg-light-bronze px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                Most Popular
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Professional
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  For job seekers running high-volume, targeted applications.
                </p>
                <div className="mt-6 flex items-baseline">
                  <span className="text-5xl font-black text-slate-900">
                    $15
                  </span>
                  <span className="ml-2 text-sm text-slate-600">/ month</span>
                </div>
                <ul className="mt-8 space-y-4">
                  {[
                    "Unlimited resume tailors",
                    "Priority low-latency generation",
                    "Instant Cover Letters included",
                    "Canvas layout styles (Minimalist, Creative)",
                    "Early chrome extension access",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm font-semibold text-slate-800"
                    >
                      <Check className="h-4.5 w-4.5 text-white bg-light-bronze rounded-full p-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/makeyourcv"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-light-bronze px-6 py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-light-bronze/25 transition-all hover:bg-light-bronze-hover"
              >
                Go Pro Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FUTURE PRODUCT ROADMAP GRID (The "Soon" Sections) */}
      <section id="roadmap" className="relative z-10 py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-light-bronze">
              The Horizon
            </h2>
            <p className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Future Product Roadmap
            </p>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              We are consistently expanding our engine. Here is a glimpse of
              features our engineering team is launching soon.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {/* Roadmap Feature 1 */}
            <div className="relative rounded-2xl border border-white/30 bg-white/20 p-8 shadow-sm grayscale opacity-75 backdrop-blur-md hover:grayscale-0 hover:opacity-100 hover:border-light-bronze/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ccd5aeff]/80 text-slate-800">
                    <Link2 className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-tea-green px-2.5 py-1 text-[10px] font-bold text-slate-800">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Automated Job Board Scraper
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Instead of copying and pasting text manually, simply paste a
                  greenhouse, greenhouse.io, LinkedIn, or Indeed job URL. Our
                  crawler parses details natively in the background.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-black text-light-bronze">
                Target Launch: Q3 2026
              </div>
            </div>

            {/* Roadmap Feature 2 */}
            <div className="relative rounded-2xl border border-white/30 bg-white/20 p-8 shadow-sm grayscale opacity-75 backdrop-blur-md hover:grayscale-0 hover:opacity-100 hover:border-light-bronze/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ccd5aeff]/80 text-slate-800">
                    <Globe className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-tea-green px-2.5 py-1 text-[10px] font-bold text-slate-800">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Companion Chrome Extension
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Tailor your CV and generate cover letters directly inside
                  active sidebar panels on job description boards. Hit the apply
                  button with optimized assets instantly.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-black text-light-bronze">
                Target Launch: Q4 2026
              </div>
            </div>

            {/* Roadmap Feature 3 */}
            <div className="relative rounded-2xl border border-white/30 bg-white/20 p-8 shadow-sm grayscale opacity-75 backdrop-blur-md hover:grayscale-0 hover:opacity-100 hover:border-light-bronze/20 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ccd5aeff]/80 text-slate-800">
                    <LayoutGrid className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-tea-green px-2.5 py-1 text-[10px] font-bold text-slate-800">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Multi-Template Canvas Layouts
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Swap design themes seamlessly. Instantly change font hierarchy
                  and margins to match traditional Minimalist, Executive, or
                  bold Creative templates.
                </p>
              </div>
              <div className="mt-6 flex items-center text-xs font-black text-light-bronze">
                Target Launch: Q1 2027
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL HIGH-CONVERTING FOOTER CTA */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 md:px-8">
        <div className="relative rounded-3xl border border-white/40 bg-white/20 p-8 md:p-12 shadow-2xl backdrop-blur-md overflow-hidden">
          {/* Earthy Papaya Whip Gradient Backing Overlay */}
          <div className="absolute inset-0 bg-[#faedcd]/40 opacity-70 pointer-events-none" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6">
              <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Ready to Land Your Next Interview?
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Drop your current resume file into the uploader or browse to
                start. Our engine will guide you through matching job
                specifications in the workspace.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 items-center text-slate-500 text-xs font-semibold">
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" /> Free to try
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" /> PDF format
                  compatible
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-600" /> Secure file
                  processing
                </span>
              </div>
            </div>

            {/* Right: Drop Uploader Zone */}
            <div className="lg:col-span-6">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
                  isDragging
                    ? "border-light-bronze bg-light-bronze/10 scale-102"
                    : "border-slate-300 hover:border-light-bronze bg-white/60 hover:bg-white"
                }`}
              >
                <input
                  type="file"
                  id="footer-file-input"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {isUploading ? (
                  <div className="flex flex-col items-center py-4">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-light-bronze" />
                    <p className="mt-4 text-sm font-bold text-slate-700">
                      Extracting profile structure...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#faedcd] text-light-bronze mb-4">
                      <UploadCloud className="h-6 w-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Drag & Drop your Resume
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Supports PDF format up to 5MB
                    </p>
                    <span className="mt-4 rounded-lg bg-light-bronze px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-light-bronze-hover transition-all">
                      Browse Files
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-slate-900/10 py-12">
        <div className="mx-auto max-w-7xl px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-light-bronze text-white">
              <Sparkles className="h-3 w-3" />
            </div>
            <span className="text-sm font-extrabold tracking-tight text-slate-900">
              CV<span className="text-light-bronze font-black">Forbes</span>
            </span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} CVForbes. Designed to increase
            conversion. All rights reserved.
          </p>
        </div>
      </footer>

      {/* DEMO POPUP MODAL */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-3xl rounded-3xl border border-white/20 bg-cornsilk p-6 shadow-2xl md:p-8"
            >
              {/* Close Button */}
              <button
                onClick={() => setDemoOpen(false)}
                className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/60 hover:bg-white text-slate-600 shadow-sm border border-slate-200 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-xl font-black text-slate-900 mb-2">
                Automated CV Tailoring Demo
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                See how easy it is to upload, review alignments, and download
                tailored PDFs.
              </p>

              {/* Simulated Walkthrough Video Frame */}
              <div className="relative aspect-video w-full rounded-2xl bg-slate-950 overflow-hidden flex flex-col justify-between p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,163,115,0.15),transparent)] pointer-events-none" />

                {/* Simulated Web Application Demo Inside Video */}
                <div className="w-full flex items-center justify-between border-b border-white/10 pb-3 text-[10px] text-slate-400 font-mono">
                  <span>http://cvforbes.ai/demo-sandbox</span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />{" "}
                    Live Session
                  </span>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center my-6">
                  <div className="mb-4 h-14 w-14 rounded-full bg-[#ccd5ae]/20 border border-[#ccd5ae]/40 flex items-center justify-center text-light-bronze">
                    <Sparkles
                      className="h-7 w-7 animate-spin"
                      style={{ animationDuration: "6s" }}
                    />
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    Interactive Sandbox Simulation
                  </h4>
                  <p className="mt-2 text-xs text-slate-400 max-w-sm">
                    In a live environment, dropping a resume extracts structured
                    experience instantly and outputs an optimized PDF tailored
                    to the job description requirements.
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <button
                    onClick={() => {
                      setDemoOpen(false);
                      router.push("/makeyourcv");
                    }}
                    className="rounded-lg bg-light-bronze px-4 py-1.5 text-xs font-bold text-white hover:bg-light-bronze-hover"
                  >
                    Try It Yourself
                  </button>
                  <span className="text-[10px] font-mono text-slate-500">
                    0:10 / 1:30
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
