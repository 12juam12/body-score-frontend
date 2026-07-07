"use client";

import { useActionState } from "react";
import { editOwnProfile, type FormState } from "./actions";
import type { PublicProfessionalProfile } from "@/lib/types";

const initialState: FormState = {};

export function EditProfileForm({ profile }: { profile: PublicProfessionalProfile }) {
  const [state, formAction, isPending] = useActionState(editOwnProfile, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3 border rounded p-4 max-w-md">
      <h2 className="font-medium">Descripción</h2>
      <div className="flex flex-col gap-1">
        <label className="text-sm">Descripción</label>
        <textarea name="description" defaultValue={profile.description ?? ""} rows={3} className="border rounded px-2 py-1" />
      </div>
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" disabled={isPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isPending ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}
