"use client";

import { useActionState, useState } from "react";
import { createPageItem, type FormState } from "./actions";

const initialState: FormState = {};

export function CreatePageItemForm() {
  const [state, formAction, isPending] = useActionState(createPageItem, initialState);
  const [type, setType] = useState<"LINK" | "CARD">("LINK");

  return (
    <form action={formAction} className="flex flex-col gap-3 border rounded p-4 max-w-md">
      <h2 className="font-medium">Agregar link o card</h2>
      <div className="flex gap-4 text-sm">
        <label className="flex items-center gap-1">
          <input type="radio" name="type" value="LINK" checked={type === "LINK"} onChange={() => setType("LINK")} />
          Link
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="type" value="CARD" checked={type === "CARD"} onChange={() => setType("CARD")} />
          Card
        </label>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Título</label>
        <input name="title" required className="border rounded px-2 py-1" />
      </div>
      {type === "LINK" ? (
        <div className="flex flex-col gap-1">
          <label className="text-sm">URL</label>
          <input name="url" type="url" required className="border rounded px-2 py-1" />
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <label className="text-sm">Descripción</label>
          <textarea name="description" required rows={2} className="border rounded px-2 py-1" />
        </div>
      )}
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" disabled={isPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isPending ? "Agregando..." : "Agregar"}
      </button>
    </form>
  );
}
