import Link from "next/link";
import { RegisterPatientForm } from "./RegisterPatientForm";

type RegisterPatientPageProps = {
  searchParams: Promise<{ professionalId?: string; nickname?: string }>;
};

export default async function RegisterPatientPage({ searchParams }: RegisterPatientPageProps) {
  const { professionalId, nickname } = await searchParams;
  const parsedProfessionalId = professionalId ? Number(professionalId) : null;

  if (!parsedProfessionalId || !nickname) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-semibold">Elegí un profesional primero</h1>
        <p className="max-w-md text-zinc-600 dark:text-zinc-400">
          Para registrarte como paciente, primero elegí quién te va a revisar.
        </p>
        <Link href="/directory" className="rounded bg-black px-6 py-3 text-white dark:bg-white dark:text-black">
          Buscar un profesional
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">Registrarme como paciente</h1>
      <RegisterPatientForm professionalId={parsedProfessionalId} professionalNickname={nickname} />
    </div>
  );
}
