import { RegisterProfessionalForm } from "./RegisterProfessionalForm";

export default function RegisterProfessionalPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">Registrarme como profesional</h1>
      <RegisterProfessionalForm />
    </div>
  );
}
