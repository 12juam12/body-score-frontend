"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { apiFetch, BackendError } from "@/lib/api";

export type CreatePatientReportFormState = {
  error?: string;
};

function parseRequiredNumber(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string" || value === "") {
    return null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function createPatientReport(
  patientId: number,
  _prevState: CreatePatientReportFormState,
  formData: FormData,
): Promise<CreatePatientReportFormState> {
  const heightCm = parseRequiredNumber(formData.get("heightCm"));
  const weightKg = parseRequiredNumber(formData.get("weightKg"));
  const bodyFatPercentage = parseRequiredNumber(formData.get("bodyFatPercentage"));
  const visceralFatPercentage = parseRequiredNumber(formData.get("visceralFatPercentage"));
  const muscleMassPercentage = parseRequiredNumber(formData.get("muscleMassPercentage"));
  const basalMetabolicRateKcal = parseRequiredNumber(formData.get("basalMetabolicRateKcal"));
  const age = parseRequiredNumber(formData.get("age"));
  const sex = formData.get("sex");
  const waistHipRatio = parseRequiredNumber(formData.get("waistHipRatio"));
  const physicalActivityLevel = formData.get("physicalActivityLevel");
  const boneMassPercentage = parseRequiredNumber(formData.get("boneMassPercentage"));

  if (
    heightCm === null ||
    weightKg === null ||
    bodyFatPercentage === null ||
    visceralFatPercentage === null ||
    muscleMassPercentage === null ||
    basalMetabolicRateKcal === null ||
    age === null ||
    typeof sex !== "string" ||
    !sex ||
    waistHipRatio === null
  ) {
    return { error: "Completá todos los campos obligatorios" };
  }

  try {
    const response = await apiFetch(`/api/professionals/me/patients/${patientId}/reports`, {
      method: "POST",
      body: JSON.stringify({
        heightCm,
        weightKg,
        bodyFatPercentage,
        visceralFatPercentage,
        muscleMassPercentage,
        basalMetabolicRateKcal,
        age,
        sex,
        waistHipRatio,
        physicalActivityLevel:
          typeof physicalActivityLevel === "string" && physicalActivityLevel ? physicalActivityLevel : undefined,
        boneMassPercentage: boneMassPercentage ?? undefined,
      }),
    });
    if (!response.ok) {
      const body = await response.json().catch(() => null);
      return { error: body?.message ?? "No se pudo crear el informe" };
    }
  } catch (error) {
    if (error instanceof BackendError) {
      return { error: error.message };
    }
    return { error: "No se pudo conectar con el servidor" };
  }

  revalidatePath(`/professional/patients/${patientId}`);
  redirect(`/professional/patients/${patientId}`);
}
