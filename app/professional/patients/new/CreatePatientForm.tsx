"use client";

import { useActionState } from "react";
import { createPatient, type CreatePatientFormState } from "./actions";

const initialState: CreatePatientFormState = {};

export function CreatePatientForm() {
  const [state, formAction, isPending] = useActionState(createPatient, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Email</label>
        <input name="email" type="email" required className="border rounded px-3 py-2" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Contraseña</label>
        <input name="password" type="password" required className="border rounded px-3 py-2" />
        <p className="text-xs text-zinc-500">
          Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.
        </p>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm font-medium">Nombre</label>
          <input name="firstName" required className="border rounded px-3 py-2" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm font-medium">Apellido</label>
          <input name="lastName" required className="border rounded px-3 py-2" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">DNI</label>
        <input name="nationalId" required className="border rounded px-3 py-2" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Obra social (opcional)</label>
        <input name="healthInsurance" className="border rounded px-3 py-2" />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" disabled={isPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isPending ? "Creando..." : "Crear paciente"}
      </button>
    </form>
  );
}
