"use client";

import { useActionState } from "react";
import {
  lookupPatientForResubmit,
  resubmitPatient,
  type LookupPatientFormState,
  type ResubmitPatientFormState,
} from "./actions";

const lookupInitialState: LookupPatientFormState = {};
const resubmitInitialState: ResubmitPatientFormState = {};

type ResubmitPatientFormProps = {
  professionalId: number;
  professionalNickname: string;
};

export function ResubmitPatientForm({ professionalId, professionalNickname }: ResubmitPatientFormProps) {
  const [lookupState, lookupAction, isLookupPending] = useActionState(lookupPatientForResubmit, lookupInitialState);
  const [resubmitState, resubmitAction, isResubmitPending] = useActionState(resubmitPatient, resubmitInitialState);

  if (resubmitState.success) {
    return (
      <p className="max-w-md text-center text-sm text-zinc-600 dark:text-zinc-400">
        Tu solicitud fue reenviada. Te avisamos por email cuando la revisen.
      </p>
    );
  }

  if (!lookupState.data) {
    return (
      <form action={lookupAction} className="flex flex-col gap-4 w-full max-w-sm">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Identificate con tu email y contraseña para revisar y actualizar tus datos.
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
            autoComplete="current-password"
            className="border rounded px-3 py-2"
          />
        </div>
        {lookupState.error ? <p className="text-sm text-red-600">{lookupState.error}</p> : null}
        <button type="submit" disabled={isLookupPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
          {isLookupPending ? "Buscando..." : "Continuar"}
        </button>
      </form>
    );
  }

  const data = lookupState.data;

  return (
    <form action={resubmitAction} className="flex flex-col gap-4 w-full max-w-sm">
      <input type="hidden" name="email" value={data.email} />
      <input type="hidden" name="password" value={data.password} />
      <input type="hidden" name="selectedProfessionalId" value={professionalId} />
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Vas a quedar vinculado con <span className="font-medium">@{professionalNickname}</span>
      </p>
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="firstName" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            defaultValue={data.firstName}
            className="border rounded px-3 py-2"
          />
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="lastName" className="text-sm font-medium">
            Apellido
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            required
            defaultValue={data.lastName}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="nationalId" className="text-sm font-medium">
          DNI
        </label>
        <input
          id="nationalId"
          name="nationalId"
          type="text"
          required
          defaultValue={data.nationalId}
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="healthInsurance" className="text-sm font-medium">
          Obra social (opcional)
        </label>
        <input
          id="healthInsurance"
          name="healthInsurance"
          type="text"
          defaultValue={data.healthInsurance}
          className="border rounded px-3 py-2"
        />
      </div>
      {resubmitState.error ? <p className="text-sm text-red-600">{resubmitState.error}</p> : null}
      <button type="submit" disabled={isResubmitPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isResubmitPending ? "Enviando..." : "Reenviar solicitud"}
      </button>
    </form>
  );
}
