import Link from "next/link";
import { notFound } from "next/navigation";
import { apiJson, BackendError } from "@/lib/api";
import type { PatientReport } from "@/lib/types";
import { buildBmiPresentation } from "@/lib/metrics/bmi";
import { buildBodyFatMassPresentation } from "@/lib/metrics/bodyFatMass";
import { buildExpectedBodyFatMassPresentation } from "@/lib/metrics/expectedBodyFatMass";
import { buildFatFreeMassPresentation } from "@/lib/metrics/fatFreeMass";
import { buildWaistHipRatioPresentation } from "@/lib/metrics/waistHipRatio";
import { buildBasalMetabolicRatePresentation } from "@/lib/metrics/basalMetabolicRate";
import { buildVisceralFatPresentation } from "@/lib/metrics/visceralFat";
import { buildBodyCompositionGoalPresentation } from "@/lib/metrics/bodyCompositionGoal";
import { buildMuscleGoalPresentation } from "@/lib/metrics/muscleGoal";
import { buildBodyWaterPresentation } from "@/lib/metrics/bodyWater";
import { buildIdealWeightRangePresentation } from "@/lib/metrics/idealWeightRange";
import { buildWeightComparisonPresentation } from "@/lib/metrics/weightComparison";
import { buildMetabolicRiskPresentation } from "@/lib/metrics/metabolicRisk";
import { buildEvolutionProjectionPresentation } from "@/lib/metrics/evolutionProjection";
import { buildEvolutionHistoryPresentation } from "@/lib/metrics/evolutionHistory";
import { MetricCard } from "@/components/reports/MetricCard";
import { RangeMetricCard } from "@/components/reports/RangeMetricCard";
import { CompositionMetricCard } from "@/components/reports/CompositionMetricCard";
import { BodyCompositionGoalCard } from "@/components/reports/BodyCompositionGoalCard";
import { MuscleGoalCard } from "@/components/reports/MuscleGoalCard";
import { WeightComparisonCard } from "@/components/reports/WeightComparisonCard";
import { MetabolicRiskCard } from "@/components/reports/MetabolicRiskCard";
import { EvolutionProjectionCard } from "@/components/reports/EvolutionProjectionCard";
import { EvolutionHistoryChart } from "@/components/reports/EvolutionHistoryChart";

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

async function getReports(patientId: string): Promise<PatientReport[]> {
  return await apiJson<PatientReport[]>(`/api/professionals/me/patients/${patientId}/reports`);
}

export default async function PatientReportDetailPage({ params }: PatientReportDetailPageProps) {
  const { id, reportId } = await params;
  const report = await getReport(id, reportId);

  if (!report) {
    notFound();
  }

  const reports = await getReports(id);

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
  const basalMetabolicRatePresentation = buildBasalMetabolicRatePresentation(
    report.basalMetabolicRate,
    report.weightKg,
    report.heightCm,
    report.age,
  );
  const visceralFatPresentation = buildVisceralFatPresentation(report.visceralFat);
  const bodyCompositionGoalPresentation = buildBodyCompositionGoalPresentation(report.bodyCompositionGoal);
  const muscleGoalPresentation = buildMuscleGoalPresentation(report.muscleGoal, report.fatFreeMass.valueKg);
  const bodyWaterPresentation = buildBodyWaterPresentation(report.bodyWater);
  const idealWeightRangePresentation = buildIdealWeightRangePresentation(
    report.idealWeightRange,
    report.weightKg,
    report.heightCm,
    report.bodyCompositionGoal.targetWeightKg,
  );
  const weightComparisonPresentation = buildWeightComparisonPresentation(report.bodyCompositionGoal, report.idealWeightRange);
  const metabolicRiskPresentation = buildMetabolicRiskPresentation(
    report.metabolicRisk,
    report.bmi.value,
    report.waistCm,
    report.waistHipRatio.value,
    report.visceralFat.level,
  );
  const evolutionProjectionPresentation = buildEvolutionProjectionPresentation(report.evolutionProjection, report.bodyCompositionGoal);
  const evolutionHistoryPresentation = buildEvolutionHistoryPresentation(reports);

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
        <RangeMetricCard metric={basalMetabolicRatePresentation} />
        <MetricCard metric={visceralFatPresentation} />
        <BodyCompositionGoalCard metric={bodyCompositionGoalPresentation} />
        <MuscleGoalCard metric={muscleGoalPresentation} />
        <MetricCard metric={bodyWaterPresentation} />
        <RangeMetricCard metric={idealWeightRangePresentation} />
        <WeightComparisonCard metric={weightComparisonPresentation} />
        <MetabolicRiskCard metric={metabolicRiskPresentation} />
        <EvolutionProjectionCard metric={evolutionProjectionPresentation} />
        <EvolutionHistoryChart metric={evolutionHistoryPresentation} />
      </div>
    </div>
  );
}
