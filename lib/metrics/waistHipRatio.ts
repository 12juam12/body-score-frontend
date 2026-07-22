import type { PatientSex, WaistHipRatio, WaistHipRiskLevel } from "@/lib/types";
import type { MetricPresentation, MetricZone } from "./types";

const COLOR_LOW = "#22c55e";
const COLOR_MODERATE = "#eab308";
const COLOR_HIGH = "#ef4444";

const SCALE_MIN = 0.6;
const SCALE_MAX = 1.2;

const CATEGORY_LABEL: Record<WaistHipRiskLevel, string> = {
  LOW: "Riesgo Bajo",
  MODERATE: "Riesgo Moderado",
  HIGH: "Riesgo Alto",
};

const CATEGORY_COLOR: Record<WaistHipRiskLevel, string> = {
  LOW: COLOR_LOW,
  MODERATE: COLOR_MODERATE,
  HIGH: COLOR_HIGH,
};

const INTERPRETATION: Record<WaistHipRiskLevel, string> = {
  LOW: "La distribución de la grasa corporal se encuentra dentro de un rango considerado saludable, con un bajo riesgo cardiometabólico asociado.",
  MODERATE:
    "La distribución de la grasa corporal comienza a aumentar el riesgo de enfermedades metabólicas y cardiovasculares. Se recomienda reducir progresivamente la grasa abdominal.",
  HIGH: "La distribución de grasa abdominal indica un riesgo elevado de desarrollar enfermedades cardiovasculares, diabetes tipo 2 y síndrome metabólico. Reducir el perímetro de cintura será uno de los principales objetivos del tratamiento.",
};

const RECOMMENDATION: Record<WaistHipRiskLevel, string> = {
  LOW: "El objetivo será mantener esta distribución saludable de grasa corporal, sosteniendo hábitos de alimentación y actividad física.",
  MODERATE:
    "Se recomienda priorizar la disminución de grasa abdominal mediante alimentación saludable, entrenamiento de fuerza y actividad física regular.",
  HIGH: "Se recomienda priorizar la disminución de grasa abdominal mediante alimentación saludable, entrenamiento de fuerza y actividad física regular, con seguimiento profesional cercano dado el riesgo elevado.",
};

const TOOLTIP =
  "La Relación Cintura/Cadera permite estimar cómo se distribuye la grasa corporal. Una mayor acumulación de grasa en la zona abdominal se asocia con un mayor riesgo de enfermedades cardiovasculares, diabetes e hipertensión.";

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

function buildZones(sex: PatientSex): MetricZone[] {
  if (sex === "FEMALE") {
    return [
      { key: "LOW", label: "Riesgo Bajo", color: COLOR_LOW, min: SCALE_MIN, max: 0.8 },
      { key: "MODERATE", label: "Riesgo Moderado", color: COLOR_MODERATE, min: 0.8, max: 0.85 },
      { key: "HIGH", label: "Riesgo Alto", color: COLOR_HIGH, min: 0.85, max: SCALE_MAX },
    ];
  }

  return [
    { key: "LOW", label: "Riesgo Bajo", color: COLOR_LOW, min: SCALE_MIN, max: 0.9 },
    { key: "MODERATE", label: "Riesgo Moderado", color: COLOR_MODERATE, min: 0.9, max: 1.0 },
    { key: "HIGH", label: "Riesgo Alto", color: COLOR_HIGH, min: 1.0, max: SCALE_MAX },
  ];
}

export function buildWaistHipRatioPresentation(
  ratio: WaistHipRatio,
  waistCm: number,
  hipCm: number,
  sex: PatientSex,
): MetricPresentation {
  const value = round2(ratio.value);

  return {
    title: "Relación Cintura / Cadera",
    unit: "",
    value,
    categoryLabel: CATEGORY_LABEL[ratio.riskLevel],
    color: CATEGORY_COLOR[ratio.riskLevel],
    zones: buildZones(sex),
    scaleMin: SCALE_MIN,
    scaleMax: SCALE_MAX,
    interpretation: INTERPRETATION[ratio.riskLevel],
    recommendation: RECOMMENDATION[ratio.riskLevel],
    technicalDetails: [
      { label: "Cintura", value: `${waistCm} cm` },
      { label: "Cadera", value: `${hipCm} cm` },
      { label: "Fórmula aplicada", value: `${waistCm} / ${hipCm} = ${value}` },
    ],
    tooltip: TOOLTIP,
  };
}
