import { FetcherOptions } from "../types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetcher<T>({
  endpoint,
  timeout = 60000,
  retries = 0,
  ...options
}: FetcherOptions): Promise<T> {
  const method = options.method?.toUpperCase() ?? "GET";

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();

    const timer = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timer);

      if (!response.ok) {
        let errorMessage = `Request failed (${response.status})`;

        const contentType = response.headers.get("content-type");

        try {
          if (contentType?.includes("application/json")) {
            const error = await response.json();

            errorMessage =
              error.detail ?? error.message ?? error.error ?? errorMessage;
          } else {
            const text = await response.text();

            if (text) {
              errorMessage = text;
            }
          }
        } catch {
          // Ignore parsing errors and use the default message
        }

        // Retry only GET requests with server errors (5xx)
        const shouldRetry =
          method === "GET" && response.status >= 500 && attempt < retries;

        if (shouldRetry) {
          await sleep(1000 * Math.pow(2, attempt));
          continue;
        }

        throw new Error(errorMessage);
      }

      // Handle 204 No Content
      if (response.status === 204) {
        return undefined as T;
      }

      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        return (await response.json()) as T;
      }

      return (await response.text()) as T;
    } catch (error) {
      clearTimeout(timer);

      // Timeout
      if (error instanceof DOMException && error.name === "AbortError") {
        throw new Error("Request timed out.");
      }

      // Retry only GET requests for genuine network failures
      const shouldRetry =
        method === "GET" && attempt < retries && error instanceof TypeError;

      if (shouldRetry) {
        await sleep(1000 * Math.pow(2, attempt));
        continue;
      }

      throw error instanceof Error
        ? error
        : new Error("Unknown error occurred.");
    }
  }

  throw new Error("Unexpected request failure.");
}
