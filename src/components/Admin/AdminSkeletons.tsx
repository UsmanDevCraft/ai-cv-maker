"use client";

export const StatCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 rounded-md bg-slate-200/70" />
        <div className="h-10 w-10 rounded-2xl bg-slate-200/70" />
      </div>
      <div className="mt-4 h-8 w-32 rounded-lg bg-slate-300/80" />
      <div className="mt-4 flex items-center gap-2">
        <div className="h-3 w-16 rounded bg-slate-200/70" />
        <div className="h-3 w-28 rounded bg-slate-200/50" />
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-slate-200/60" />
    </div>
  );
};

export const ChartCardSkeleton = ({ height = "h-72" }: { height?: string }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="h-5 w-40 rounded-md bg-slate-300/80" />
          <div className="h-3 w-56 rounded-md bg-slate-200/70" />
        </div>
        <div className="h-8 w-24 rounded-xl bg-slate-200/70" />
      </div>
      <div
        className={`w-full ${height} rounded-2xl bg-slate-200/50 flex items-end justify-between p-4 gap-2`}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="w-full rounded-t-lg bg-slate-300/70"
            style={{ height: `${30 + (i % 4) * 20}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export const GaugeCardSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl animate-pulse flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div className="h-5 w-32 rounded-md bg-slate-300/80" />
        <div className="h-8 w-8 rounded-full bg-slate-200/70" />
      </div>
      <div className="my-6 flex items-center justify-center">
        <div className="h-32 w-32 rounded-full border-8 border-slate-200/70 border-t-slate-300 flex items-center justify-center">
          <div className="h-6 w-16 rounded bg-slate-300/80" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-3 w-20 rounded bg-slate-200/70" />
          <div className="h-3 w-12 rounded bg-slate-300/80" />
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200/60" />
      </div>
    </div>
  );
};

export const TableSkeleton = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/40 p-6 shadow-xl backdrop-blur-xl animate-pulse">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="h-6 w-48 rounded-md bg-slate-300/80" />
        <div className="flex gap-2">
          <div className="h-9 w-28 rounded-xl bg-slate-200/70" />
          <div className="h-9 w-28 rounded-xl bg-slate-200/70" />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-3 border-b border-slate-200/40"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-slate-200/70" />
              <div className="space-y-1">
                <div className="h-4 w-36 rounded bg-slate-300/80" />
                <div className="h-3 w-24 rounded bg-slate-200/60" />
              </div>
            </div>
            <div className="h-6 w-20 rounded-full bg-slate-200/70" />
          </div>
        ))}
      </div>
    </div>
  );
};
