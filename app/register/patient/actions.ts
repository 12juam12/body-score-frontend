"use server";

import { backendJson, BackendError } from "@/lib/backend";

export type RegisterPatientFormState = {
  error?: string;
  success?: boolean;
};

export async function registerPatient(
  _prevState: RegisterPatientFormState,
  formData: FormData,
): Promise<RegisterPatientFormState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const nationalId = formData.get("nationalId");
  const healthInsurance = formData.get("healthInsurance");
  const selectedProfessionalId = formData.get("selectedProfessionalId");

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof firstName !== "string" ||
    typeof lastName !== "string" ||
    typeof nationalId !== "string" ||
    typeof selectedProfessionalId !== "string" ||
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !nationalId ||
    !selectedProfessionalId
  ) {
    return { error: "Completá todos los campos obligatorios" };
  }

  try {
    await backendJson("/api/patients/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        nationalId,
        selectedProfessionalId: Number(selectedProfessionalId),
        healthInsurance:
          typeof healthInsurance === "string" && healthInsurance ? healthInsurance : undefined,
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
