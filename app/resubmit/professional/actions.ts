"use server";

import { backendJson, BackendError } from "@/lib/backend";

export type ResubmitProfessionalFormState = {
  error?: string;
  success?: boolean;
};

export async function resubmitProfessional(
  _prevState: ResubmitProfessionalFormState,
  formData: FormData,
): Promise<ResubmitProfessionalFormState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const nickname = formData.get("nickname");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const nationalId = formData.get("nationalId");
  const description = formData.get("description");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof nickname !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof nationalId !== "string" ||
    !email ||
    !password ||
    !nickname ||
    !firstName ||
    !lastName ||
    !nationalId
  ) {
    return { error: "Completá todos los campos obligatorios" };
  }

  try {
    await backendJson("/api/professionals/resubmit", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        nickname,
        firstName,
        lastName,
        nationalId,
        description: typeof description === "string" && description ? description : undefined,
      }),
    });
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  return { success: true };
}
