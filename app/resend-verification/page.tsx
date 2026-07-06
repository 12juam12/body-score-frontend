import { ResendVerificationForm } from "./ResendVerificationForm";

export default function ResendVerificationPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-2xl font-semibold">Reenviar verificación de email</h1>
      <ResendVerificationForm />
    </div>
  );
}
