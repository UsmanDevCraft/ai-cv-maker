"use client";

import React, { useState } from "react";
import {
  FileText,
  Users,
  ShieldBan,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { TableSkeleton } from "./AdminSkeletons";
import { DataTableFeedProps, TabType } from "@/src/types/admin";

export const DataTableFeed: React.FC<DataTableFeedProps> = ({
  generations,
  users,
  bans,
  generationsPage,
  setGenerationsPage,
  usersPage,
  setUsersPage,
  bansPage,
  setBansPage,
  isLoadingGenerations = false,
  isLoadingUsers = false,
  isLoadingBans = false,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("generations");
  const [searchQuery, setSearchQuery] = useState("");

  const formatTime = (isoString?: string) => {
    if (!isoString) return "N/A";
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return isoString;
    }
  };

  const getStatusBadge = (status: string) => {
    const upper = status.toUpperCase();
    if (upper === "SUCCESS" || upper === "COMPLETED") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
          <CheckCircle2 className="h-3 w-3" />
          SUCCESS
        </span>
      );
    }
    if (upper === "FAILED" || upper === "ERROR") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
          <XCircle className="h-3 w-3" />
          FAILED
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
        <AlertTriangle className="h-3 w-3" />
        {upper}
      </span>
    );
  };

  const getBanBadge = (banType: string) => {
    const upper = banType.toUpperCase();
    if (upper === "PERMANENT") {
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-xs font-bold text-rose-800">
          PERMANENT
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800">
        TEMPORARY
      </span>
    );
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/50 p-6 shadow-xl backdrop-blur-xl transition-all duration-300">
      {/* Header & Tabs */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/50 rounded-2xl w-fit">
          <button
            onClick={() => setActiveTab("generations")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
              activeTab === "generations"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="h-4 w-4" />
            Generations Log ({generations?.total || 0})
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
              activeTab === "users"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="h-4 w-4" />
            Recent Users ({users?.total || 0})
          </button>
          <button
            onClick={() => setActiveTab("bans")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-200 ${
              activeTab === "bans"
                ? "bg-white text-slate-900 shadow-md"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <ShieldBan className="h-4 w-4" />
            Active Bans ({bans?.total || 0})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-white/60 bg-white/70 pl-9 pr-4 py-2 text-xs font-semibold text-slate-800 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-light-bronze/50"
          />
        </div>
      </div>

      {/* Content Feed Tables */}
      {activeTab === "generations" &&
        (isLoadingGenerations ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/70 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-3">File / User</th>
                  <th className="pb-3 px-3">Provider & Model</th>
                  <th className="pb-3 px-3 text-center">ATS Score</th>
                  <th className="pb-3 px-3 text-center">Parse Score</th>
                  <th className="pb-3 px-3">Latency</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 px-3 text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/40">
                {generations?.items
                  ?.filter((gen) =>
                    searchQuery
                      ? (
                          gen.filename +
                          (gen.email || "") +
                          gen.provider +
                          gen.model
                        )
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      : true,
                  )
                  .map((gen) => (
                    <tr
                      key={gen.id}
                      className="hover:bg-white/40 transition-colors"
                    >
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-900">
                          {gen.filename || "Untitled CV"}
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          {gen.email ||
                            `Anon: ${gen.anonymous_user_id.slice(0, 8)}...`}
                        </div>
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-semibold text-slate-800 uppercase">
                          {gen.provider}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {gen.model}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-block rounded-lg bg-emerald-50 px-2 py-1 font-black text-emerald-700 border border-emerald-200">
                          {gen.ats_score}%
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <span className="inline-block rounded-lg bg-sky-50 px-2 py-1 font-black text-sky-700 border border-sky-200">
                          {gen.parse_score}%
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-semibold text-slate-700">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {(gen.generation_time_ms / 1000).toFixed(2)}s
                        </span>
                      </td>
                      <td className="py-3.5 px-3">
                        {getStatusBadge(gen.status)}
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-500 font-medium">
                        {formatTime(gen.created_at)}
                      </td>
                    </tr>
                  ))}
                {(!generations?.items || generations.items.length === 0) && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-8 text-center text-slate-400 font-medium"
                    >
                      No generation records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}

      {activeTab === "users" &&
        (isLoadingUsers ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/70 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-3">User Email / ID</th>
                  <th className="pb-3 px-3">IP Address</th>
                  <th className="pb-3 px-3 text-center">Requests Today</th>
                  <th className="pb-3 px-3 text-center">Total Requests</th>
                  <th className="pb-3 px-3">Last Seen</th>
                  <th className="pb-3 px-3 text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/40">
                {users?.items
                  ?.filter((user) =>
                    searchQuery
                      ? (user.ip + (user.email || "") + user.id)
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      : true,
                  )
                  .map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-white/40 transition-colors"
                    >
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-slate-900">
                          {user.email || "Anonymous User"}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400">
                          {user.id}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-mono font-semibold text-slate-700">
                        {user.ip}
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-800">
                        {user.requests_today}
                      </td>
                      <td className="py-3.5 px-3 text-center font-bold text-slate-800">
                        {user.total_requests}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 font-medium">
                        {formatTime(user.last_seen)}
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-500 font-medium">
                        {formatTime(user.created_at)}
                      </td>
                    </tr>
                  ))}
                {(!users?.items || users.items.length === 0) && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-slate-400 font-medium"
                    >
                      No user activity records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}

      {activeTab === "bans" &&
        (isLoadingBans ? (
          <TableSkeleton />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200/70 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="pb-3 px-3">IP Address</th>
                  <th className="pb-3 px-3">Fingerprint</th>
                  <th className="pb-3 px-3">Reason</th>
                  <th className="pb-3 px-3">Type</th>
                  <th className="pb-3 px-3">Expires At</th>
                  <th className="pb-3 px-3 text-right">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/40">
                {bans?.items
                  ?.filter((ban) =>
                    searchQuery
                      ? (ban.ip + ban.reason + ban.fingerprint)
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      : true,
                  )
                  .map((ban) => (
                    <tr
                      key={ban.id}
                      className="hover:bg-white/40 transition-colors"
                    >
                      <td className="py-3.5 px-3 font-mono font-bold text-rose-700">
                        {ban.ip}
                      </td>
                      <td className="py-3.5 px-3 font-mono text-[11px] text-slate-500">
                        {ban.fingerprint
                          ? `${ban.fingerprint.slice(0, 16)}...`
                          : "N/A"}
                      </td>
                      <td className="py-3.5 px-3 font-medium text-slate-800">
                        {ban.reason}
                      </td>
                      <td className="py-3.5 px-3">
                        {getBanBadge(ban.ban_type)}
                      </td>
                      <td className="py-3.5 px-3 text-slate-600 font-medium">
                        {ban.expires_at
                          ? formatTime(ban.expires_at)
                          : "Never (Permanent)"}
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-500 font-medium">
                        {formatTime(ban.created_at)}
                      </td>
                    </tr>
                  ))}
                {(!bans?.items || bans.items.length === 0) && (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-8 text-center text-slate-400 font-medium"
                    >
                      No active bans recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ))}

      {/* Pagination Footer */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-200/60 pt-4 text-xs font-semibold text-slate-600">
        <div>
          {activeTab === "generations" &&
            `Page ${generations?.page || 1} of ${generations?.total_pages || 1}`}
          {activeTab === "users" &&
            `Page ${users?.page || 1} of ${users?.total_pages || 1}`}
          {activeTab === "bans" &&
            `Page ${bans?.page || 1} of ${bans?.total_pages || 1}`}
        </div>

        <div className="flex items-center gap-2">
          {activeTab === "generations" && (
            <>
              <button
                disabled={generationsPage <= 1}
                onClick={() => setGenerationsPage(generationsPage - 1)}
                className="flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </button>
              <button
                disabled={generationsPage >= (generations?.total_pages || 1)}
                onClick={() => setGenerationsPage(generationsPage + 1)}
                className="flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}

          {activeTab === "users" && (
            <>
              <button
                disabled={usersPage <= 1}
                onClick={() => setUsersPage(usersPage - 1)}
                className="flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </button>
              <button
                disabled={usersPage >= (users?.total_pages || 1)}
                onClick={() => setUsersPage(usersPage + 1)}
                className="flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}

          {activeTab === "bans" && (
            <>
              <button
                disabled={bansPage <= 1}
                onClick={() => setBansPage(bansPage - 1)}
                className="flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </button>
              <button
                disabled={bansPage >= (bans?.total_pages || 1)}
                onClick={() => setBansPage(bansPage + 1)}
                className="flex items-center gap-1 rounded-xl border border-slate-300 px-3 py-1.5 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
