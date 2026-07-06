"use client";

import { useActionState } from "react";
import { resendVerification, type ResendVerificationFormState } from "./actions";

const initialState: ResendVerificationFormState = { submitted: false };

export function ResendVerificationForm() {
  const [state, formAction, isPending] = useActionState(resendVerification, initialState);

  if (state.submitted) {
    return (
      <p className="max-w-sm text-center text-sm text-zinc-600 dark:text-zinc-400">
        Si el email existe en nuestro sistema, te enviamos un link de verificación.
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="border rounded px-3 py-2"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-black text-white py-2 disabled:opacity-50"
      >
        {isPending ? "Enviando..." : "Reenviar verificación"}
      </button>
    </form>
  );
}
