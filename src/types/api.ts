export interface FetcherOptions extends RequestInit {
  endpoint: string;
  timeout?: number;
  retries?: number;
}

export interface AdminStats {
  total_users: number;
  active_today: number;
  total_generations: number;
  generated_today: number;
  temporary_bans: number;
  permanent_bans: number;
}

export interface AdminUser {
  id: string;
  ip: string;
  email: string | null;
  requests_today: number;
  total_requests: number;
  last_seen: string;
  created_at: string;
}

export interface PaginatedUserResponse {
  items: AdminUser[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface AdminGeneration {
  id: string;
  anonymous_user_id: string;
  email: string | null;
  filename: string;
  provider: string;
  model: string;
  generation_time_ms: number;
  ats_score: number;
  parse_score: number;
  status: string;
  created_at: string;
}

export interface PaginatedGenerationResponse {
  items: AdminGeneration[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface AdminBan {
  id: string;
  ip: string;
  fingerprint: string;
  reason: string;
  ban_type: string;
  expires_at: string | null;
  created_at: string;
}

export interface PaginatedBanResponse {
  items: AdminBan[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export interface AdminAnalytics {
  daily_generations: Record<string, number>;
  provider_usage: Record<string, number>;
  average_generation_ms: number;
}

export interface ApiResponseWrapper<T> {
  success: boolean;
  message: string;
  data: T;
}
