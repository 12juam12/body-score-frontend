import { apiJson } from "@/lib/api";
import type { PatientDetail } from "@/lib/types";

export default async function PatientProfilePage() {
  const patient = await apiJson<PatientDetail>("/api/patients/me");

  return (
    <div className="flex flex-col gap-6 max-w-md">
      <h1 className="text-2xl font-semibold">Mi perfil</h1>

      <div className="flex flex-col gap-2 border rounded p-4">
        <p>
          <span className="font-medium">Nombre:</span> {patient.firstName} {patient.lastName}
        </p>
        <p>
          <span className="font-medium">Email:</span> {patient.email}
        </p>
        <p>
          <span className="font-medium">DNI:</span> {patient.nationalId}
        </p>
        <p>
          <span className="font-medium">Obra social:</span> {patient.healthInsurance ?? "-"}
        </p>
        <p>
          <span className="font-medium">Estado:</span> {patient.status}
        </p>
      </div>

      <div>
        <h2 className="font-medium mb-2">Historial</h2>
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
