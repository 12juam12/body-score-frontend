import { cookies } from "next/headers";
import { backendFetch } from "./backend";
import { decodeAccessToken, type AccessTokenPayload } from "./jwt";

export const ACCESS_TOKEN_COOKIE = "bodyscore_access_token";
export const REFRESH_TOKEN_COOKIE = "bodyscore_refresh_token";

export type SessionClaims = AccessTokenPayload;

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresInMinutes: number;
};

export async function setSessionCookies(login: LoginResponse): Promise<void> {
  const cookieStore = await cookies();
  const accessTokenMaxAge = login.accessTokenExpiresInMinutes * 60;
  const refreshTokenMaxAge = 60 * 60 * 24 * 30;

  cookieStore.set(ACCESS_TOKEN_COOKIE, login.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: accessTokenMaxAge,
  });
  cookieStore.set(REFRESH_TOKEN_COOKIE, login.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: refreshTokenMaxAge,
  });
}

export async function clearSessionCookies(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

async function refreshSession(): Promise<SessionClaims | null> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refreshToken) {
    return null;
  }

  const response = await backendFetch("/api/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    await clearSessionCookies();
    return null;
  }

  const body = (await response.json()) as { accessToken: string; accessTokenExpiresInMinutes: number };
  cookieStore.set(ACCESS_TOKEN_COOKIE, body.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: body.accessTokenExpiresInMinutes * 60,
  });

  return decodeAccessToken(body.accessToken);
}

const EXPIRY_SKEW_SECONDS = 30;

export async function getSession(): Promise<SessionClaims | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  if (accessToken) {
    const claims = decodeAccessToken(accessToken);
    const nowInSeconds = Date.now() / 1000;
    if (claims && claims.expiresAt - EXPIRY_SKEW_SECONDS > nowInSeconds) {
      return claims;
    }
  }

  return refreshSession();
}

export async function getAccessToken(): Promise<string | null> {
  await getSession();
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
}
