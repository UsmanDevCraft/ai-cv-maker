"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AdminStatCardProps } from "@/src/types/admin";

export const AdminStatCard: React.FC<AdminStatCardProps> = ({
  title,
  value,
  subText,
  trend,
  icon,
  iconBgClass = "bg-light-bronze/20 text-light-bronze-hover",
  progressPercent,
  badgeText,
}) => {
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-3xl border border-white/50 bg-white/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl hover:border-white/80"
    >
      {/* Background subtle glow overlay */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-tea-green/20 blur-2xl transition-all duration-500 group-hover:scale-150" />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-slate-900">
              {typeof value === "number" ? value.toLocaleString() : value}
            </span>
            {badgeText && (
              <span className="rounded-full bg-tea-green/40 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
                {badgeText}
              </span>
            )}
          </div>
        </div>

        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconBgClass} shadow-inner transition-transform group-hover:scale-110 duration-300`}
        >
          {icon}
        </div>
      </div>

      {/* Trend & Subtext */}
      <div className="relative z-10 mt-4 flex items-center justify-between">
        {trend ? (
          <div className="flex items-center gap-1.5 text-xs font-bold">
            <span
              className={`flex items-center gap-0.5 rounded-lg px-2 py-0.5 ${
                trend.isPositive
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {trend.value}
            </span>
            <span className="text-slate-500 font-medium">{subText}</span>
          </div>
        ) : (
          subText && (
            <span className="text-xs font-medium text-slate-500">
              {subText}
            </span>
          )
        )}
      </div>

      {/* Optional Progress Bar */}
      {typeof progressPercent === "number" && (
        <div className="relative z-10 mt-4 w-full overflow-hidden rounded-full bg-slate-200/60 h-1.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${Math.min(Math.max(progressPercent, 0), 100)}%`,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-light-bronze to-tea-green"
          />
        </div>
      )}
    </motion.div>
  );
};
