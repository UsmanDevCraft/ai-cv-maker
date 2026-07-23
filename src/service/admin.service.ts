import { fetcher } from "../lib/fetcher";
import {
  AdminStats,
  AdminAnalytics,
  PaginatedUserResponse,
  PaginatedGenerationResponse,
  PaginatedBanResponse,
  ApiResponseWrapper,
} from "../types/api";

function getAuthHeaders(token: string | null): Record<string, string> {
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchAdminStats(
  token: string | null,
): Promise<AdminStats> {
  const response = await fetcher<ApiResponseWrapper<AdminStats>>({
    endpoint: "/api/v1/admin/stats",
    retries: 1,
    headers: getAuthHeaders(token),
  });
  return response.data;
}

export async function fetchAdminAnalytics(
  token: string | null,
): Promise<AdminAnalytics> {
  const response = await fetcher<ApiResponseWrapper<AdminAnalytics>>({
    endpoint: "/api/v1/admin/analytics",
    retries: 1,
    headers: getAuthHeaders(token),
  });
  return response.data;
}

export async function fetchAdminUsers(
  token: string | null,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedUserResponse> {
  const response = await fetcher<ApiResponseWrapper<PaginatedUserResponse>>({
    endpoint: `/api/v1/admin/users?page=${page}&page_size=${pageSize}`,
    retries: 1,
    headers: getAuthHeaders(token),
  });
  return response.data;
}

export async function fetchAdminGenerations(
  token: string | null,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedGenerationResponse> {
  const response = await fetcher<
    ApiResponseWrapper<PaginatedGenerationResponse>
  >({
    endpoint: `/api/v1/admin/generations?page=${page}&page_size=${pageSize}`,
    retries: 1,
    headers: getAuthHeaders(token),
  });
  return response.data;
}

export async function fetchAdminBans(
  token: string | null,
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedBanResponse> {
  const response = await fetcher<ApiResponseWrapper<PaginatedBanResponse>>({
    endpoint: `/api/v1/admin/bans?page=${page}&page_size=${pageSize}`,
    retries: 1,
    headers: getAuthHeaders(token),
  });
  return response.data;
}
