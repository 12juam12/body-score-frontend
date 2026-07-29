import type { BasalMetabolicRate, BasalMetabolicRateStatus } from "@/lib/types";
import type { MetricRangePresentation, MetricZone } from "./types";

const COLOR_FAR_BELOW = "#ef4444";
const COLOR_SLIGHTLY_BELOW = "#f97316";
const COLOR_WITHIN = "#22c55e";
const COLOR_SLIGHTLY_ABOVE = "#eab308";
const COLOR_FAR_ABOVE = "#3b82f6";

const STATUS_LABEL: Record<BasalMetabolicRateStatus, string> = {
  FAR_BELOW: "Muy por debajo de lo esperado",
  SLIGHTLY_BELOW: "Levemente por debajo",
  WITHIN_RANGE: "Dentro de lo esperado",
  SLIGHTLY_ABOVE: "Levemente por encima",
  FAR_ABOVE: "Muy por encima",
};

const STATUS_COLOR: Record<BasalMetabolicRateStatus, string> = {
  FAR_BELOW: COLOR_FAR_BELOW,
  SLIGHTLY_BELOW: COLOR_SLIGHTLY_BELOW,
  WITHIN_RANGE: COLOR_WITHIN,
  SLIGHTLY_ABOVE: COLOR_SLIGHTLY_ABOVE,
  FAR_ABOVE: COLOR_FAR_ABOVE,
};

const INTERPRETATION: Record<BasalMetabolicRateStatus, string> = {
  FAR_BELOW:
    "Tu metabolismo basal medido se encuentra considerablemente por debajo del esperado para tus características físicas. Esto puede estar asociado a una menor masa muscular, dietas muy restrictivas o adaptaciones metabólicas. Se recomienda una evaluación nutricional completa.",
  SLIGHTLY_BELOW:
    "Tu metabolismo basal es ligeramente inferior al esperado. Mejorar la masa muscular y mantener una adecuada ingesta energética puede favorecer una mejora del gasto energético.",
  WITHIN_RANGE: "Tu metabolismo basal se encuentra dentro del rango esperado para tu sexo, edad, peso y altura.",
  SLIGHTLY_ABOVE:
    "Tu metabolismo basal es ligeramente superior al esperado. Esto suele observarse en personas con mayor masa muscular o mayor actividad metabólica.",
  FAR_ABOVE:
    "Tu metabolismo basal es considerablemente superior al esperado. Este resultado puede relacionarse con una elevada masa muscular u otros factores fisiológicos que deberán ser interpretados por el profesional.",
};

const RECOMMENDATION: Record<BasalMetabolicRateStatus, string> = {
  FAR_BELOW:
    "Priorizar el mantenimiento o aumento de la masa muscular mediante entrenamiento de fuerza y una adecuada ingesta de proteínas puede contribuir a mejorar el gasto metabólico basal.",
  SLIGHTLY_BELOW:
    "Priorizar el mantenimiento o aumento de la masa muscular mediante entrenamiento de fuerza y una adecuada ingesta de proteínas puede contribuir a mejorar el gasto metabólico basal.",
  WITHIN_RANGE: "El metabolismo basal se encuentra dentro de los valores esperados. El plan nutricional podrá calcularse a partir de este valor.",
  SLIGHTLY_ABOVE: "Un metabolismo basal elevado suele ser una ventaja para el mantenimiento del peso y el gasto energético diario.",
  FAR_ABOVE: "Un metabolismo basal elevado suele ser una ventaja para el mantenimiento del peso y el gasto energético diario.",
};

const TOOLTIP =
  "El Gasto Metabólico Basal representa la cantidad mínima de energía que el organismo necesita para mantenerse con vida en reposo absoluto durante 24 horas. Constituye la mayor parte del gasto energético diario y depende principalmente de la edad, el sexo, el peso, la altura y la masa muscular.";

function round0(value: number): number {
  return Math.round(value);
}

function buildZones(estimatedKcal: number, scaleMin: number, scaleMax: number): MetricZone[] {
  return [
    { key: "FAR_BELOW", label: "Muy Bajo", color: COLOR_FAR_BELOW, min: scaleMin, max: estimatedKcal * 0.85 },
    { key: "SLIGHTLY_BELOW", label: "Bajo", color: COLOR_SLIGHTLY_BELOW, min: estimatedKcal * 0.85, max: estimatedKcal * 0.95 },
    { key: "WITHIN", label: "Esperado", color: COLOR_WITHIN, min: estimatedKcal * 0.95, max: estimatedKcal * 1.05 },
    { key: "SLIGHTLY_ABOVE", label: "Alto", color: COLOR_SLIGHTLY_ABOVE, min: estimatedKcal * 1.05, max: estimatedKcal * 1.1 },
    { key: "FAR_ABOVE", label: "Muy Alto", color: COLOR_FAR_ABOVE, min: estimatedKcal * 1.1, max: scaleMax },
  ];
}

export function buildBasalMetabolicRatePresentation(
  basalMetabolicRate: BasalMetabolicRate,
  weightKg: number,
  heightCm: number,
  age: number,
): MetricRangePresentation {
  const { measuredKcal, estimatedKcal, percentage, status } = basalMetabolicRate;
  const scaleMin = estimatedKcal * 0.7;
  const scaleMax = estimatedKcal * 1.25;

  return {
    title: "Gasto Metabólico Basal",
    subtitle: "Medido por bioimpedancia",
    unit: "kcal/día",
    actualValue: round0(measuredKcal),
    minValue: round0(estimatedKcal),
    maxValue: round0(estimatedKcal),
    actualLabel: "Medido",
    rangeLabel: "Estimado por fórmula",
    differenceStatLabel: "Comparación",
    differenceLabel: `${round0(percentage)} %`,
    statusLabel: STATUS_LABEL[status],
    color: STATUS_COLOR[status],
    zones: buildZones(estimatedKcal, scaleMin, scaleMax),
    scaleMin,
    scaleMax,
    interpretation: INTERPRETATION[status],
    recommendation: RECOMMENDATION[status],
    technicalDetails: [
      { label: "Peso utilizado", value: `${weightKg} kg` },
      { label: "Altura utilizada", value: `${heightCm} cm` },
      { label: "Edad utilizada", value: `${age} años` },
      { label: "Fórmula aplicada", value: "Mifflin-St Jeor" },
      { label: "Estimado por fórmula", value: `${round0(estimatedKcal)} kcal/día` },
      { label: "Medido por bioimpedancia", value: `${round0(measuredKcal)} kcal/día` },
      { label: "Porcentaje medido/estimado", value: `${round0(percentage)} %` },
    ],
    tooltip: TOOLTIP,
  };
}
