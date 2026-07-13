export interface FetcherOptions extends RequestInit {
  endpoint: string;
  timeout?: number;
  retries?: number;
}
