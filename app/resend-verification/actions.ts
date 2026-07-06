"use server";

import { backendFetch } from "@/lib/backend";

export type ResendVerificationFormState = {
  submitted: boolean;
};

export async function resendVerification(
  _prevState: ResendVerificationFormState,
  formData: FormData,
): Promise<ResendVerificationFormState> {
  const email = formData.get("email");

  if (typeof email === "string" && email) {
    await backendFetch("/api/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    }).catch(() => null);
  }

  return { submitted: true };
}
