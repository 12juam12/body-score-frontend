"use client";

import { useActionState } from "react";
import { editProfessional, type EditFormState } from "./actions";
import type { ProfessionalDetail } from "@/lib/types";

const initialState: EditFormState = {};

export function EditProfessionalForm({ professional }: { professional: ProfessionalDetail }) {
  const [state, formAction, isPending] = useActionState(editProfessional, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3 border rounded p-4">
      <input type="hidden" name="professionalId" value={professional.professionalId} />
      <h2 className="font-medium">Editar datos</h2>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Nickname</label>
        <input
          name="nickname"
          defaultValue={professional.nickname}
          required
          pattern="[a-z0-9-]{3,50}"
          className="border rounded px-2 py-1"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm">Nombre</label>
          <input name="firstName" defaultValue={professional.firstName} required className="border rounded px-2 py-1" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-sm">Apellido</label>
          <input name="lastName" defaultValue={professional.lastName} required className="border rounded px-2 py-1" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">DNI</label>
        <input name="nationalId" defaultValue={professional.nationalId} required className="border rounded px-2 py-1" />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Descripción</label>
        <textarea name="description" defaultValue={professional.description ?? ""} rows={2} className="border rounded px-2 py-1" />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" disabled={isPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isPending ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
}
