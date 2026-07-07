"use server";

import { revalidatePath } from "next/cache";
import { apiFetch, BackendError } from "@/lib/api";

export type ReviewFormState = {
  error?: string;
};

const VALID_ACTIONS = ["approve", "reject", "request-info"] as const;

export async function reviewPatient(
  _prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  const patientId = formData.get("patientId");
  const actionType = formData.get("actionType");
  const reason = formData.get("reason");

  if (
    typeof patientId !== "string" ||
    typeof actionType !== "string" ||
    !VALID_ACTIONS.includes(actionType as (typeof VALID_ACTIONS)[number])
  ) {
    return { error: "Acción inválida" };
  }

  try {
    const response = await apiFetch(`/api/patients/${patientId}/${actionType}`, {
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

  revalidatePath(`/superadmin/patients/${patientId}`);
  return {};
}

export type EditFormState = {
  error?: string;
};

export async function editPatient(_prevState: EditFormState, formData: FormData): Promise<EditFormState> {
  const patientId = formData.get("patientId");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const nationalId = formData.get("nationalId");
  const healthInsurance = formData.get("healthInsurance");

  if (
    typeof patientId !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof nationalId !== "string"
  ) {
    return { error: "Completá todos los campos obligatorios" };
  }

  try {
    const response = await apiFetch(`/api/patients/${patientId}`, {
      method: "PUT",
      body: JSON.stringify({
        firstName,
        lastName,
        nationalId,
        healthInsurance:
          typeof healthInsurance === "string" && healthInsurance ? healthInsurance : undefined,
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

  revalidatePath(`/superadmin/patients/${patientId}`);
  return {};
}
