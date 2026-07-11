"use client";

import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { FinalTailoredOutput } from "../../types/cv_template";
import { CVDocument } from "../../components/CvDocument";

export default function CvCreationPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FinalTailoredOutput | null>(null);

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
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          AI CV Tailor Workspace
        </h1>
        <p className="text-slate-500 mt-1">
          Transform your base experience into highly focused, job-targeted
          professional assets instantly.
        </p>
      </header>

      {!result ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-xl border shadow-sm"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Upload Your Current CV (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Target Job Description & Requirements
            </label>
            <textarea
              rows={8}
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the company overview, core job duties, and tech stack criteria here..."
              className="w-full p-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white font-medium text-sm py-3 rounded-lg hover:bg-slate-800 disabled:bg-slate-300 transition-colors"
          >
            {loading
              ? "Analyzing & Compiling Documents..."
              : "Tailor CV & Cover Letter"}
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Action & Preview Left Column */}
          <div className="space-y-6">
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl space-y-4">
              <h3 className="font-bold text-emerald-900">
                Your Tailored Assets are Ready!
              </h3>

              <div className="flex flex-col gap-3">
                <PDFDownloadLink
                  document={<CVDocument data={result.cv} />}
                  fileName={`${result.cv.full_name.replace(/\s+/g, "_")}_Tailored_CV.pdf`}
                  className="bg-emerald-600 text-white text-center text-sm font-medium py-2 px-4 rounded-lg hover:bg-emerald-700 transition"
                >
                  {({ loading }) =>
                    loading ? "Preparing PDF..." : "Download Tailored CV (PDF)"
                  }
                </PDFDownloadLink>
              </div>
            </div>

            <div className="p-6 border rounded-xl bg-white space-y-3">
              <h3 className="font-bold text-slate-900">
                Generated Cover Letter
              </h3>
              <div className="whitespace-pre-wrap text-sm text-slate-600 bg-slate-50 p-4 rounded-lg leading-relaxed border max-h-[400px] overflow-y-auto">
                {result.cover_letter}
              </div>
            </div>
          </div>

          {/* Structured CV UI Editor Panel Right Column */}
          <div className="p-6 border rounded-xl bg-white space-y-4">
            <h3 className="font-bold text-slate-900">CV Component Review</h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="font-semibold block text-slate-500">
                  Target Role Title
                </span>
                <p className="text-slate-800 font-medium">
                  {result.cv.experience[0]?.role || "N/A"}
                </p>
              </div>
              <div>
                <span className="font-semibold block text-slate-500">
                  Summary Context alignment
                </span>
                <p className="text-slate-700 italic mt-1 bg-slate-50 p-3 rounded border">
                  {result.cv.professional_summary}
                </p>
              </div>
              <div>
                <span className="font-semibold block text-slate-500">
                  Extracted & Tailored Skill Tags
                </span>
                <div className="flex flex-wrap gap-1 mt-2">
                  {result.cv.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
