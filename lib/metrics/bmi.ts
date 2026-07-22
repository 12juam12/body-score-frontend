import type { BmiCategory, BodyMassIndex } from "@/lib/types";
import type { MetricPresentation, MetricZone } from "./types";

const SCALE_MIN = 10;
const SCALE_MAX = 50;

const ZONES: MetricZone[] = [
  { key: "VERY_LOW", label: "Muy bajo", color: "#38bdf8", min: SCALE_MIN, max: 16 },
  { key: "LOW", label: "Bajo", color: "#38bdf8", min: 16, max: 18.5 },
  { key: "NORMAL", label: "Normal", color: "#22c55e", min: 18.5, max: 25 },
  { key: "OVERWEIGHT", label: "Sobrepeso", color: "#eab308", min: 25, max: 30 },
  { key: "OBESITY_I", label: "Ob. I", color: "#f97316", min: 30, max: 35 },
  { key: "OBESITY_II", label: "Ob. II", color: "#ef4444", min: 35, max: 40 },
  { key: "OBESITY_III", label: "Ob. III", color: "#b91c1c", min: 40, max: SCALE_MAX },
];

const CATEGORY_LABEL: Record<BmiCategory, string> = {
  VERY_LOW_WEIGHT: "Muy bajo peso",
  SEVERE_LOW_WEIGHT: "Bajo peso severo",
  MODERATE_LOW_WEIGHT: "Bajo peso moderado",
  NORMAL: "Peso normal",
  OVERWEIGHT: "Sobrepeso",
  OBESITY_I: "Obesidad grado I",
  OBESITY_II: "Obesidad grado II",
  OBESITY_III: "Obesidad grado III",
};

const CATEGORY_COLOR: Record<BmiCategory, string> = {
  VERY_LOW_WEIGHT: "#38bdf8",
  SEVERE_LOW_WEIGHT: "#38bdf8",
  MODERATE_LOW_WEIGHT: "#38bdf8",
  NORMAL: "#22c55e",
  OVERWEIGHT: "#eab308",
  OBESITY_I: "#f97316",
  OBESITY_II: "#ef4444",
  OBESITY_III: "#b91c1c",
};

const INTERPRETATION: Record<BmiCategory, string> = {
  VERY_LOW_WEIGHT:
    "Tu IMC indica muy bajo peso.\n\nEsto significa que tu peso se encuentra muy por debajo del rango considerado saludable para tu altura, lo que puede estar asociado a déficits nutricionales.\n\nEl IMC es un indicador general y no distingue entre grasa y masa muscular, por lo que debe interpretarse junto con el porcentaje de grasa corporal y la masa muscular.",
  SEVERE_LOW_WEIGHT:
    "Tu IMC indica bajo peso severo.\n\nEsto significa que tu peso se encuentra por debajo del rango considerado saludable para tu altura.\n\nEl IMC es un indicador general y no distingue entre grasa y masa muscular, por lo que debe interpretarse junto con el porcentaje de grasa corporal y la masa muscular.",
  MODERATE_LOW_WEIGHT:
    "Tu IMC indica bajo peso moderado.\n\nEsto significa que tu peso se encuentra levemente por debajo del rango considerado saludable para tu altura.\n\nEl IMC es un indicador general y no distingue entre grasa y masa muscular, por lo que debe interpretarse junto con el porcentaje de grasa corporal y la masa muscular.",
  NORMAL:
    "Tu IMC indica un peso normal.\n\nEsto significa que tu peso se encuentra dentro del rango considerado saludable para tu altura.\n\nEl IMC es un indicador general y no distingue entre grasa y masa muscular, por lo que debe interpretarse junto con el porcentaje de grasa corporal y la masa muscular.",
  OVERWEIGHT:
    "Tu IMC indica Sobrepeso.\n\nEsto significa que tu peso se encuentra por encima del rango considerado saludable para tu altura.\n\nEl IMC es un indicador general y no distingue entre grasa y masa muscular, por lo que debe interpretarse junto con el porcentaje de grasa corporal y la masa muscular.",
  OBESITY_I:
    "Tu IMC indica Obesidad grado I.\n\nEsto significa que tu peso se encuentra considerablemente por encima del rango considerado saludable para tu altura.\n\nEl IMC es un indicador general y no distingue entre grasa y masa muscular, por lo que debe interpretarse junto con el porcentaje de grasa corporal y la masa muscular.",
  OBESITY_II:
    "Tu IMC indica Obesidad grado II.\n\nEsto significa que tu peso se encuentra muy por encima del rango considerado saludable para tu altura, con mayor riesgo asociado para la salud.\n\nEl IMC es un indicador general y no distingue entre grasa y masa muscular, por lo que debe interpretarse junto con el porcentaje de grasa corporal y la masa muscular.",
  OBESITY_III:
    "Tu IMC indica Obesidad grado III.\n\nEsto significa que tu peso se encuentra muy por encima del rango considerado saludable para tu altura, con riesgo elevado asociado para la salud.\n\nEl IMC es un indicador general y no distingue entre grasa y masa muscular, por lo que debe interpretarse junto con el porcentaje de grasa corporal y la masa muscular.",
};

const RECOMMENDATION: Record<BmiCategory, string> = {
  VERY_LOW_WEIGHT: "El objetivo será evaluar la causa del bajo peso y diseñar un plan para aumentar peso de forma saludable, priorizando masa muscular.",
  SEVERE_LOW_WEIGHT: "El objetivo será aumentar progresivamente el peso corporal priorizando masa muscular sobre masa grasa.",
  MODERATE_LOW_WEIGHT: "El objetivo será aumentar levemente el peso corporal, priorizando masa muscular sobre masa grasa.",
  NORMAL: "El objetivo será mantener el peso actual, sosteniendo hábitos saludables de alimentación y actividad física.",
  OVERWEIGHT: "El objetivo será reducir progresivamente el porcentaje de grasa corporal manteniendo o aumentando la masa muscular.",
  OBESITY_I: "El objetivo será reducir el porcentaje de grasa corporal de forma sostenida, acompañado de actividad física regular.",
  OBESITY_II: "El objetivo será reducir el porcentaje de grasa corporal de forma sostenida y bajo seguimiento profesional cercano.",
  OBESITY_III: "El objetivo será reducir el porcentaje de grasa corporal de forma sostenida, con seguimiento profesional cercano y frecuente.",
};

const TOOLTIP =
  "El Índice de Masa Corporal es una relación entre el peso y la altura que permite estimar si una persona se encuentra dentro de un rango saludable.";

export function buildBmiPresentation(bmi: BodyMassIndex, weightKg: number, heightCm: number): MetricPresentation {
  const heightMeters = heightCm / 100;

  return {
    title: "Índice de Masa Corporal (IMC)",
    unit: "kg/m²",
    value: bmi.value,
    categoryLabel: CATEGORY_LABEL[bmi.category],
    color: CATEGORY_COLOR[bmi.category],
    zones: ZONES,
    scaleMin: SCALE_MIN,
    scaleMax: SCALE_MAX,
    interpretation: INTERPRETATION[bmi.category],
    recommendation: RECOMMENDATION[bmi.category],
    technicalDetails: [
      { label: "Peso utilizado", value: `${weightKg} kg` },
      { label: "Altura utilizada", value: `${heightCm} cm` },
      { label: "Fórmula aplicada", value: "peso / (talla en metros)²" },
      { label: "Resultado", value: `${weightKg} / (${heightMeters.toFixed(2)}²) = ${bmi.value} kg/m²` },
    ],
    tooltip: TOOLTIP,
  };
}
