"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, BackendError } from "@/lib/api";

export type ReviewFormState = {
  error?: string;
};

const VALID_ACTIONS = ["approve", "reject", "request-info", "suspend", "reactivate"] as const;

export async function reviewProfessional(
  _prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const professionalId = formData.get("professionalId");
  const actionType = formData.get("actionType");
  const reason = formData.get("reason");

  if (
    typeof professionalId !== "string" ||
    typeof actionType !== "string" ||
    !VALID_ACTIONS.includes(actionType as (typeof VALID_ACTIONS)[number])
  ) {
    return { error: "Acción inválida" };
  }

  try {
    const response = await apiFetch(`/api/professionals/${professionalId}/${actionType}`, {
      method: "POST",
      body: JSON.stringify({ reason: typeof reason === "string" && reason ? reason : undefined }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { error: body?.message ?? "La acción no se pudo completar" };
    }
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  revalidatePath(`/superadmin/professionals/${professionalId}`);
  return {};
}

export type EditFormState = {
  error?: string;
};

export async function editProfessional(
  _prevState: EditFormState,
  formData: FormData,
): Promise<EditFormState> {
  const professionalId = formData.get("professionalId");
  const nickname = formData.get("nickname");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const nationalId = formData.get("nationalId");
  const description = formData.get("description");

  if (
    typeof professionalId !== "string" ||
    typeof nickname !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof nationalId !== "string"
  ) {
    return { error: "Completá todos los campos obligatorios" };
  }

  try {
    const response = await apiFetch(`/api/professionals/${professionalId}`, {
      method: "PUT",
      body: JSON.stringify({
        nickname,
        firstName,
        lastName,
        nationalId,
        description: typeof description === "string" && description ? description : undefined,
      }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { error: body?.message ?? "No se pudo editar" };
    }
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  revalidatePath(`/superadmin/professionals/${professionalId}`);
  return {};
}
