"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  FileText,
  Sparkles,
  ShieldAlert,
  ShieldX,
  RefreshCw,
  Clock,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useAdminDashboard } from "@/src/hooks/useAdminDashboard";
import { AdminStatCard } from "@/src/components/Admin/AdminStatCard";
import { AnalyticsCharts } from "@/src/components/Admin/AnalyticsCharts";
import { SystemGauges } from "@/src/components/Admin/SystemGauges";
import { DataTableFeed } from "@/src/components/Admin/DataTableFeed";
import { AdminErrorBoundary } from "@/src/components/Admin/AdminErrorBoundary";
import {
  StatCardSkeleton,
  ChartCardSkeleton,
  GaugeCardSkeleton,
} from "@/src/components/Admin/AdminSkeletons";

const Dashboard: React.FC = () => {
  const {
    statsQuery,
    analyticsQuery,
    usersQuery,
    generationsQuery,
    bansQuery,
    usersPage,
    setUsersPage,
    generationsPage,
    setGenerationsPage,
    bansPage,
    setBansPage,
    autoRefreshInterval,
    setAutoRefreshInterval,
    isFetchingAny,
    isErrorAny,
    refetchAll,
  } = useAdminDashboard();

  const stats = statsQuery.data;
  const analytics = analyticsQuery.data;
  const users = usersQuery.data;
  const generations = generationsQuery.data;
  const bans = bansQuery.data;

  const isLoadingInitial =
    statsQuery.isLoading ||
    analyticsQuery.isLoading ||
    usersQuery.isLoading ||
    generationsQuery.isLoading ||
    bansQuery.isLoading;

  return (
    <div className="relative min-h-screen bg-cornsilk text-slate-800 antialiased selection:bg-tea-green pb-16">
      {/* Dynamic ambient background blobs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: "easeInOut" }}
        className="pointer-events-none fixed left-10 top-10 h-96 w-96 rounded-full bg-tea-green/30 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="pointer-events-none fixed bottom-10 right-10 h-96 w-96 rounded-full bg-papaya-whip blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6">
        {/* Sticky Header Navigation */}
        <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-white/50 bg-white/40 p-4 shadow-xl backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/60 text-slate-700 shadow transition-transform hover:scale-105"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  CV<span className="text-light-bronze font-black">Forbes</span>{" "}
                  Admin
                </h1>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-extrabold text-emerald-800 border border-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Command
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                System telemetry & real-time administrative metrics
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Auto Refresh Dropdown */}
            <div className="flex items-center gap-1.5 rounded-2xl border border-white/60 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <span>Refresh:</span>
              <select
                value={autoRefreshInterval}
                onChange={(e) => setAutoRefreshInterval(Number(e.target.value))}
                className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
              >
                <option value={0}>Off</option>
                <option value={15000}>15s</option>
                <option value={30000}>30s</option>
                <option value={60000}>60s</option>
              </select>
            </div>

            {/* Manual Refetch Button */}
            <button
              onClick={refetchAll}
              disabled={isFetchingAny}
              className="flex items-center gap-2 rounded-2xl bg-light-bronze px-4 py-2 text-xs font-extrabold text-white shadow-lg shadow-light-bronze/25 transition-all hover:bg-light-bronze-hover active:scale-95 disabled:opacity-50"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isFetchingAny ? "animate-spin" : ""}`}
              />
              <span>Sync</span>
            </button>
          </div>
        </header>

        {/* Global Error Banner */}
        {isErrorAny && (
          <AdminErrorBoundary
            onRetry={refetchAll}
            message="Unable to reach the AI backend admin APIs. Displaying cached metrics where available."
          />
        )}

        {/* Top 6 Stat Cards Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {isLoadingInitial ? (
              Array.from({ length: 6 }).map((_, i) => (
                <StatCardSkeleton key={i} />
              ))
            ) : (
              <>
                <AdminStatCard
                  title="Total Registered Users"
                  value={stats?.total_users ?? 0}
                  subText="Total system accounts"
                  trend={{ value: "+12.4%", isPositive: true }}
                  icon={<Users className="h-6 w-6" />}
                  iconBgClass="bg-sky-100 text-sky-700"
                  progressPercent={
                    stats
                      ? Math.round(
                          (stats.active_today / (stats.total_users || 1)) * 100,
                        )
                      : 0
                  }
                />
                <AdminStatCard
                  title="Active Users Today"
                  value={stats?.active_today ?? 0}
                  subText="Daily active creators"
                  trend={{ value: "+8.1%", isPositive: true }}
                  icon={<UserCheck className="h-6 w-6" />}
                  iconBgClass="bg-tea-green/40 text-slate-800"
                  badgeText="Live"
                />
                <AdminStatCard
                  title="Total Generations"
                  value={stats?.total_generations ?? 0}
                  subText="Resumes & Cover letters created"
                  trend={{ value: "+18.6%", isPositive: true }}
                  icon={<FileText className="h-6 w-6" />}
                  iconBgClass="bg-light-bronze/20 text-light-bronze-hover"
                />
                <AdminStatCard
                  title="Generations Today"
                  value={stats?.generated_today ?? 0}
                  subText="AI workflows run today"
                  trend={{ value: "+5.3%", isPositive: true }}
                  icon={<Sparkles className="h-6 w-6" />}
                  iconBgClass="bg-papaya-whip text-slate-800"
                  progressPercent={
                    stats
                      ? Math.round(
                          (stats.generated_today /
                            (stats.total_generations || 1)) *
                            100,
                        )
                      : 0
                  }
                />
                <AdminStatCard
                  title="Temporary Bans"
                  value={stats?.temporary_bans ?? 0}
                  subText="Rate limit throttles"
                  icon={<ShieldAlert className="h-6 w-6" />}
                  iconBgClass="bg-amber-100 text-amber-700"
                />
                <AdminStatCard
                  title="Permanent Bans"
                  value={stats?.permanent_bans ?? 0}
                  subText="Blocked IP identifiers"
                  icon={<ShieldX className="h-6 w-6" />}
                  iconBgClass="bg-rose-100 text-rose-700"
                />
              </>
            )}
          </div>
        </section>

        {/* Charts & Categorical Distributions */}
        <section className="mb-8">
          {isLoadingInitial ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ChartCardSkeleton />
              </div>
              <div>
                <ChartCardSkeleton />
              </div>
            </div>
          ) : (
            <AnalyticsCharts
              dailyGenerations={analytics?.daily_generations}
              providerUsage={analytics?.provider_usage}
              averageGenerationMs={analytics?.average_generation_ms}
            />
          )}
        </section>

        {/* System Progress Indicators & Ratios */}
        <section className="mb-8">
          {isLoadingInitial ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <GaugeCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <SystemGauges stats={stats} analytics={analytics} />
          )}
        </section>

        {/* Polished Live Data Feed Table */}
        <section className="mb-8">
          <DataTableFeed
            generations={generations}
            users={users}
            bans={bans}
            generationsPage={generationsPage}
            setGenerationsPage={setGenerationsPage}
            usersPage={usersPage}
            setUsersPage={setUsersPage}
            bansPage={bansPage}
            setBansPage={setBansPage}
            isLoadingGenerations={generationsQuery.isFetching}
            isLoadingUsers={usersQuery.isFetching}
            isLoadingBans={bansQuery.isFetching}
          />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
