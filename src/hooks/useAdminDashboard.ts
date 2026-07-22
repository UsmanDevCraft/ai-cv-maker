"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAdminStats,
  fetchAdminAnalytics,
  fetchAdminUsers,
  fetchAdminGenerations,
  fetchAdminBans,
} from "../service/admin.service";

export function useAdminDashboard() {
  // Pagination states
  const [usersPage, setUsersPage] = useState<number>(1);
  const [generationsPage, setGenerationsPage] = useState<number>(1);
  const [bansPage, setBansPage] = useState<number>(1);

  // Auto-refresh interval (in ms): 0 = disabled, 15000 = 15s, 30000 = 30s, 60000 = 60s
  const [autoRefreshInterval, setAutoRefreshInterval] = useState<number>(60000);

  const statsQuery = useQuery({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      return fetchAdminStats();
    },
    refetchInterval: autoRefreshInterval > 0 ? autoRefreshInterval : false,
    staleTime: 10000,
  });

  const analyticsQuery = useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: async () => {
      return fetchAdminAnalytics();
    },
    refetchInterval: autoRefreshInterval > 0 ? autoRefreshInterval : false,
    staleTime: 10000,
  });

  const usersQuery = useQuery({
    queryKey: ["admin", "users", usersPage],
    queryFn: async () => {
      return fetchAdminUsers(usersPage, 8);
    },
    refetchInterval: autoRefreshInterval > 0 ? autoRefreshInterval : false,
    staleTime: 10000,
  });

  const generationsQuery = useQuery({
    queryKey: ["admin", "generations", generationsPage],
    queryFn: async () => {
      return fetchAdminGenerations(generationsPage, 8);
    },
    refetchInterval: autoRefreshInterval > 0 ? autoRefreshInterval : false,
    staleTime: 10000,
  });

  const bansQuery = useQuery({
    queryKey: ["admin", "bans", bansPage],
    queryFn: async () => {
      return fetchAdminBans(bansPage, 8);
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
