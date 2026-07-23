"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/nextjs";
import {
  fetchAdminStats,
  fetchAdminAnalytics,
  fetchAdminUsers,
  fetchAdminGenerations,
  fetchAdminBans,
} from "../service/admin.service";

export function useAdminDashboard() {
  const { getToken } = useAuth();

  // Pagination states
  const [usersPage, setUsersPage] = useState<number>(1);
  const [generationsPage, setGenerationsPage] = useState<number>(1);
  const [bansPage, setBansPage] = useState<number>(1);

  // Auto-refresh interval (in ms): 0 = disabled, 15000 = 15s, 30000 = 30s, 60000 = 60s
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number>(60000);

  const statsQuery = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const token = await getToken();
      return fetchAdminStats(token);
    },
    refetchInterval: autoRefreshInterval > 0 ? autoRefreshInterval : false,
    staleTime: 10000,
  });

  const analyticsQuery = useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: async () => {
      const token = await getToken();
      return fetchAdminAnalytics(token);
    },
    refetchInterval: autoRefreshInterval > 0 ? autoRefreshInterval : false,
    staleTime: 10000,
  });

  const usersQuery = useQuery({
    queryKey: ["admin", "users", usersPage],
    queryFn: async () => {
      const token = await getToken();
      return fetchAdminUsers(token, usersPage, 8);
    },
    refetchInterval: autoRefreshInterval > 0 ? autoRefreshInterval : false,
    staleTime: 10000,
  });

  const generationsQuery = useQuery({
    queryKey: ["admin", "generations", generationsPage],
    queryFn: async () => {
      const token = await getToken();
      return fetchAdminGenerations(token, generationsPage, 8);
    },
    refetchInterval: autoRefreshInterval > 0 ? autoRefreshInterval : false,
    staleTime: 10000,
  });

  const bansQuery = useQuery({
    queryKey: ["admin", "bans", bansPage],
    queryFn: async () => {
      const token = await getToken();
      return fetchAdminBans(token, bansPage, 8);
    },
    refetchInterval: autoRefreshInterval > 0 ? autoRefreshInterval : false,
    staleTime: 10000,
  });

  const isFetchingAny =
    statsQuery.isFetching ||
    analyticsQuery.isFetching ||
    usersQuery.isFetching ||
    generationsQuery.isFetching ||
    bansQuery.isFetching;

  const isErrorAny =
    statsQuery.isError ||
    analyticsQuery.isError ||
    usersQuery.isError ||
    generationsQuery.isError ||
    bansQuery.isError;

  const refetchAll = useCallback(() => {
    statsQuery.refetch();
    analyticsQuery.refetch();
    usersQuery.refetch();
    generationsQuery.refetch();
    bansQuery.refetch();
  }, [statsQuery, analyticsQuery, usersQuery, generationsQuery, bansQuery]);

  return {
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
  };
}
