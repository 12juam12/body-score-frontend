import type { FatFreeMass } from "@/lib/types";
import type { MetricTechnicalDetail } from "./types";

export type CompositionSegment = {
  key: string;
  label: string;
  valueKg: number;
  percentage: number;
  color: string;
};

export type CompositionPresentation = {
  title: string;
  mainValue: number;
  unit: string;
  caption: string;
  segments: CompositionSegment[];
  interpretation: string;
  recommendation: string;
  technicalDetails: MetricTechnicalDetail[];
  tooltip: string;
};

const COLOR_FAT_FREE = "#0d9488";
const COLOR_FAT = "#f59e0b";

const TOOLTIP =
  "La Masa Libre de Grasa representa todo el peso corporal que no corresponde al tejido adiposo. Está formada principalmente por músculos, huesos, agua y órganos. En un tratamiento nutricional el objetivo suele ser mantener o aumentar esta masa mientras disminuye la grasa corporal.";

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export function buildFatFreeMassPresentation(
  fatFreeMass: FatFreeMass,
  weightKg: number,
  bodyFatMassKg: number,
): CompositionPresentation {
  const roundedValue = round1(fatFreeMass.valueKg);
  const roundedFatMass = round1(bodyFatMassKg);
  const fatFreePercentage = (fatFreeMass.valueKg / weightKg) * 100;
  const fatPercentage = (bodyFatMassKg / weightKg) * 100;

  return {
    title: "Masa Libre de Grasa",
    mainValue: roundedValue,
    unit: "kg",
    caption: `de los ${weightKg} kg de peso total`,
    segments: [
      {
        key: "FAT_FREE",
        label: "Masa libre de grasa",
        valueKg: roundedValue,
        percentage: round1(fatFreePercentage),
        color: COLOR_FAT_FREE,
      },
      {
        key: "FAT",
        label: "Masa grasa",
        valueKg: roundedFatMass,
        percentage: round1(fatPercentage),
        color: COLOR_FAT,
      },
    ],
    interpretation: `Tu cuerpo posee aproximadamente ${roundedValue} kg de masa libre de grasa.\n\nEste valor representa todos los tejidos del organismo que no corresponden a grasa corporal, incluyendo músculos, huesos, órganos y agua.`,
    recommendation:
      "Mantener o aumentar la masa libre de grasa durante el tratamiento contribuye a un mejor rendimiento físico y a un metabolismo más activo, especialmente si el objetivo es reducir la masa grasa.",
    technicalDetails: [
      { label: "Peso utilizado", value: `${weightKg} kg` },
      { label: "Masa grasa utilizada", value: `${roundedFatMass} kg` },
      { label: "Fórmula aplicada", value: `${weightKg} − ${roundedFatMass} = ${roundedValue} kg` },
    ],
    tooltip: TOOLTIP,
  };
}
