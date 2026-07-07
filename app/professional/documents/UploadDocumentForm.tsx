"use client";

import { useActionState, useRef } from "react";
import { uploadDocument, type UploadDocumentFormState } from "./actions";

const initialState: UploadDocumentFormState = {};

const DOCUMENT_TYPES = ["DNI", "UNIVERSITY_DEGREE", "SPECIALTY_CERTIFICATE", "OTHER"];

export function UploadDocumentForm() {
  const [state, formAction, isPending] = useActionState(uploadDocument, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await formAction(formData);
        formRef.current?.reset();
      }}
      className="flex flex-col gap-3 border rounded p-4 max-w-md"
    >
      <h2 className="font-medium">Subir documento</h2>
      <select name="type" required className="border rounded px-2 py-1">
        {DOCUMENT_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <input name="file" type="file" required className="border rounded px-2 py-1" />
      {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button type="submit" disabled={isPending} className="rounded bg-black text-white py-2 disabled:opacity-50">
        {isPending ? "Subiendo..." : "Subir"}
      </button>
    </form>
  );
}
