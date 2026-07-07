"use server";

import { redirect } from "next/navigation";
import { apiFetch, BackendError } from "@/lib/api";

export type CreatePatientFormState = {
  error?: string;
};

export async function createPatient(
  _prevState: CreatePatientFormState,
  formData: FormData,
): Promise<CreatePatientFormState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const nationalId = formData.get("nationalId");
  const healthInsurance = formData.get("healthInsurance");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof nationalId !== "string" ||
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !nationalId
  ) {
    return { error: "Completá todos los campos obligatorios" };
  }

  let patientId: number;
  try {
    const response = await apiFetch("/api/patients", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        nationalId,
        healthInsurance:
          typeof healthInsurance === "string" && healthInsurance ? healthInsurance : undefined,
      }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { error: body?.message ?? "No se pudo crear el paciente" };
    }
    const body = (await response.json()) as { patientId: number };
    patientId = body.patientId;
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  redirect(`/professional/patients/${patientId}`);
}
