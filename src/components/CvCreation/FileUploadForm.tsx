import { formatFileSize } from "@/src/lib/helper";
import { FinalTailoredOutput } from "@/src/types/cv_template";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, UploadCloud, X, FileCheck } from "lucide-react";
import { useState } from "react";

const FileUploadForm = ({
  setLoading,
  setResult,
}: {
  setLoading: (loading: boolean) => void;
  setResult: (result: FinalTailoredOutput) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [isDragging, setIsDragging] = useState(false);

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
      const droppedFile = e.dataTransfer.files[0];
      if (
        droppedFile.type === "application/pdf" ||
        droppedFile.name.endsWith(".pdf")
      ) {
        setFile(droppedFile);
      } else {
        alert("Only PDF files are supported!");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.name.endsWith(".pdf")
      ) {
        setFile(selectedFile);
      } else {
        alert("Only PDF files are supported!");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !jobDesc)
      return alert("Please upload a CV and paste job requirements.");

    setLoading(true);
    const formData = new FormData();
    formData.append("cv_file", file);
    formData.append("job_description", jobDesc);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/tailor-cv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok)
        throw new Error("Failed to generate tailored CV assets.");

      const data: FinalTailoredOutput = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("An error occurred while compiling assets.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      key="input"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      className="space-y-8"
    >
      {/* Header Title Section */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-tea-green px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-sm mb-4"
        >
          <Sparkles className="h-3.5 w-3.5 text-slate-800 animate-pulse" />
          AI-Powered Application Tailoring Workspace
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Optimize Your Professional Assets
        </h1>
        <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
          Upload your current resume and paste the job description to tailor
          your CV and cover letter for high conversion.
        </p>
      </div>

      {/* Input panels */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Panel: File Upload */}
          <div className="flex flex-col justify-between rounded-3xl border border-white/50 bg-white/30 p-6 shadow-xl backdrop-blur-md">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  1. Upload Your Current CV (PDF)
                </label>
                <p className="text-xs text-slate-500 mb-4">
                  We will extract your experience data to align it with the
                  target job.
                </p>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all min-h-[220px] ${
                  isDragging
                    ? "border-light-bronze bg-light-bronze/10 scale-102"
                    : "border-slate-300 hover:border-light-bronze bg-white/60 hover:bg-white cursor-pointer"
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {!file ? (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-papaya-whip text-light-bronze mb-4">
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
                ) : (
                  <>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-tea-green text-slate-800 mb-4">
                      <FileCheck className="h-6 w-6 text-slate-800" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 truncate max-w-[220px]">
                      {file.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 font-semibold">
                      {formatFileSize(file.size)}
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="mt-4 rounded-lg bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-700 px-3 py-1.5 text-xs font-bold transition-all flex items-center gap-1.5 z-10"
                    >
                      <X className="h-3.5 w-3.5" />
                      Remove File
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Job Description Input */}
          <div className="rounded-3xl border border-white/50 bg-white/30 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
            <div className="space-y-4 h-full flex flex-col">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">
                  2. Target Job Description & Requirements
                </label>
                <p className="text-xs text-slate-500 mb-4">
                  Paste the job details to identify key keywords and
                  requirements.
                </p>
              </div>

              <textarea
                rows={8}
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
                placeholder="Paste the company overview, core job duties, and tech stack criteria here..."
                className="w-full flex-1 p-4 rounded-2xl border border-white/50 bg-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-light-bronze text-slate-800 placeholder-slate-400 text-sm transition-all shadow-inner resize-none min-h-[220px]"
              />
            </div>
          </div>
        </div>

        {/* Submit Action */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            disabled={!file || !jobDesc}
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-light-bronze hover:bg-light-bronze-hover disabled:bg-slate-300 text-white font-bold text-base px-8 py-4 shadow-xl shadow-light-bronze/25 disabled:shadow-none hover:shadow-light-bronze/35 hover:-translate-y-0.5 disabled:hover:translate-y-0 transition-all cursor-pointer"
          >
            <span>Tailor CV & Cover Letter</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-disabled:translate-x-0" />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default FileUploadForm;
