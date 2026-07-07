"use client";

import { useActionState, useState } from "react";
import { reviewProfessional, type ReviewFormState } from "./actions";

const initialState: ReviewFormState = {};

type ReviewActionFormProps = {
  professionalId: number;
  actionType: "approve" | "reject" | "request-info" | "suspend" | "reactivate";
  label: string;
  requireReason: boolean;
};

export function ReviewActionForm({ professionalId, actionType, label, requireReason }: ReviewActionFormProps) {
  const [state, formAction, isPending] = useActionState(reviewProfessional, initialState);
  const [showReason, setShowReason] = useState(requireReason);

  return (
    <form action={formAction} className="flex flex-col gap-2 border rounded p-3">
      <input type="hidden" name="professionalId" value={professionalId} />
      <input type="hidden" name="actionType" value={actionType} />
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium">{label}</span>
        {!requireReason ? (
          <button type="button" onClick={() => setShowReason((v) => !v)} className="text-xs underline">
            {showReason ? "ocultar motivo" : "agregar motivo"}
          </button>
        ) : null}
      </div>
      {showReason ? (
        <textarea
          name="reason"
          required={requireReason}
          placeholder="Motivo"
          rows={2}
          className="border rounded px-2 py-1 text-sm"
        />
      ) : null}
      {state.error ? <p className="text-xs text-red-600">{state.error}</p> : null}
      <button type="submit" disabled={isPending} className="rounded bg-black text-white py-1.5 text-sm disabled:opacity-50">
        {isPending ? "Enviando..." : label}
      </button>
    </form>
  );
}
