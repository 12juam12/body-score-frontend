const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://localhost:8080";

export class BackendError extends Error {
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function backendFetch(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`${BACKEND_API_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

export async function backendJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await backendFetch(path, init);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new BackendError(response.status, body?.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}
