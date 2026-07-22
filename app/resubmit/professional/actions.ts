"use server";

import { backendFetchMultipart, backendJson, BackendError } from "@/lib/backend";

export type ResubmitProfessionalFormState = {
  error?: string;
  success?: boolean;
  warning?: string;
};

export type LookupProfessionalFormState = {
  error?: string;
  data?: {
    email: string;
    password: string;
    nickname: string;
    firstName: string;
    lastName: string;
    nationalId: string;
    description: string;
  };
};

export async function lookupProfessionalForResubmit(
  _prevState: LookupProfessionalFormState,
  formData: FormData,
): Promise<LookupProfessionalFormState> {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return { error: "Ingresá tu email y contraseña" };
  }

  try {
    const details = await backendJson<{
      nickname: string;
      firstName: string;
      lastName: string;
      nationalId: string;
      description: string | null;
    }>("/api/professionals/resubmit/lookup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    return {
      data: {
        email,
        password,
        nickname: details.nickname,
        firstName: details.firstName,
        lastName: details.lastName,
        nationalId: details.nationalId,
        description: details.description ?? "",
      },
    };
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }
}

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
          warning: `Tu solicitud se reenvió, pero no se pudo subir el documento (${body?.message ?? "error desconocido"}). Volvé a intentar reenviando la solicitud.`,
        };
      }
    } catch {
      return {
        success: true,
        warning: "Tu solicitud se reenvió, pero no se pudo subir el documento por un problema de conexión. Volvé a intentar reenviando la solicitud.",
      };
    }
  }

  return { success: true };
}
