"use client";

import { useActionState, useState } from "react";
import { editPageItem, deletePageItem, moveItem, type FormState } from "./actions";
import type { ProfessionalPageItem } from "@/lib/types";

const initialState: FormState = {};

export function PageItemRow({
  item,
  isFirst,
  isLast,
}: {
  item: ProfessionalPageItem;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction, isPending] = useActionState(editPageItem, initialState);

  if (isEditing) {
    return (
      <form action={formAction} className="flex flex-col gap-2 border rounded p-3">
        <input type="hidden" name="itemId" value={item.id} />
        <input name="title" defaultValue={item.title} required className="border rounded px-2 py-1 text-sm" />
        {item.type === "LINK" ? (
          <input name="url" type="url" defaultValue={item.url ?? ""} required className="border rounded px-2 py-1 text-sm" />
        ) : (
          <textarea
            name="description"
            defaultValue={item.description ?? ""}
            required
            rows={2}
            className="border rounded px-2 py-1 text-sm"
          />
        )}
        {state.error ? <p className="text-xs text-red-600">{state.error}</p> : null}
        <div className="flex gap-2">
          <button type="submit" disabled={isPending} className="rounded bg-black text-white px-3 py-1 text-sm disabled:opacity-50">
            {isPending ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" onClick={() => setIsEditing(false)} className="text-sm underline">
            Cancelar
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-center justify-between gap-2 border rounded p-3">
      <div>
        <p className="text-sm font-medium">
          [{item.type}] {item.title}
        </p>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">{item.url ?? item.description}</p>
      </div>
      <div className="flex items-center gap-2">
        <form action={moveItem}>
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="direction" value="up" />
          <button type="submit" disabled={isFirst} className="text-sm underline disabled:opacity-30">
            ↑
          </button>
        </form>
        <form action={moveItem}>
          <input type="hidden" name="itemId" value={item.id} />
          <input type="hidden" name="direction" value="down" />
          <button type="submit" disabled={isLast} className="text-sm underline disabled:opacity-30">
            ↓
          </button>
        </form>
        <button type="button" onClick={() => setIsEditing(true)} className="text-sm underline">
          Editar
        </button>
        <form action={deletePageItem}>
          <input type="hidden" name="itemId" value={item.id} />
          <button type="submit" className="text-sm underline text-red-600">
            Borrar
          </button>
        </form>
      </div>
    </div>
  );
}
