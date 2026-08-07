import type { BodyCompositionGoal, IdealWeightRange } from "@/lib/types";
import type { WeightComparisonPresentation, WeightComparisonRow } from "./types";

const COLOR_CURRENT = "#475569";
const COLOR_PERSONALIZED = "#0d9488";
const COLOR_IMC_MIDPOINT = "#22c55e";

const SCALE_MARGIN_RATIO = 0.3;

const EXPLANATION =
  "El peso calculado mediante la composición corporal considera la masa muscular y la cantidad de grasa corporal. En cambio, el IMC utiliza únicamente el peso y la altura, por lo que representa una referencia general para la población.";

const CASE_MESSAGE = {
  SIMILAR: "El peso personalizado coincide con el rango esperado según el IMC.",
  HIGHER: "El peso personalizado es superior al estimado por el IMC debido a una mayor masa libre de grasa o masa muscular.",
  LOWER: "El peso personalizado es inferior al estimado por el IMC debido a diferencias en la composición corporal.",
};

const TOOLTIP =
  "El IMC utiliza únicamente peso y talla, mientras que el método basado en composición corporal incorpora masa grasa y masa libre de grasa, proporcionando un objetivo mucho más personalizado.";

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function caseMessageFor(personalizedWeightKg: number, minWeightKg: number, maxWeightKg: number): string {
  if (personalizedWeightKg > maxWeightKg) return CASE_MESSAGE.HIGHER;
  if (personalizedWeightKg < minWeightKg) return CASE_MESSAGE.LOWER;
  return CASE_MESSAGE.SIMILAR;
}

export function buildWeightComparisonPresentation(
  bodyCompositionGoal: BodyCompositionGoal,
  idealWeightRange: IdealWeightRange,
): WeightComparisonPresentation {
  const currentWeightKg = round1(bodyCompositionGoal.currentWeightKg);
  const personalizedWeightKg = round1(bodyCompositionGoal.targetWeightKg);
  const minWeightKg = round1(idealWeightRange.minWeightKg);
  const maxWeightKg = round1(idealWeightRange.maxWeightKg);
  const midpointWeightKg = round1((idealWeightRange.minWeightKg + idealWeightRange.maxWeightKg) / 2);

  const values = [currentWeightKg, personalizedWeightKg, midpointWeightKg];
  const minPoint = Math.min(...values);
  const maxPoint = Math.max(...values);
  const span = Math.max(maxPoint - minPoint, 2);
  const scaleMin = Math.max(0, minPoint - span * SCALE_MARGIN_RATIO);
  const scaleMax = maxPoint + span * SCALE_MARGIN_RATIO;

  const comparisonRows: WeightComparisonRow[] = [
    { method: "Peso actual", result: `${currentWeightKg} kg` },
    { method: "Peso según IMC", result: `${minWeightKg}–${maxWeightKg} kg` },
    { method: "Peso según composición corporal", result: `${personalizedWeightKg} kg` },
  ];

  return {
    title: "Comparación de Peso de Referencia",
    stats: [
      { label: "Peso actual", value: `${currentWeightKg} kg` },
      { label: "Peso de referencia según IMC", value: `${minWeightKg}–${maxWeightKg} kg` },
      { label: "Peso personalizado según composición corporal", value: `${personalizedWeightKg} kg` },
    ],
    points: [
      { value: currentWeightKg, label: "Peso actual", color: COLOR_CURRENT },
      { value: personalizedWeightKg, label: "Peso composición corporal", color: COLOR_PERSONALIZED },
      { value: midpointWeightKg, label: "Centro rango IMC", color: COLOR_IMC_MIDPOINT },
    ],
    scaleMin,
    scaleMax,
    explanation: EXPLANATION,
    caseMessage: caseMessageFor(personalizedWeightKg, minWeightKg, maxWeightKg),
    comparisonRows,
    tooltip: TOOLTIP,
  };
}
