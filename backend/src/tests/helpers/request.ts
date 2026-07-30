import type {
  HttpMethod,
  RequestOptions,
  RequestResult,
} from "../types/test.types.js";

interface FetchOptions extends RequestOptions {
  body?: unknown;
}

async function request<T = unknown>(
  method: HttpMethod,
  path: string,
  baseUrl: string,
  options: FetchOptions = {},
): Promise<RequestResult<T>> {
  const headers: Record<string, string> = {
    ...options.headers,
  };

  if (options.token) {
    headers["Authorization"] = `Bearer ${options.token}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (options.body !== undefined && method !== "GET") {
    headers["Content-Type"] = "application/json";
    fetchOptions.body = JSON.stringify(options.body);
  }

  const response = await fetch(`${baseUrl}${path}`, fetchOptions);
  const body = (await response.json()) as T;

  return { status: response.status, body };
}

export function createRequestHelpers(baseUrl: string) {
  return {
    get: <T = unknown>(path: string, options?: RequestOptions) =>
      request<T>("GET", path, baseUrl, options),

    post: <T = unknown>(path: string, data: unknown, options?: RequestOptions) =>
      request<T>("POST", path, baseUrl, { ...options, body: data }),

    put: <T = unknown>(path: string, data: unknown, options?: RequestOptions) =>
      request<T>("PUT", path, baseUrl, { ...options, body: data }),

    patch: <T = unknown>(path: string, data: unknown, options?: RequestOptions) =>
      request<T>("PATCH", path, baseUrl, { ...options, body: data }),

    delete: <T = unknown>(path: string, options?: RequestOptions) =>
      request<T>("DELETE", path, baseUrl, options),
  };
}

export type RequestHelpers = ReturnType<typeof createRequestHelpers>;
