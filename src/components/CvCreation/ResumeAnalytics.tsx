"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ResumeAnalytics as ResumeAnalyticsType } from "../../types/cv_template";
import { Cpu, Search, Tag, Briefcase, Target } from "lucide-react";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Hydration helper functions to avoid SSR mismatch without cascading renders
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

// Easing count-up animation helper
function CountUp({
  value,
  duration = 1500,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);

      // easeOutQuad easing
      const easeProgress = progressRatio * (2 - progressRatio);

      setCount(Math.floor(easeProgress * value));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return <>{count}</>;
}

interface AnalyticsCardProps {
  title: string;
  score: number;
  explanation: string;
  icon: React.ReactNode;
}

function AnalyticsCard({
  title,
  score,
  explanation,
  icon,
}: AnalyticsCardProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  // Color Mapping rules:
  // 90–100 -> Emerald Green
  // 75–89 -> Blue
  // 60–74 -> Amber
  // Below 60 -> Red
  const getColorConfig = (val: number) => {
    if (val >= 90) {
      return {
        bg: "bg-tea-green/20",
        text: "text-emerald-800",
        border: "border-tea-green/60",
        chartColor: "#ccd5ae", // tea-green
        chartBg: "rgba(204, 213, 174, 0.2)",
        shadow: "shadow-tea-green/10",
        badge: "bg-tea-green/30 text-emerald-800 border border-tea-green/50",
      };
    } else if (val >= 75) {
      return {
        bg: "bg-beige/40",
        text: "text-amber-900",
        border: "border-beige/80",
        chartColor: "#d4a373", // light-bronze
        chartBg: "rgba(212, 163, 115, 0.15)",
        shadow: "shadow-light-bronze/10",
        badge: "bg-beige/60 text-amber-900 border border-beige/60",
      };
    } else if (val >= 60) {
      return {
        bg: "bg-papaya-whip/30",
        text: "text-amber-800",
        border: "border-papaya-whip/80",
        chartColor: "#e69a48", // rich bronze-orange for readability
        chartBg: "rgba(250, 237, 205, 0.3)",
        shadow: "shadow-papaya-whip/10",
        badge: "bg-papaya-whip/60 text-amber-800 border border-papaya-whip/60",
      };
    } else {
      return {
        bg: "bg-red-50/50",
        text: "text-red-700",
        border: "border-red-200/50",
        chartColor: "#ef4444",
        chartBg: "rgba(239, 68, 68, 0.08)",
        shadow: "shadow-red-500/5",
        badge: "bg-red-100/50 text-red-700 border border-red-200/40",
      };
    }
  };

  const colors = getColorConfig(score);

  // Doughnut chart data
  const data = {
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [colors.chartColor, colors.chartBg],
        borderWidth: 0,
        borderRadius: score > 0 ? 4 : 0,
      },
    ],
  };

  const options = {
    cutout: "80%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
    animation: {
      duration: 1500,
      animateRotate: true,
      animateScale: false,
    },
  };

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative flex flex-col items-center justify-between p-6 rounded-2xl border backdrop-blur-xl shadow-lg hover:shadow-xl ${colors.bg} ${colors.border} ${colors.shadow} transition-shadow duration-300`}
    >
      {/* Top Section with Icon & Title */}
      <div className="w-full flex items-center justify-between gap-2 mb-4">
        <div className={`p-2 rounded-xl ${colors.badge} transition-colors`}>
          {icon}
        </div>
        <span
          className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.badge}`}
        >
          {score >= 90
            ? "Excellent"
            : score >= 75
              ? "Good"
              : score >= 60
                ? "Average"
                : "Poor"}
        </span>
      </div>

      {/* Circular Progress Area */}
      <div className="relative w-32 h-32 my-2 flex items-center justify-center">
        {mounted ? (
          <Doughnut data={data} options={options} />
        ) : (
          <div className="w-full h-full rounded-full border-[8px] border-slate-100" />
        )}
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-slate-800 tracking-tight">
            <CountUp value={score} />
            <span className="text-lg font-bold text-slate-500">%</span>
          </span>
        </div>
      </div>

      {/* Text Details */}
      <div className="text-center mt-4 space-y-1">
        <h4 className="font-extrabold text-slate-900 text-sm tracking-tight">
          {title}
        </h4>
        <p className="text-xs text-slate-600 font-medium leading-relaxed px-1">
          {explanation}
        </p>
      </div>
    </motion.div>
  );
}

interface ResumeAnalyticsProps {
  analytics: ResumeAnalyticsType;
}

export function ResumeAnalytics({ analytics }: ResumeAnalyticsProps) {
  if (!analytics) return null;

  const metrics = [
    {
      key: "ats_score",
      title: "ATS Score",
      score: analytics.ats_score,
      explanation:
        "Evaluates layout, sections structure, readability, and compatibility with parser algorithms.",
      icon: <Cpu className="h-4 w-4" />,
    },
    {
      key: "resume_parse_rate",
      title: "Resume Parse Rate",
      score: analytics.resume_parse_rate,
      explanation:
        "Measures how easily information like contact info, education, and dates can be extracted.",
      icon: <Search className="h-4 w-4" />,
    },
    {
      key: "keyword_match",
      title: "Keyword Match",
      score: analytics.keyword_match,
      explanation:
        "Checks presence of hard technologies, systems, and soft-skill keywords from the job criteria.",
      icon: <Tag className="h-4 w-4" />,
    },
    {
      key: "experience_relevance",
      title: "Experience Relevance",
      score: analytics.experience_relevance,
      explanation:
        "Grades match of previous roles, work history highlights, and seniority with target responsibilities.",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      key: "overall_job_match",
      title: "Overall Job Match",
      score: analytics.overall_job_match,
      explanation:
        "Synthesized suitability index showing how well you fit the core needs of this specific role.",
      icon: <Target className="h-4 w-4" />,
    },
  ];

  return (
    <div className="w-full space-y-6 py-4">
      {/* Header text */}
      <div className="space-y-1.5 text-left">
        <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <span>Resume Analytics</span>
        </h3>
        <p className="text-sm font-semibold text-slate-500">
          See how well your resume aligns with the selected job and how
          ATS-friendly it is.
        </p>
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {metrics.map((metric) => (
          <AnalyticsCard
            key={metric.key}
            title={metric.title}
            score={metric.score}
            explanation={metric.explanation}
            icon={metric.icon}
          />
        ))}
      </div>
    </div>
  );
}
