"use server";

import { revalidatePath } from "next/cache";
import { apiFetchMultipart, BackendError } from "@/lib/api";

export type UploadDocumentFormState = {
  error?: string;
};

export async function uploadDocument(
  _prevState: UploadDocumentFormState,
  formData: FormData,
): Promise<UploadDocumentFormState> {
  const type = formData.get("type");
  const file = formData.get("file");

  if (typeof type !== "string" || !type || !(file instanceof File) || file.size === 0) {
    return { error: "Elegí un tipo de documento y un archivo" };
  }

  const backendFormData = new FormData();
  backendFormData.append("type", type);
  backendFormData.append("file", file, file.name);

  try {
    const response = await apiFetchMultipart("/api/professionals/me/documents", backendFormData);
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { error: body?.message ?? "No se pudo subir el documento" };
    }
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  revalidatePath("/professional/documents");
  return {};
}
