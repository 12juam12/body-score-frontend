"use client";

import { useActionState } from "react";
import { resubmitProfessional, type ResubmitProfessionalFormState } from "./actions";

const initialState: ResubmitProfessionalFormState = {};

export function ResubmitProfessionalForm() {
  const [state, formAction, isPending] = useActionState(resubmitProfessional, initialState);

  if (state.success) {
    return (
      <p className="max-w-md text-center text-sm text-zinc-600 dark:text-zinc-400">
        Tu solicitud fue reenviada. Te vamos a avisar por email cuando el superadmin la revise.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input id="email" name="email" type="email" required autoComplete="email" className="border rounded px-3 py-2" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="nickname" className="text-sm font-medium">
          Nickname
        </label>
        <input id="nickname" name="nickname" type="text" required pattern="[a-z0-9-]{3,50}" className="border rounded px-3 py-2" />
      </div>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="firstName" className="text-sm font-medium">
            Nombre
          </label>
          <input id="firstName" name="firstName" type="text" required className="border rounded px-3 py-2" />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="lastName" className="text-sm font-medium">
            Apellido
          </label>
          <input id="lastName" name="lastName" type="text" required className="border rounded px-3 py-2" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="nationalId" className="text-sm font-medium">
          DNI
        </label>
        <input id="nationalId" name="nationalId" type="text" required className="border rounded px-3 py-2" />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">
          Descripción (opcional)
        </label>
        <textarea id="description" name="description" rows={3} className="border rounded px-3 py-2" />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" disabled={isPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isPending ? "Enviando..." : "Reenviar solicitud"}
      </button>
    </form>
  );
}
