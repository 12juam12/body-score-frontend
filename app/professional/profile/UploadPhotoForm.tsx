"use client";

import { useActionState, useRef } from "react";
import { uploadPhoto, type FormState } from "./actions";
import type { PublicProfessionalProfile } from "@/lib/types";

const initialState: FormState = {};

export function UploadPhotoForm({ profile }: { profile: PublicProfessionalProfile }) {
  const [state, formAction, isPending] = useActionState(uploadPhoto, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="flex flex-col gap-3 border rounded p-4 max-w-md">
      <h2 className="font-medium">Foto</h2>
      {profile.photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={profile.photoUrl} alt="Foto de perfil" className="h-24 w-24 rounded-full object-cover" />
      ) : (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Todavía no subiste una foto.</p>
      )}
      <form
        ref={formRef}
        action={async (formData) => {
          await formAction(formData);
          formRef.current?.reset();
        }}
        className="flex flex-col gap-2"
      >
        <input name="file" type="file" accept="image/*" required className="border rounded px-2 py-1" />
        {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
        <button type="submit" disabled={isPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
          {isPending ? "Subiendo..." : "Subir foto"}
        </button>
      </form>
    </div>
  );
}
