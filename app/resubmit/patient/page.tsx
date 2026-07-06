import Link from "next/link";
import { ResubmitPatientForm } from "./ResubmitPatientForm";

type ResubmitPatientPageProps = {
  searchParams: Promise<{ professionalId?: string; nickname?: string }>;
};

export default async function ResubmitPatientPage({ searchParams }: ResubmitPatientPageProps) {
  const { professionalId, nickname } = await searchParams;
  const parsedProfessionalId = professionalId ? Number(professionalId) : null;

  if (!parsedProfessionalId || !nickname) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-semibold">Elegí un profesional primero</h1>
        <p className="max-w-md text-zinc-600 dark:text-zinc-400">
          Para reenviar tu solicitud, entrá a la página del profesional con el que querés
          quedar vinculado.
        </p>
        <Link href="/directory" className="rounded bg-black px-6 py-3 text-white dark:bg-white dark:text-black">
          Buscar un profesional
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-12">
      <h1 className="text-2xl font-semibold">Reenviar mi solicitud</h1>
      <ResubmitPatientForm professionalId={parsedProfessionalId} professionalNickname={nickname} />
    </div>
  );
}
