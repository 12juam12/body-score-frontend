import type { VisceralFat, VisceralFatLevel } from "@/lib/types";
import type { MetricPresentation, MetricZone } from "./types";

const SCALE_MIN = 1;
const SCALE_MAX = 20;

const COLOR_NORMAL = "#22c55e";
const COLOR_ELEVATED = "#f59e0b";
const COLOR_VERY_ELEVATED = "#ef4444";

const ZONES: MetricZone[] = [
  { key: "NORMAL", label: "Normal", color: COLOR_NORMAL, min: SCALE_MIN, max: 10 },
  { key: "ELEVATED", label: "Elevada", color: COLOR_ELEVATED, min: 10, max: 15 },
  { key: "VERY_ELEVATED", label: "Muy Elevada", color: COLOR_VERY_ELEVATED, min: 15, max: SCALE_MAX },
];

const CATEGORY_LABEL: Record<VisceralFatLevel, string> = {
  NORMAL: "Normal",
  ELEVATED: "Elevada",
  VERY_ELEVATED: "Muy Elevada",
};

const CATEGORY_COLOR: Record<VisceralFatLevel, string> = {
  NORMAL: COLOR_NORMAL,
  ELEVATED: COLOR_ELEVATED,
  VERY_ELEVATED: COLOR_VERY_ELEVATED,
};

const INTERPRETATION: Record<VisceralFatLevel, string> = {
  NORMAL:
    "Tu nivel de grasa visceral se encuentra dentro del rango saludable. Esto indica una baja acumulación de grasa alrededor de los órganos internos y un menor riesgo de enfermedades metabólicas.",
  ELEVATED:
    "Tu nivel de grasa visceral se encuentra por encima del rango recomendado. Reducir la grasa abdominal contribuirá a disminuir el riesgo de enfermedades cardiovasculares, diabetes e hipertensión.",
  VERY_ELEVATED:
    "Tu nivel de grasa visceral es considerablemente elevado. Este resultado se asocia con un mayor riesgo cardiometabólico y debería ser uno de los principales objetivos del tratamiento nutricional.",
};

const RECOMMENDATION: Record<VisceralFatLevel, string> = {
  NORMAL: "Mantener hábitos saludables ayudará a conservar un bajo nivel de grasa visceral.",
  ELEVATED: "Priorizar la reducción de grasa corporal mediante alimentación saludable, entrenamiento de fuerza y actividad física regular.",
  VERY_ELEVATED:
    "Se recomienda disminuir progresivamente la grasa abdominal mediante un plan nutricional personalizado y actividad física supervisada.",
};

const TOOLTIP =
  "La grasa visceral es la grasa que rodea los órganos internos del abdomen. Un exceso de este tipo de grasa aumenta el riesgo de desarrollar diabetes tipo 2, hipertensión, enfermedades cardiovasculares, hígado graso y síndrome metabólico.";

const WARNING_MESSAGE =
  "El nivel de grasa visceral se encuentra por encima del rango saludable. Reducir este indicador disminuirá significativamente el riesgo de enfermedades metabólicas y cardiovasculares.";

export function buildVisceralFatPresentation(visceralFat: VisceralFat): MetricPresentation {
  return {
    title: "Grasa Visceral",
    unit: "",
    value: visceralFat.level,
    categoryLabel: CATEGORY_LABEL[visceralFat.status],
    color: CATEGORY_COLOR[visceralFat.status],
    zones: ZONES,
    scaleMin: SCALE_MIN,
    scaleMax: SCALE_MAX,
    gaugeSmooth: true,
    warning: visceralFat.level >= 10 ? { title: "Atención", message: WARNING_MESSAGE } : undefined,
    interpretation: INTERPRETATION[visceralFat.status],
    recommendation: RECOMMENDATION[visceralFat.status],
    technicalDetails: [{ label: "Nivel informado por la balanza", value: `${visceralFat.level}` }],
    tooltip: TOOLTIP,
  };
}
