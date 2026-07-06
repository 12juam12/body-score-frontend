"use client";

import { useActionState } from "react";
import { registerPatient, type RegisterPatientFormState } from "./actions";

const initialState: RegisterPatientFormState = {};

type RegisterPatientFormProps = {
  professionalId: number;
  professionalNickname: string;
};

export function RegisterPatientForm({ professionalId, professionalNickname }: RegisterPatientFormProps) {
  const [state, formAction, isPending] = useActionState(registerPatient, initialState);

  if (state.success) {
    return (
      <p className="max-w-md text-center text-sm text-zinc-600 dark:text-zinc-400">
        Tu solicitud fue enviada. @{professionalNickname} (o el superadmin) la va a revisar y te
        avisamos por email.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
      <input type="hidden" name="selectedProfessionalId" value={professionalId} />
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Te vas a registrar con <span className="font-medium">@{professionalNickname}</span>
      </p>
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
          autoComplete="new-password"
          className="border rounded px-3 py-2"
        />
        <p className="text-xs text-zinc-500">
          Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.
        </p>
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
        <label htmlFor="healthInsurance" className="text-sm font-medium">
          Obra social (opcional)
        </label>
        <input id="healthInsurance" name="healthInsurance" type="text" className="border rounded px-3 py-2" />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" disabled={isPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isPending ? "Enviando..." : "Registrarme"}
      </button>
    </form>
  );
}
