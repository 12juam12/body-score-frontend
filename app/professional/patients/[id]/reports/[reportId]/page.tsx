import Link from "next/link";
import { notFound } from "next/navigation";
import { apiJson, BackendError } from "@/lib/api";
import type { PatientReport } from "@/lib/types";
import { buildBmiPresentation } from "@/lib/metrics/bmi";
import { buildBodyFatMassPresentation } from "@/lib/metrics/bodyFatMass";
import { buildExpectedBodyFatMassPresentation } from "@/lib/metrics/expectedBodyFatMass";
import { buildFatFreeMassPresentation } from "@/lib/metrics/fatFreeMass";
import { buildWaistHipRatioPresentation } from "@/lib/metrics/waistHipRatio";
import { MetricCard } from "@/components/reports/MetricCard";
import { RangeMetricCard } from "@/components/reports/RangeMetricCard";
import { CompositionMetricCard } from "@/components/reports/CompositionMetricCard";

type PatientReportDetailPageProps = {
  params: Promise<{ id: string; reportId: string }>;
};

const SEX_LABELS: Record<PatientReport["sex"], string> = {
  MALE: "Masculino",
  FEMALE: "Femenino",
};

async function getReport(patientId: string, reportId: string): Promise<PatientReport | null> {
  try {
    return await apiJson<PatientReport>(`/api/professionals/me/patients/${patientId}/reports/${reportId}`);
  } catch (error) {
    if (error instanceof BackendError && (error.status === 404 || error.status === 403)) {
      return null;
    }
    throw error;
  }
}

export default async function PatientReportDetailPage({ params }: PatientReportDetailPageProps) {
  const { id, reportId } = await params;
  const report = await getReport(id, reportId);

  if (!report) {
    notFound();
  }

  const bmiPresentation = buildBmiPresentation(report.bmi, report.weightKg, report.heightCm);
  const bodyFatMassPresentation = buildBodyFatMassPresentation(report.bodyFatMass, report.weightKg, report.bodyFatPercentage);
  const expectedBodyFatMassPresentation = buildExpectedBodyFatMassPresentation(
    report.expectedBodyFatMassRange,
    report.bodyFatMass.valueKg,
  );
  const fatFreeMassPresentation = buildFatFreeMassPresentation(report.fatFreeMass, report.weightKg, report.bodyFatMass.valueKg);
  const waistHipRatioPresentation = buildWaistHipRatioPresentation(
    report.waistHipRatio,
    report.waistCm,
    report.hipCm,
    report.sex,
  );

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <Link href={`/professional/patients/${id}`} className="text-sm underline">
          ← Volver al paciente
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Informe del {new Date(report.createdAt).toLocaleDateString()}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {report.weightKg} kg · {report.heightCm} cm · {report.age} años · {SEX_LABELS[report.sex]}
        </p>
      </div>

      <div className="grid gap-4">
        <MetricCard metric={bmiPresentation} />
        <MetricCard metric={bodyFatMassPresentation} />
        <RangeMetricCard metric={expectedBodyFatMassPresentation} />
        <CompositionMetricCard metric={fatFreeMassPresentation} />
        <MetricCard metric={waistHipRatioPresentation} />
      </div>
    </div>
  );
}
