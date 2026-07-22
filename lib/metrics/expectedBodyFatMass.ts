import type { ExpectedBodyFatMassRange } from "@/lib/types";
import type { MetricRangePresentation, MetricZone } from "./types";

const COLOR_BELOW = "#38bdf8";
const COLOR_WITHIN = "#22c55e";
const COLOR_SLIGHTLY_ABOVE = "#eab308";
const COLOR_ABOVE = "#f97316";
const COLOR_FAR_ABOVE = "#ef4444";

const STATUS_LABEL: Record<ExpectedBodyFatMassRange["status"], string> = {
  BELOW_RANGE: "Por debajo del rango esperado",
  WITHIN_RANGE: "Dentro del rango esperado",
  ABOVE_RANGE: "Por encima del rango esperado",
};

const INTERPRETATION: Record<ExpectedBodyFatMassRange["status"], (range: ExpectedBodyFatMassRange, actualKg: number) => string> = {
  WITHIN_RANGE: () => "Tu masa grasa corporal se encuentra dentro del rango esperado para tu peso y sexo.",
  ABOVE_RANGE: (range, actualKg) =>
    `Tu masa grasa corporal actual es de ${round1(actualKg)} kg. El rango esperado se encuentra entre ${round1(range.minKg)} y ${round1(range.maxKg)} kg, por lo que actualmente estás ${round1(range.differenceKg)} kg por encima del límite superior de referencia.`,
  BELOW_RANGE: () =>
    "Tu masa grasa corporal se encuentra por debajo del rango esperado. Este resultado debe evaluarse junto con la masa muscular, el estado nutricional y los objetivos del paciente.",
};

const RECOMMENDATION: Record<ExpectedBodyFatMassRange["status"], string> = {
  ABOVE_RANGE: "El objetivo será reducir progresivamente la masa grasa, procurando mantener o aumentar la masa muscular.",
  WITHIN_RANGE: "El objetivo será mantener la masa grasa dentro del rango esperado y preservar una composición corporal saludable.",
  BELOW_RANGE: "Se recomienda evaluar la ingesta energética, la masa muscular y el estado nutricional general antes de establecer un objetivo.",
};

const TOOLTIP =
  "Es el rango estimado de kilogramos de grasa corporal esperado según el peso y el sexo del paciente. Permite comparar la masa grasa actual con valores de referencia y establecer objetivos de composición corporal.";

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function buildZones(minKg: number, maxKg: number, scaleMin: number, scaleMax: number): MetricZone[] {
  const rangeWidth = maxKg - minKg;

  return [
    { key: "BELOW", label: "Por debajo", color: COLOR_BELOW, min: scaleMin, max: minKg },
    { key: "WITHIN", label: "Rango esperado", color: COLOR_WITHIN, min: minKg, max: maxKg },
    { key: "SLIGHTLY_ABOVE", label: "Leve exceso", color: COLOR_SLIGHTLY_ABOVE, min: maxKg, max: maxKg + rangeWidth * 0.15 },
    { key: "ABOVE", label: "Exceso", color: COLOR_ABOVE, min: maxKg + rangeWidth * 0.15, max: maxKg + rangeWidth * 0.4 },
    { key: "FAR_ABOVE", label: "Alto exceso", color: COLOR_FAR_ABOVE, min: maxKg + rangeWidth * 0.4, max: scaleMax },
  ];
}

function colorFor(range: ExpectedBodyFatMassRange): string {
  if (range.status === "BELOW_RANGE") return COLOR_BELOW;
  if (range.status === "WITHIN_RANGE") return COLOR_WITHIN;

  const rangeWidth = range.maxKg - range.minKg;
  const excessRatio = rangeWidth > 0 ? range.differenceKg / rangeWidth : 0;
  if (excessRatio <= 0.15) return COLOR_SLIGHTLY_ABOVE;
  if (excessRatio <= 0.4) return COLOR_ABOVE;
  return COLOR_FAR_ABOVE;
}

function differenceLabel(range: ExpectedBodyFatMassRange): string {
  if (range.status === "ABOVE_RANGE") return `+${round1(range.differenceKg)} kg`;
  if (range.status === "BELOW_RANGE") return `-${round1(range.differenceKg)} kg`;
  return "0 kg";
}

export function buildExpectedBodyFatMassPresentation(
  range: ExpectedBodyFatMassRange,
  actualKg: number,
): MetricRangePresentation {
  const rangeWidth = range.maxKg - range.minKg;
  const scaleMin = Math.max(0, range.minKg - rangeWidth);
  const scaleMax = range.maxKg + rangeWidth * 1.5;

  return {
    title: "Masa Grasa Esperada",
    unit: "kg",
    actualValue: round1(actualKg),
    minValue: round1(range.minKg),
    maxValue: round1(range.maxKg),
    statusLabel: STATUS_LABEL[range.status],
    color: colorFor(range),
    differenceLabel: differenceLabel(range),
    zones: buildZones(range.minKg, range.maxKg, scaleMin, scaleMax),
    scaleMin,
    scaleMax,
    interpretation: INTERPRETATION[range.status](range, actualKg),
    recommendation: RECOMMENDATION[range.status],
    technicalDetails: [
      { label: "Porcentaje mínimo de referencia", value: `${range.minPercentage} %` },
      { label: "Porcentaje máximo de referencia", value: `${range.maxPercentage} %` },
      { label: "Fórmula mínima", value: `peso × ${range.minPercentage} / 100 = ${round1(range.minKg)} kg` },
      { label: "Fórmula máxima", value: `peso × ${range.maxPercentage} / 100 = ${round1(range.maxKg)} kg` },
    ],
    tooltip: TOOLTIP,
  };
}
