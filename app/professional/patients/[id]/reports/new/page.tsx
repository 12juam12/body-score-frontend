import { CreatePatientReportForm } from "./CreatePatientReportForm";

type NewPatientReportPageProps = {
  params: Promise<{ id: string }>;
};

export default async function NewPatientReportPage({ params }: NewPatientReportPageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-6 items-start">
      <h1 className="text-2xl font-semibold">Nuevo informe</h1>
      <CreatePatientReportForm patientId={Number(id)} />
    </div>
  );
}
