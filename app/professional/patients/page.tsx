import Link from "next/link";
import { apiJson } from "@/lib/api";
import type { PatientListItem } from "@/lib/types";

export default async function ProfessionalPatientsPage() {
  const patients = await apiJson<PatientListItem[]>("/api/professionals/me/patients");

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mis pacientes</h1>
        <Link href="/professional/patients/new" className="rounded bg-black text-white px-4 py-2 text-sm">
          Crear paciente
        </Link>
      </div>

      {patients.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">Todavía no tenés pacientes.</p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2">Nombre</th>
              <th className="py-2">Email</th>
              <th className="py-2">Obra social</th>
              <th className="py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.patientId} className="border-b hover:bg-zinc-50 dark:hover:bg-zinc-900">
                <td className="py-2">
                  <Link href={`/professional/patients/${patient.patientId}`} className="underline">
                    {patient.firstName} {patient.lastName}
                  </Link>
                </td>
                <td className="py-2">{patient.email}</td>
                <td className="py-2">{patient.healthInsurance ?? "-"}</td>
                <td className="py-2">{patient.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
