import type { IdealWeightRange } from "@/lib/types";
import type { MetricRangePresentation, MetricZone } from "./types";

const COLOR_UNDERWEIGHT = "#38bdf8";
const COLOR_NORMAL = "#22c55e";
const COLOR_OVERWEIGHT = "#eab308";
const COLOR_OBESITY = "#ef4444";

const OBESITY_BMI_THRESHOLD = 30;
const SCALE_MARGIN_RATIO = 0.35;

const INTERPRETATION =
  "Este rango corresponde al peso saludable definido por el IMC y constituye una referencia poblacional. No considera la composición corporal, la masa muscular ni el porcentaje de grasa.";

const RECOMMENDATION =
  "En personas con mayor masa muscular o una composición corporal diferente al promedio, el peso personalizado puede diferir del rango calculado mediante el IMC.";

const TOOLTIP =
  "El IMC estima un rango de peso saludable para la población general a partir de la talla, pero no considera la composición corporal, la masa muscular ni el porcentaje de grasa del paciente.";

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function statusFor(currentWeightKg: number, minWeightKg: number, maxWeightKg: number, obesityWeightKg: number) {
  if (currentWeightKg < minWeightKg) return { label: "Bajo peso", color: COLOR_UNDERWEIGHT };
  if (currentWeightKg <= maxWeightKg) return { label: "Normal", color: COLOR_NORMAL };
  if (currentWeightKg < obesityWeightKg) return { label: "Sobrepeso", color: COLOR_OVERWEIGHT };
  return { label: "Obesidad", color: COLOR_OBESITY };
}

function buildZones(minWeightKg: number, maxWeightKg: number, obesityWeightKg: number, scaleMin: number, scaleMax: number): MetricZone[] {
  return [
    { key: "UNDERWEIGHT", label: "Bajo peso", color: COLOR_UNDERWEIGHT, min: scaleMin, max: minWeightKg },
    { key: "NORMAL", label: "Normal", color: COLOR_NORMAL, min: minWeightKg, max: maxWeightKg },
    { key: "OVERWEIGHT", label: "Sobrepeso", color: COLOR_OVERWEIGHT, min: maxWeightKg, max: obesityWeightKg },
    { key: "OBESITY", label: "Obesidad", color: COLOR_OBESITY, min: obesityWeightKg, max: scaleMax },
  ];
}

export function buildIdealWeightRangePresentation(
  idealWeightRange: IdealWeightRange,
  currentWeightKg: number,
  heightCm: number,
  personalizedTargetWeightKg: number,
): MetricRangePresentation {
  const heightMeters = heightCm / 100;
  const obesityWeightKg = OBESITY_BMI_THRESHOLD * heightMeters * heightMeters;

  const minRounded = round1(idealWeightRange.minWeightKg);
  const maxRounded = round1(idealWeightRange.maxWeightKg);

  const span = maxRounded - minRounded;
  const scaleMin = Math.max(0, minRounded - span * SCALE_MARGIN_RATIO);
  const scaleMax = Math.max(obesityWeightKg, currentWeightKg) + span * SCALE_MARGIN_RATIO;

  const status = statusFor(currentWeightKg, minRounded, maxRounded, obesityWeightKg);

  return {
    title: "Peso Ideal según IMC",
    subtitle: "Referencia poblacional, no personalizada",
    unit: "kg",
    actualValue: round1(currentWeightKg),
    minValue: minRounded,
    maxValue: maxRounded,
    actualLabel: "Peso actual",
    rangeLabel: "Rango saludable (IMC)",
    differenceStatLabel: "Peso según composición corporal",
    differenceLabel: `${round1(personalizedTargetWeightKg)} kg`,
    statusLabel: status.label,
    color: status.color,
    zones: buildZones(minRounded, maxRounded, obesityWeightKg, scaleMin, scaleMax),
    scaleMin,
    scaleMax,
    interpretation: INTERPRETATION,
    recommendation: RECOMMENDATION,
    technicalDetails: [
      { label: "Talla utilizada", value: `${heightCm} cm` },
      { label: "Peso mínimo (IMC 18.5)", value: `${minRounded} kg` },
      { label: "Peso máximo (IMC 24.9)", value: `${maxRounded} kg` },
      { label: "Fórmula (mínimo)", value: `18.5 × ${heightMeters.toFixed(2)}² = ${minRounded} kg` },
      { label: "Fórmula (máximo)", value: `24.9 × ${heightMeters.toFixed(2)}² = ${maxRounded} kg` },
    ],
    tooltip: TOOLTIP,
  };
}
