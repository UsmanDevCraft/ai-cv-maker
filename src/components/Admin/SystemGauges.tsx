"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Zap, ShieldAlert, Clock } from "lucide-react";
import { SystemGaugesProps } from "@/src/types/admin";

export const SystemGauges: React.FC<SystemGaugesProps> = ({
  stats,
  analytics,
}) => {
  const totalUsers = stats?.total_users || 1;
  const activeToday = stats?.active_today || 0;
  const activeUserRatio = Math.round((activeToday / totalUsers) * 100);

  const totalGenerations = stats?.total_generations || 1;
  const generatedToday = stats?.generated_today || 0;
  const generationRatio = Math.min(
    Math.round((generatedToday / totalGenerations) * 100),
    100,
  );

  const avgMs = analytics?.average_generation_ms || 2500;
  // Latency performance score (lower ms is better, max 8000ms scale)
  const latencyScore = Math.max(
    10,
    Math.min(100, Math.round(100 - (avgMs / 8000) * 100)),
  );

  const tempBans = stats?.temporary_bans || 0;
  const permBans = stats?.permanent_bans || 0;
  const totalBans = tempBans + permBans;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {/* Active User Ratio Gauge */}
      <motion.div
        whileHover={{ y: -3 }}
        className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Active Ratio
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-tea-green/40 text-slate-800">
            <Users className="h-4 w-4" />
          </div>
        </div>

        <div className="my-4 flex items-center justify-between">
          <div className="relative flex h-20 w-20 items-center justify-center">
            <svg
              className="h-full w-full transform -rotate-90"
              viewBox="0 0 36 36"
            >
              <path
                className="text-slate-200"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <motion.path
                className="text-light-bronze"
                strokeWidth="4"
                strokeDasharray={`${activeUserRatio}, 100`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                initial={{ strokeDasharray: "0, 100" }}
                animate={{ strokeDasharray: `${activeUserRatio}, 100` }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-extrabold text-slate-900">
              {activeUserRatio}%
            </span>
          </div>

          <div className="text-right">
            <div className="text-xl font-black text-slate-900">
              {activeToday}
            </div>
            <div className="text-xs text-slate-500 font-medium">
              of {totalUsers} users
            </div>
          </div>
        </div>

        <div className="text-xs font-semibold text-slate-600 bg-cornsilk px-3 py-1.5 rounded-xl border border-papaya-whip text-center">
          Active Engagement Rate
        </div>
      </motion.div>

      {/* Generation Share Gauge */}
      <motion.div
        whileHover={{ y: -3 }}
        className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Daily Share
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-light-bronze/20 text-light-bronze-hover">
            <Zap className="h-4 w-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">
              {generatedToday}
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              Today
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Total: {totalGenerations.toLocaleString()}
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Volume Share</span>
            <span>{generationRatio}%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${generationRatio}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-gradient-to-r from-tea-green to-light-bronze rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Latency Health Gauge */}
      <motion.div
        whileHover={{ y: -3 }}
        className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Speed Health
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
            <Clock className="h-4 w-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">
              {(avgMs / 1000).toFixed(2)}s
            </span>
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
              {avgMs < 4000 ? "Optimal" : "Moderate"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Average AI latency</p>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Latency Health Index</span>
            <span>{latencyScore}/100</span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${latencyScore}%` }}
              transition={{ duration: 1 }}
              className="h-full bg-sky-500 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Security & Ban Density */}
      <motion.div
        whileHover={{ y: -3 }}
        className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Security Status
          </span>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <ShieldAlert className="h-4 w-4" />
          </div>
        </div>

        <div className="my-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">
              {totalBans}
            </span>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
              Active Bans
            </span>
          </div>
          <div className="flex gap-3 text-xs text-slate-600 mt-1 font-medium">
            <span>
              Temp: <strong className="text-amber-700">{tempBans}</strong>
            </span>
            <span>
              Perm: <strong className="text-rose-700">{permBans}</strong>
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>Temp vs Permanent</span>
            <span>
              {totalBans > 0 ? Math.round((tempBans / totalBans) * 100) : 100}%
              Temp
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-rose-200 overflow-hidden flex">
            <div
              style={{
                width: `${totalBans > 0 ? (tempBans / totalBans) * 100 : 50}%`,
              }}
              className="h-full bg-amber-500"
            />
            <div
              style={{
                width: `${totalBans > 0 ? (permBans / totalBans) * 100 : 50}%`,
              }}
              className="h-full bg-rose-600"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
