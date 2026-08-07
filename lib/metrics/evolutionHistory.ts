import type { PatientReport } from "@/lib/types";
import type { EvolutionHistoryPresentation, EvolutionHistorySeries } from "./types";

const COLOR_WEIGHT = "#3b82f6";
const COLOR_MUSCLE = "#8b5cf6";
const COLOR_FAT = "#ec4899";

const EMPTY_MESSAGE = "A medida que se registren nuevos controles, aquí podrás visualizar tu evolución corporal.";

export function buildEvolutionHistoryPresentation(reports: PatientReport[]): EvolutionHistoryPresentation {
  const sortedReports = [...reports].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  if (sortedReports.length < 2) {
    return { hasHistory: false, series: [], emptyMessage: EMPTY_MESSAGE };
  }

  const series: EvolutionHistorySeries[] = [
    {
      key: "weight",
      label: "Peso",
      color: COLOR_WEIGHT,
      unit: "kg",
      points: sortedReports.map((report) => ({ date: report.createdAt, value: report.weightKg })),
    },
    {
      key: "muscle",
      label: "Masa muscular",
      color: COLOR_MUSCLE,
      unit: "kg",
      points: sortedReports.map((report) => ({ date: report.createdAt, value: report.muscleGoal.currentMuscleMassKg })),
    },
    {
      key: "fat",
      label: "% Grasa corporal",
      color: COLOR_FAT,
      unit: "%",
      points: sortedReports.map((report) => ({ date: report.createdAt, value: report.bodyFatPercentage })),
    },
  ];

  return { hasHistory: true, series, emptyMessage: EMPTY_MESSAGE };
}
