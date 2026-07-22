"use client";

import { useActionState } from "react";
import { PROFESSIONAL_DOCUMENT_TYPES } from "@/lib/types";
import {
  lookupProfessionalForResubmit,
  resubmitProfessional,
  type LookupProfessionalFormState,
  type ResubmitProfessionalFormState,
} from "./actions";

const lookupInitialState: LookupProfessionalFormState = {};
const resubmitInitialState: ResubmitProfessionalFormState = {};

export function ResubmitProfessionalForm() {
  const [lookupState, lookupAction, isLookupPending] = useActionState(
    lookupProfessionalForResubmit,
    lookupInitialState,
  );
  const [resubmitState, resubmitAction, isResubmitPending] = useActionState(
    resubmitProfessional,
    resubmitInitialState,
  );

  if (resubmitState.success) {
    return (
      <div className="max-w-md text-center text-sm">
        <p className="text-zinc-600 dark:text-zinc-400">
          Tu solicitud fue reenviada. Te vamos a avisar por email cuando el superadmin la revise.
        </p>
        {resubmitState.warning ? <p className="mt-2 text-amber-600">{resubmitState.warning}</p> : null}
      </div>
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
      <div className="flex flex-col gap-1">
        <label htmlFor="nickname" className="text-sm font-medium">
          Nickname
        </label>
        <input
          id="nickname"
          name="nickname"
          type="text"
          required
          pattern="[a-z0-9-]{3,50}"
          defaultValue={data.nickname}
          className="border rounded px-3 py-2"
        />
      </div>
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
        <label htmlFor="description" className="text-sm font-medium">
          Descripción (opcional)
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={data.description}
          className="border rounded px-3 py-2"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="documentType" className="text-sm font-medium">
          Documento que te pidieron (opcional)
        </label>
        <select id="documentType" name="documentType" defaultValue="OTHER" className="border rounded px-3 py-2">
          {PROFESSIONAL_DOCUMENT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <input id="documentFile" name="documentFile" type="file" className="border rounded px-3 py-2" />
      </div>
      {resubmitState.error ? <p className="text-sm text-red-600">{resubmitState.error}</p> : null}
      <button type="submit" disabled={isResubmitPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isResubmitPending ? "Enviando..." : "Reenviar solicitud"}
      </button>
    </form>
  );
}
