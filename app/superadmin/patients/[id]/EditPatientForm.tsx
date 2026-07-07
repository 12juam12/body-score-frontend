"use client";

import { useActionState } from "react";
import { editPatient, type EditFormState } from "./actions";
import type { PatientDetail } from "@/lib/types";

const initialState: EditFormState = {};

export function EditPatientForm({ patient }: { patient: PatientDetail }) {
  const [state, formAction, isPending] = useActionState(editPatient, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3 border rounded p-4">
      <input type="hidden" name="patientId" value={patient.patientId} />
      <h2 className="font-medium">Editar datos</h2>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm">Nombre</label>
          <input name="firstName" defaultValue={patient.firstName} required className="border rounded px-2 py-1" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm">Apellido</label>
          <input name="lastName" defaultValue={patient.lastName} required className="border rounded px-2 py-1" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">DNI</label>
        <input name="nationalId" defaultValue={patient.nationalId} required className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Obra social</label>
        <input name="healthInsurance" defaultValue={patient.healthInsurance ?? ""} className="border rounded px-2 py-1" />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" disabled={isPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isPending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
