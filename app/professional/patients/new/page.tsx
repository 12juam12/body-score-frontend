import { CreatePatientForm } from "./CreatePatientForm";

export default function NewPatientPage() {
  return (
    <div className="flex flex-col gap-6 items-start">
      <h1 className="text-2xl font-semibold">Crear paciente</h1>
      <CreatePatientForm />
    </div>
  );
}
