import { notFound } from "next/navigation";
import { apiFetch, apiJson, BackendError } from "@/lib/api";
import type { ProfessionalDetail } from "@/lib/types";
import { ReviewActionForm } from "./ReviewActionForm";
import { EditProfessionalForm } from "./EditProfessionalForm";

type ProfessionalDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function getProfessional(id: string): Promise<ProfessionalDetail | null> {
  try {
    return await apiJson<ProfessionalDetail>(`/api/professionals/${id}`);
  } catch (error) {
    if (error instanceof BackendError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

export default async function ProfessionalDetailPage({ params }: ProfessionalDetailPageProps) {
  const { id } = await params;
  const professional = await getProfessional(id);

  if (!professional) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold">
          {professional.firstName} {professional.lastName}
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          @{professional.nickname} · {professional.email} · Estado: {professional.status}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ReviewActionForm professionalId={professional.professionalId} actionType="approve" label="Aprobar" requireReason={false} />
        <ReviewActionForm professionalId={professional.professionalId} actionType="reject" label="Rechazar" requireReason />
        <ReviewActionForm
          professionalId={professional.professionalId}
          actionType="request-info"
          label="Pedir más info"
          requireReason
        />
        <ReviewActionForm professionalId={professional.professionalId} actionType="suspend" label="Suspender" requireReason={false} />
        <ReviewActionForm
          professionalId={professional.professionalId}
          actionType="reactivate"
          label="Reactivar"
          requireReason={false}
        />
      </div>

      <EditProfessionalForm professional={professional} />

      <div>
        <h2 className="font-medium mb-2">Documentos</h2>
        {professional.documents.length === 0 ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-400">Sin documentos subidos.</p>
        ) : (
          <ul className="text-sm">
            {professional.documents.map((doc) => (
              <li key={doc.id}>
                {doc.type}: {doc.fileName}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="font-medium mb-2">Historial de revisión</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {professional.reviewHistory.map((entry) => (
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
