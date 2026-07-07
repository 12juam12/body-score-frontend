import { notFound } from "next/navigation";
import { apiJson, BackendError } from "@/lib/api";
import type { PatientDetail } from "@/lib/types";
import { ReviewActionForm } from "./ReviewActionForm";
import { EditPatientForm } from "./EditPatientForm";

type PatientDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function getPatient(id: string): Promise<PatientDetail | null> {
  try {
    return await apiJson<PatientDetail>(`/api/patients/${id}`);
  } catch (error) {
    if (error instanceof BackendError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { id } = await params;
  const patient = await getPatient(id);

  if (!patient) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">
          {patient.firstName} {patient.lastName}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {patient.email} · Estado: {patient.status}
        </p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Profesional elegido: {patient.selectedProfessionalId ?? "-"} · Vinculado con:{" "}
          {patient.linkedProfessionalIds.length > 0 ? patient.linkedProfessionalIds.join(", ") : "-"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ReviewActionForm patientId={patient.patientId} actionType="approve" label="Aprobar" requireReason={false} />
        <ReviewActionForm patientId={patient.patientId} actionType="reject" label="Rechazar" requireReason />
        <ReviewActionForm patientId={patient.patientId} actionType="request-info" label="Pedir más info" requireReason />
      </div>

      <EditPatientForm patient={patient} />

      <div>
        <h2 className="font-medium mb-2">Historial de revisión</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {patient.reviewHistory.map((entry) => (
            <li key={entry.id} className="border-b pb-2">
              <span className="font-medium">{entry.action}</span>
              {entry.reason ? <span> — {entry.reason}</span> : null}
              <span className="text-zinc-500"> ({new Date(entry.createdAt).toLocaleString()})</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
