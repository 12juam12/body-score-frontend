"use server";

import { backendFetchMultipart, backendJson, BackendError } from "@/lib/backend";

export type RegisterProfessionalFormState = {
  error?: string;
  success?: boolean;
  warning?: string;
};

export async function registerProfessional(
  _prevState: RegisterProfessionalFormState,
  formData: FormData,
): Promise<RegisterProfessionalFormState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const nickname = formData.get("nickname");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const nationalId = formData.get("nationalId");
  const description = formData.get("description");
  const documentType = formData.get("documentType");
  const documentFile = formData.get("documentFile");

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
    await backendJson("/api/professionals/register", {
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

  if (documentFile instanceof File && documentFile.size > 0) {
    const documentFormData = new FormData();
    documentFormData.append("email", email);
    documentFormData.append("password", password);
    documentFormData.append("type", typeof documentType === "string" && documentType ? documentType : "OTHER");
    documentFormData.append("file", documentFile, documentFile.name);

    try {
      const response = await backendFetchMultipart("/api/professionals/documents", {
        method: "POST",
        body: documentFormData,
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        return {
          success: true,
          warning: `Tu cuenta se creó, pero no se pudo subir el documento (${body?.message ?? "error desconocido"}). Podés subirlo más adelante desde tu perfil una vez aprobado.`,
        };
      }
    } catch {
      return {
        success: true,
        warning: "Tu cuenta se creó, pero no se pudo subir el documento por un problema de conexión. Podés subirlo más adelante desde tu perfil una vez aprobado.",
      };
    }
  }

  return { success: true };
}
