import { backendFetch, backendFetchMultipart, backendJson, BackendError } from "./backend";
import { getAccessToken } from "./session";

export { BackendError };

async function authHeaders(): Promise<Record<string, string>> {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    throw new BackendError(401, "No active session");
  }
  return { Authorization: `Bearer ${accessToken}` };
}

export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  return backendFetch(path, {
    ...init,
    headers: {
      ...(await authHeaders()),
      ...init?.headers,
    },
  });
}

export async function apiFetchMultipart(path: string, formData: FormData): Promise<Response> {
  return backendFetchMultipart(path, {
    method: "POST",
    body: formData,
    headers: await authHeaders(),
  });
}

export async function apiJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await apiFetch(path, init);

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new BackendError(response.status, body?.message ?? "Request failed");
  }

  return response.json() as Promise<T>;
}

export { backendJson };
