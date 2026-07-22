import {
  AdminAnalytics,
  AdminStats,
  PaginatedBanResponse,
  PaginatedGenerationResponse,
  PaginatedUserResponse,
} from "./api";

export interface AdminStatCardProps {
  title: string;
  value: string | number;
  subText?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  iconBgClass?: string;
  progressPercent?: number;
  badgeText?: string;
}

export interface AdminErrorBoundaryProps {
  onRetry: () => void;
  message?: string;
}

export interface AnalyticsChartsProps {
  dailyGenerations?: Record<string, number>;
  providerUsage?: Record<string, number>;
  averageGenerationMs?: number;
}

export interface DataTableFeedProps {
  generations?: PaginatedGenerationResponse;
  users?: PaginatedUserResponse;
  bans?: PaginatedBanResponse;
  generationsPage: number;
  setGenerationsPage: (p: number) => void;
  usersPage: number;
  setUsersPage: (p: number) => void;
  bansPage: number;
  setBansPage: (p: number) => void;
  isLoadingGenerations?: boolean;
  isLoadingUsers?: boolean;
  isLoadingBans?: boolean;
}

export type TabType = "generations" | "users" | "bans";

export interface SystemGaugesProps {
  stats?: AdminStats;
  analytics?: AdminAnalytics;
}
