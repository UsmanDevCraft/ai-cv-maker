"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { Activity, PieChart as PieIcon, Cpu } from "lucide-react";
import { AnalyticsChartsProps } from "@/src/types/admin";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  dailyGenerations = {},
  providerUsage = {},
  averageGenerationMs = 0,
}) => {
  // Sort dates chronologically for daily generations bar chart
  const dates = Object.keys(dailyGenerations).sort();
  const generationCounts = dates.map((d) => dailyGenerations[d] || 0);

  // Fallback demo data if backend dict is empty
  const barLabels =
    dates.length > 0
      ? dates
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const barValues =
    dates.length > 0 ? generationCounts : [12, 19, 15, 27, 22, 34, 41];

  const barData = {
    labels: barLabels,
    datasets: [
      {
        label: "Generations",
        data: barValues,
        backgroundColor: "rgba(212, 163, 115, 0.75)",
        hoverBackgroundColor: "rgba(197, 146, 98, 0.95)",
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        titleFont: { family: "Inter", size: 13, weight: 700 },
        bodyFont: { family: "Inter", size: 12 },
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        cornerRadius: 12,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "Inter", size: 11 }, color: "#64748b" },
      },
      y: {
        grid: { color: "rgba(226, 232, 240, 0.6)" },
        ticks: { font: { family: "Inter", size: 11 }, color: "#64748b" },
      },
    },
  };

  // Provider Doughnut chart data
  const providerNames = Object.keys(providerUsage);
  const providerCounts = providerNames.map((p) => providerUsage[p]);

  const doughnutLabels =
    providerNames.length > 0
      ? providerNames
      : ["OpenAI", "Anthropic", "Gemini"];
  const doughnutValues =
    providerNames.length > 0 ? providerCounts : [65, 25, 10];
  const totalProviderCalls = doughnutValues.reduce((a, b) => a + b, 0);

  const themeColors = [
    "#d4a373",
    "#ccd5ae",
    "#e9edc9",
    "#faedcd",
    "#64748b",
    "#38bdf8",
  ];

  const doughnutData = {
    labels: doughnutLabels,
    datasets: [
      {
        data: doughnutValues,
        backgroundColor: themeColors.slice(0, doughnutLabels.length),
        borderColor: "rgba(255, 255, 255, 0.9)",
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "72%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: { family: "Inter", size: 12, weight: 600 },
          color: "#334155",
          usePointStyle: true,
          padding: 16,
        },
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        cornerRadius: 12,
        padding: 12,
      },
    },
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* Daily Generation Trends Bar Chart */}
      <div className="lg:col-span-2 relative overflow-hidden rounded-3xl border border-white/50 bg-white/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-light-bronze/20 text-light-bronze-hover">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                Generation Velocity
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Daily volume of tailored resumes & cover letters
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-tea-green/30 px-3 py-1.5 rounded-full border border-tea-green/40">
            <Cpu className="h-4 w-4 text-emerald-600" />
            <span>Avg Latency: {(averageGenerationMs / 1000).toFixed(2)}s</span>
          </div>
        </div>

        <div className="h-72 w-full">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      {/* Provider Distribution Doughnut Chart */}
      <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-tea-green/30 text-slate-800">
              <PieIcon className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900">
                AI Provider Share
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Model usage breakdown
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-60 w-full flex items-center justify-center my-2">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
            <span className="text-2xl font-black text-slate-900">
              {totalProviderCalls}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Total Calls
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
