"use client";

import { useActionState } from "react";
import { PATIENT_SEXES, PHYSICAL_ACTIVITY_LEVELS } from "@/lib/types";
import { createPatientReport, type CreatePatientReportFormState } from "./actions";

const initialState: CreatePatientReportFormState = {};

const SEX_LABELS: Record<(typeof PATIENT_SEXES)[number], string> = {
  MALE: "Masculino",
  FEMALE: "Femenino",
};

const ACTIVITY_LABELS: Record<(typeof PHYSICAL_ACTIVITY_LEVELS)[number], string> = {
  SEDENTARY: "Sedentario",
  ACTIVE: "Activo",
  VERY_ACTIVE: "Muy activo",
};

type CreatePatientReportFormProps = {
  patientId: number;
};

export function CreatePatientReportForm({ patientId }: CreatePatientReportFormProps) {
  const action = createPatientReport.bind(null, patientId);
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-md">
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="heightCm" className="text-sm font-medium">
            Talla (cm)
          </label>
          <input id="heightCm" name="heightCm" type="number" step="0.1" required className="border rounded px-3 py-2" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="weightKg" className="text-sm font-medium">
            Peso (kg)
          </label>
          <input id="weightKg" name="weightKg" type="number" step="0.1" required className="border rounded px-3 py-2" />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="age" className="text-sm font-medium">
            Edad
          </label>
          <input id="age" name="age" type="number" step="1" required className="border rounded px-3 py-2" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="sex" className="text-sm font-medium">
            Sexo
          </label>
          <select id="sex" name="sex" required defaultValue="" className="border rounded px-3 py-2">
            <option value="" disabled>
              Elegí una opción
            </option>
            {PATIENT_SEXES.map((sex) => (
              <option key={sex} value={sex}>
                {SEX_LABELS[sex]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="bodyFatPercentage" className="text-sm font-medium">
            % Grasa corporal
          </label>
          <input
            id="bodyFatPercentage"
            name="bodyFatPercentage"
            type="number"
            step="0.1"
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="visceralFatPercentage" className="text-sm font-medium">
            % Grasa visceral
          </label>
          <input
            id="visceralFatPercentage"
            name="visceralFatPercentage"
            type="number"
            step="0.1"
            required
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="muscleMassPercentage" className="text-sm font-medium">
            % Masa muscular
          </label>
          <input
            id="muscleMassPercentage"
            name="muscleMassPercentage"
            type="number"
            step="0.1"
            required
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="basalMetabolicRateKcal" className="text-sm font-medium">
            Metab. basal (kcal)
          </label>
          <input
            id="basalMetabolicRateKcal"
            name="basalMetabolicRateKcal"
            type="number"
            step="1"
            required
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="waistCm" className="text-sm font-medium">
            Circunferencia de cintura (cm)
          </label>
          <input id="waistCm" name="waistCm" type="number" step="0.1" required className="border rounded px-3 py-2" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="hipCm" className="text-sm font-medium">
            Circunferencia de cadera (cm)
          </label>
          <input id="hipCm" name="hipCm" type="number" step="0.1" required className="border rounded px-3 py-2" />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="physicalActivityLevel" className="text-sm font-medium">
            Actividad física (opcional)
          </label>
          <select
            id="physicalActivityLevel"
            name="physicalActivityLevel"
            defaultValue=""
            className="border rounded px-3 py-2"
          >
            <option value="">Sin especificar</option>
            {PHYSICAL_ACTIVITY_LEVELS.map((level) => (
              <option key={level} value={level}>
                {ACTIVITY_LABELS[level]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="boneMassPercentage" className="text-sm font-medium">
            % Masa ósea (opcional)
          </label>
          <input
            id="boneMassPercentage"
            name="boneMassPercentage"
            type="number"
            step="0.1"
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" disabled={isPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isPending ? "Guardando..." : "Crear informe"}
      </button>
    </form>
  );
}
