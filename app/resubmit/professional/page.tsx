import { ResubmitProfessionalForm } from "./ResubmitProfessionalForm";

export default function ResubmitProfessionalPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">Reenviar mi solicitud</h1>
      <ResubmitProfessionalForm />
    </div>
  );
}
