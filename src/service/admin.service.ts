import { fetcher } from "../lib/fetcher";
import {
  AdminStats,
  AdminAnalytics,
  PaginatedUserResponse,
  PaginatedGenerationResponse,
  PaginatedBanResponse,
  ApiResponseWrapper,
} from "../types/api";

export async function fetchAdminStats(): Promise<AdminStats> {
  const response = await fetcher<ApiResponseWrapper<AdminStats>>({
    endpoint: "/api/v1/admin/stats",
    retries: 1,
  });
  return response.data;
}

export async function fetchAdminAnalytics(): Promise<AdminAnalytics> {
  const response = await fetcher<ApiResponseWrapper<AdminAnalytics>>({
    endpoint: "/api/v1/admin/analytics",
    retries: 1,
  });
  return response.data;
}

export async function fetchAdminUsers(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedUserResponse> {
  const response = await fetcher<ApiResponseWrapper<PaginatedUserResponse>>({
    endpoint: `/api/v1/admin/users?page=${page}&page_size=${pageSize}`,
    retries: 1,
  });
  return response.data;
}

export async function fetchAdminGenerations(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedGenerationResponse> {
  const response = await fetcher<
    ApiResponseWrapper<PaginatedGenerationResponse>
  >({
    endpoint: `/api/v1/admin/generations?page=${page}&page_size=${pageSize}`,
    retries: 1,
  });
  return response.data;
}

export async function fetchAdminBans(
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedBanResponse> {
  const response = await fetcher<ApiResponseWrapper<PaginatedBanResponse>>({
    endpoint: `/api/v1/admin/bans?page=${page}&page_size=${pageSize}`,
    retries: 1,
  });
  return response.data;
}
