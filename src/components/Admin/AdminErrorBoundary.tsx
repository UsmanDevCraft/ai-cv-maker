"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { AdminErrorBoundaryProps } from "@/src/types/admin";

export const AdminErrorBoundary: React.FC<AdminErrorBoundaryProps> = ({
  onRetry,
  message = "Failed to fetch administrative data from backend.",
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-rose-200 bg-rose-50/70 p-8 shadow-xl backdrop-blur-xl text-center my-6">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 shadow-md mb-4">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <h3 className="text-xl font-extrabold text-slate-900">
        Network Communication Error
      </h3>
      <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto font-medium">
        {message} Please ensure the backend server is running and your
        administrative API token is valid.
      </p>

      <button
        onClick={onRetry}
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-xl active:scale-95"
      >
        <RefreshCw className="h-4 w-4" />
        Retry Connection
      </button>
    </div>
  );
};
