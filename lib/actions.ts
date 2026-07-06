"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { backendFetch } from "./backend";
import { clearSessionCookies, REFRESH_TOKEN_COOKIE } from "./session";

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;

  if (refreshToken) {
    await backendFetch("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }).catch(() => null);
  }

  await clearSessionCookies();
  redirect("/login");
}
