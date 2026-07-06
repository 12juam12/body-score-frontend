"use server";

import { redirect } from "next/navigation";
import { backendJson, BackendError } from "@/lib/backend";
import { setSessionCookies } from "@/lib/session";
import { decodeAccessToken, dashboardPathForRole } from "@/lib/jwt";

export type LoginFormState = {
  error?: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresInMinutes: number;
};

export async function login(_prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return { error: "Ingresá tu email y contraseña" };
  }

  let loginResponse: LoginResponse;
  try {
    loginResponse = await backendJson<LoginResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  await setSessionCookies(loginResponse);

  const payload = decodeAccessToken(loginResponse.accessToken);
  redirect(payload ? dashboardPathForRole(payload.role) : "/login");
}
