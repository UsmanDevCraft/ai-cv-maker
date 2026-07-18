"use client";

import { useState, useEffect } from "react";
import { usePDF, PDFDownloadLink } from "@react-pdf/renderer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  Check,
  TrendingUp,
  ArrowLeft,
  Copy,
  Download,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import {
  FinalTailoredOutput,
  PDFPreviewPanelProps,
} from "../../types/cv_template";
import { CVDocument } from "../../components/CvCreation/CvDocument";
import { CoverLetterDocument } from "../../components/CvCreation/CoverLetterDocument";
import CvCreationLoader from "../../components/CvCreation/CvCreationLoader";
import FileUploadForm from "@/src/components/CvCreation/FileUploadForm";
import { ResumeAnalytics } from "../../components/CvCreation/ResumeAnalytics";

// Organic floating background blobs matching landing page
const FloatingBlobs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-[10%] left-[5%] w-[35rem] h-[35rem] rounded-full bg-tea-green/20 blur-[120px] animate-pulse duration-[8000ms]" />
    <div className="absolute top-[30%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-papaya-whip/40 blur-[100px] animate-pulse duration-[10000ms]" />
    <div className="absolute bottom-[20%] left-[15%] w-[40rem] h-[40rem] rounded-full bg-beige/30 blur-[130px] animate-pulse duration-[12000ms]" />
  </div>
);

const PDFPreviewPanel = ({
  cv,
  coverLetterText,
  activePreviewTab,
}: PDFPreviewPanelProps) => {
  const [cvPdf, updateCvPdf] = usePDF({
    document: <CVDocument data={cv} />,
  });

  const [clPdf, updateClPdf] = usePDF({
    document: <CoverLetterDocument cv={cv} coverLetterText={coverLetterText} />,
  });

  // Re-generate PDFs if parameters modify
  useEffect(() => {
    updateCvPdf(<CVDocument data={cv} />);
    updateClPdf(
      <CoverLetterDocument cv={cv} coverLetterText={coverLetterText} />,
    );
  }, [cv, coverLetterText, updateCvPdf, updateClPdf]);

  const activePdf = activePreviewTab === "cv" ? cvPdf : clPdf;

  if (activePdf.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 shadow-inner">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-light-bronze" />
        <p className="mt-4 text-sm font-bold text-slate-600">
          Compiling live PDF view...
        </p>
      </div>
    );
  }

  if (activePdf.error) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 text-red-500 p-6 text-center">
        <p className="font-bold text-sm">Error compiling PDF preview</p>
        <p className="text-xs mt-1 opacity-70">{activePdf.error.toString()}</p>
        <button
          onClick={() => {
            updateCvPdf(<CVDocument data={cv} />);
            updateClPdf(
              <CoverLetterDocument cv={cv} coverLetterText={coverLetterText} />,
            );
          }}
          className="mt-4 bg-light-bronze text-white text-xs px-3 py-1.5 rounded-lg font-bold"
        >
          Retry Preview Render
        </button>
      </div>
    );
  }

  return (
    <div className="h-[600px] bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 overflow-hidden shadow-inner flex flex-col relative">
      {activePdf.url ? (
        <iframe
          src={`${activePdf.url}#toolbar=0&navpanes=0`}
          className="w-full h-full border-none"
          title="PDF Document Preview"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-slate-500">
          No PDF preview available.
        </div>
      )}
    </div>
  );
};

export default function CvCreationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FinalTailoredOutput | null>(null);

  // UI state hooks
  const [copied, setCopied] = useState(false);
  const [downloadDropdownOpen, setDownloadDropdownOpen] = useState(false);
  const [activeReviewTab, setActiveReviewTab] = useState<"cv" | "cl">("cv");
  const [activePreviewTab, setActivePreviewTab] = useState<"cv" | "cl">("cv");

  const handleReviewTabChange = (tab: "cv" | "cl") => {
    setActiveReviewTab(tab);
    setActivePreviewTab(tab); // Synchronize document preview automatically for ease of use
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.cover_letter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Convert Cover Letter text to professional Microsoft Word compatible HTML blob format
  const handleDownloadDoc = () => {
    if (!result) return;
    const formattedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const paragraphs = result.cover_letter
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const contactInfo = [
      result.cv.email,
      result.cv.phone,
      ...result.cv.links.map(({ text, url }) => text || url).filter(Boolean),
    ]
      .filter(Boolean)
      .join(" | ");

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <title>Cover Letter - ${result.cv.full_name}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: 8.5in 11in;
            margin: 1.0in 1.0in 1.0in 1.0in;
          }
          body {
            font-family: 'Arial', sans-serif;
            font-size: 11pt;
            line-height: 1.5;
            color: #333333;
          }
          .header {
            border-bottom: 1px solid #cccccc;
            padding-bottom: 10px;
            margin-bottom: 25px;
          }
          .name {
            font-size: 18pt;
            font-weight: bold;
            color: #111111;
            text-transform: uppercase;
            margin: 0;
          }
          .contact {
            font-size: 9.5pt;
            color: #666666;
            margin-top: 5px;
            margin-bottom: 0;
          }
          .date {
            margin-top: 20px;
            margin-bottom: 20px;
            color: #555555;
          }
          .paragraph {
            margin-bottom: 12pt;
            text-align: justify;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="name">${result.cv.full_name}</h1>
          <p class="contact">${contactInfo}</p>
        </div>
        <p class="date">${formattedDate}</p>
        ${paragraphs.map((p) => `<p class="paragraph">${p}</p>`).join("")}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff" + htmlContent], {
      type: "application/msword",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${result.cv.full_name.replace(/\s+/g, "_")}_Cover_Letter.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-cornsilk font-sans text-slate-800 antialiased selection:bg-tea-green pb-16">
      <FloatingBlobs />

      {/* STICKY WORKSPACE NAVIGATION */}
      <header className="sticky top-0 z-50 w-full border-b border-white/30 bg-white/20 backdrop-blur-lg transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-light-bronze text-white shadow-md shadow-light-bronze/20 transition-transform group-hover:scale-105">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              CV<span className="text-light-bronze font-black">Forbes</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm font-bold text-slate-600 transition-colors hover:text-light-bronze flex items-center gap-1.5"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER WORKSPACE */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-12 md:px-8">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-12"
            >
              <CvCreationLoader />
            </motion.div>
          ) : !result ? (
            <FileUploadForm setLoading={setLoading} setResult={setResult} />
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Back Link Row */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setResult(null)}
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-light-bronze bg-white/60 border border-white/50 px-3 py-2 rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-sm cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Tailor New Application
                </button>
              </div>

              {/* RESUME ANALYTICS SECTION */}
              {result.analytics && (
                <div className="bg-white/40 border border-white/50 p-6 rounded-3xl shadow-xl backdrop-blur-md">
                  <ResumeAnalytics analytics={result.analytics} />
                </div>
              )}

              {/* TWO COLUMN WORKSPACE DASHBOARD */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* LEFT SIDE PANEL: COMPONENT & REVIEW CONTAINER */}
                <div className="rounded-3xl border border-white/50 bg-white/30 p-6 shadow-xl backdrop-blur-md flex flex-col h-[700px]">
                  {/* Title & ATS Match Indicator */}
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <span className="text-[10px] bg-emerald-100 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">
                        Assets Optimized
                      </span>
                      <h2 className="text-xl font-extrabold text-slate-900 mt-1.5">
                        {result.cv.experience[0]?.role || "Target Role"} Review
                      </h2>
                    </div>
                    <div className="rounded-2xl bg-emerald-600 px-4 py-3 text-white shadow-lg shadow-emerald-600/20 flex flex-col items-center">
                      <TrendingUp className="h-5 w-5" />
                      <span className="text-lg font-black mt-0.5">
                        {result.analytics?.ats_score ?? 98}%
                      </span>
                      <span className="text-[8px] font-bold opacity-80 uppercase tracking-widest">
                        ATS Match
                      </span>
                    </div>
                  </div>

                  {/* Navigation Tab Selector */}
                  <div className="flex border-b border-slate-200/50 mb-6 gap-2">
                    <button
                      onClick={() => handleReviewTabChange("cv")}
                      className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                        activeReviewTab === "cv"
                          ? "border-light-bronze text-light-bronze"
                          : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Optimized CV Review
                    </button>
                    <button
                      onClick={() => handleReviewTabChange("cl")}
                      className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                        activeReviewTab === "cl"
                          ? "border-light-bronze text-light-bronze"
                          : "border-transparent text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Cover Letter Content
                    </button>
                  </div>

                  {/* Active tab content area */}
                  <div className="flex-1 overflow-y-auto pr-1">
                    {activeReviewTab === "cv" ? (
                      <div className="space-y-6">
                        {/* Target Role & Summary Context */}
                        <div className="bg-white/60 border border-white/50 p-5 rounded-2xl shadow-sm space-y-4">
                          <div>
                            <span className="font-bold text-xs text-slate-400 uppercase tracking-wider block">
                              Target Role Title
                            </span>
                            <p className="text-slate-800 font-bold text-base mt-1">
                              {result.cv.experience[0]?.role || "N/A"}
                            </p>
                          </div>
                          <div className="border-t border-slate-200/50 pt-3">
                            <span className="font-bold text-xs text-slate-400 uppercase tracking-wider block mb-1">
                              Professional Summary Context
                            </span>
                            <p className="text-slate-700 italic text-sm leading-relaxed">
                              &ldquo;{result.cv.professional_summary}&rdquo;
                            </p>
                          </div>
                        </div>

                        {/* Optimised Skills */}
                        <div className="bg-white/60 border border-white/50 p-5 rounded-2xl shadow-sm space-y-4">
                          <span className="font-bold text-xs text-slate-400 uppercase tracking-wider block mb-2">
                            Extracted & Tailored Skill Tags
                          </span>
                          {result.cv.skills && result.cv.skills.length > 0 && (
                            <div className="space-y-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                Core Skills
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {result.cv.skills.map((skill, i) => (
                                  <span
                                    key={i}
                                    className="bg-white/80 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg text-xs font-semibold hover:border-light-bronze/40 transition-colors shadow-sm"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          {result.cv.technical_skills &&
                            result.cv.technical_skills.length > 0 && (
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                  Technical Skills
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {result.cv.technical_skills.map(
                                    (skill, i) => (
                                      <span
                                        key={i}
                                        className="bg-white/80 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg text-xs font-semibold hover:border-light-bronze/40 transition-colors shadow-sm"
                                      >
                                        {skill}
                                      </span>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                          {result.cv.soft_skills &&
                            result.cv.soft_skills.length > 0 && (
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                  Soft Skills
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {result.cv.soft_skills.map((skill, i) => (
                                    <span
                                      key={i}
                                      className="bg-white/80 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg text-xs font-semibold hover:border-light-bronze/40 transition-colors shadow-sm"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          {result.cv.tools_and_technologies &&
                            result.cv.tools_and_technologies.length > 0 && (
                              <div className="space-y-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                                  Tools & Technologies
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {result.cv.tools_and_technologies.map(
                                    (skill, i) => (
                                      <span
                                        key={i}
                                        className="bg-white/80 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-lg text-xs font-semibold hover:border-light-bronze/40 transition-colors shadow-sm"
                                      >
                                        {skill}
                                      </span>
                                    ),
                                  )}
                                </div>
                              </div>
                            )}
                        </div>

                        {/* Experience timeline */}
                        <div className="space-y-4">
                          <span className="font-bold text-xs text-slate-400 uppercase tracking-wider block">
                            Experience Alignment Highlights
                          </span>
                          <div className="space-y-4">
                            {result.cv.experience.map((exp, i) => (
                              <div
                                key={i}
                                className="bg-white/60 border border-white/50 p-5 rounded-2xl shadow-sm"
                              >
                                <div className="flex justify-between items-start gap-4">
                                  <div>
                                    <h4 className="font-extrabold text-slate-900 text-sm">
                                      {exp.role}
                                    </h4>
                                    <p className="text-xs text-light-bronze font-bold">
                                      {exp.company}
                                    </p>
                                  </div>
                                  <span className="text-[10px] bg-light-bronze/10 text-light-bronze px-2.5 py-1 rounded-full font-bold whitespace-nowrap">
                                    {exp.duration}
                                  </span>
                                </div>
                                <ul className="mt-4 space-y-2 text-xs text-slate-600 list-disc pl-4 leading-relaxed">
                                  {exp.bullet_points.map((bullet, idx) => (
                                    <li key={idx}>{bullet}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4 h-full flex flex-col">
                        <div className="flex justify-between items-center bg-white/40 border border-white/40 p-3 rounded-2xl">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">
                            Cover Letter Content
                          </span>
                          <div className="flex gap-2 relative">
                            {/* Copy Button */}
                            <button
                              onClick={handleCopy}
                              className="flex items-center gap-1.5 bg-white/80 border border-white/60 hover:bg-white text-slate-700 hover:text-slate-900 text-xs font-bold px-3 py-2 rounded-xl shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                            >
                              {copied ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                                  <span className="text-emerald-600">
                                    Copied
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  <span>Copy Text</span>
                                </>
                              )}
                            </button>

                            {/* Download Dropdown */}
                            <div className="relative">
                              <button
                                onClick={() =>
                                  setDownloadDropdownOpen(!downloadDropdownOpen)
                                }
                                className="flex items-center gap-1.5 bg-light-bronze hover:bg-light-bronze-hover text-white text-xs font-bold px-3 py-2 rounded-xl shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
                              >
                                <Download className="h-3.5 w-3.5" />
                                <span>Download</span>
                                <ChevronDown className="h-3.5 w-3.5" />
                              </button>

                              <AnimatePresence>
                                {downloadDropdownOpen && (
                                  <>
                                    <div
                                      className="fixed inset-0 z-10"
                                      onClick={() =>
                                        setDownloadDropdownOpen(false)
                                      }
                                    />
                                    <motion.div
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 10 }}
                                      className="absolute right-0 mt-1.5 w-48 rounded-xl border border-white/40 bg-white shadow-xl backdrop-blur-md z-20 overflow-hidden"
                                    >
                                      <div className="flex flex-col">
                                        <PDFDownloadLink
                                          document={
                                            <CoverLetterDocument
                                              cv={result.cv}
                                              coverLetterText={
                                                result.cover_letter
                                              }
                                            />
                                          }
                                          fileName={`${result.cv.full_name.replace(/\s+/g, "_")}_Cover_Letter.pdf`}
                                          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                          onClick={() =>
                                            setDownloadDropdownOpen(false)
                                          }
                                        >
                                          {({ loading }) => (
                                            <>
                                              <FileText className="h-4 w-4 text-slate-500" />
                                              <span>
                                                {loading
                                                  ? "Preparing PDF..."
                                                  : "Download as PDF"}
                                              </span>
                                            </>
                                          )}
                                        </PDFDownloadLink>

                                        <button
                                          onClick={() => {
                                            handleDownloadDoc();
                                            setDownloadDropdownOpen(false);
                                          }}
                                          className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer border-t border-slate-100"
                                        >
                                          <FileText className="h-4 w-4 text-slate-500" />
                                          <span>Download as Word (.DOC)</span>
                                        </button>
                                      </div>
                                    </motion.div>
                                  </>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>

                        {/* Plain text display */}
                        <div className="flex-1 whitespace-pre-wrap text-sm text-slate-600 bg-white/70 border border-white/50 p-5 rounded-2xl leading-relaxed shadow-inner max-h-[480px] overflow-y-auto">
                          {result.cover_letter}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT SIDE PANEL: LIVE DOCUMENT PREVIEW */}
                <div className="rounded-3xl border border-white/50 bg-white/30 p-6 shadow-xl backdrop-blur-md flex flex-col h-[700px]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-light-bronze" />
                      <h3 className="font-extrabold text-slate-900 text-sm">
                        Live PDF Document Preview
                      </h3>
                    </div>

                    {/* PDF Document Selector */}
                    <div className="flex bg-white/50 p-1 rounded-xl border border-white/40 gap-1">
                      <button
                        onClick={() => setActivePreviewTab("cv")}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          activePreviewTab === "cv"
                            ? "bg-light-bronze text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        CV Preview
                      </button>
                      <button
                        onClick={() => setActivePreviewTab("cl")}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                          activePreviewTab === "cl"
                            ? "bg-light-bronze text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-800"
                        }`}
                      >
                        Cover Letter Preview
                      </button>
                    </div>
                  </div>

                  {/* Render dynamic PDF compiler */}
                  <div className="flex-1">
                    <PDFPreviewPanel
                      cv={result.cv}
                      coverLetterText={result.cover_letter}
                      activePreviewTab={activePreviewTab}
                    />
                  </div>

                  {/* Immediate Download Bar at Bottom */}
                  {activePreviewTab === "cv" && (
                    <div className="mt-4">
                      <PDFDownloadLink
                        document={<CVDocument data={result.cv} />}
                        fileName={`${result.cv.full_name.replace(/\s+/g, "_")}_Tailored_CV.pdf`}
                        className="flex w-full items-center justify-center gap-2 bg-light-bronze hover:bg-light-bronze-hover text-white text-center text-sm font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98"
                      >
                        {({ loading }) => (
                          <>
                            <Download className="h-4 w-4" />
                            <span>
                              {loading
                                ? "Compiling PDF..."
                                : "Download Tailored CV (PDF)"}
                            </span>
                          </>
                        )}
                      </PDFDownloadLink>
                    </div>
                  )}
                  {activePreviewTab === "cl" && (
                    <div className="mt-4">
                      <PDFDownloadLink
                        document={
                          <CoverLetterDocument
                            cv={result.cv}
                            coverLetterText={result.cover_letter}
                          />
                        }
                        fileName={`${result.cv.full_name.replace(/\s+/g, "_")}_Cover_Letter.pdf`}
                        className="flex w-full items-center justify-center gap-2 bg-light-bronze hover:bg-light-bronze-hover text-white text-center text-sm font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98"
                      >
                        {({ loading }) => (
                          <>
                            <Download className="h-4 w-4" />
                            <span>
                              {loading
                                ? "Compiling PDF..."
                                : "Download Cover Letter (PDF)"}
                            </span>
                          </>
                        )}
                      </PDFDownloadLink>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
