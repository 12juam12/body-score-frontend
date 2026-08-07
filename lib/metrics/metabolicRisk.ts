import type { MetabolicRisk, MetabolicRiskLevel } from "@/lib/types";
import type { MetabolicRiskPresentation, MetricZone } from "./types";

const SCALE_MIN = 0;
const SCALE_MAX = 8;

const COLOR_LOW = "#22c55e";
const COLOR_MODERATE = "#f59e0b";
const COLOR_HIGH = "#ef4444";

const ZONES: MetricZone[] = [
  { key: "LOW", label: "Bajo", color: COLOR_LOW, min: SCALE_MIN, max: 3 },
  { key: "MODERATE", label: "Moderado", color: COLOR_MODERATE, min: 3, max: 6 },
  { key: "HIGH", label: "Alto", color: COLOR_HIGH, min: 6, max: SCALE_MAX },
];

const STATUS_LABEL: Record<MetabolicRiskLevel, string> = {
  LOW: "Riesgo Bajo",
  MODERATE: "Riesgo Moderado",
  HIGH: "Riesgo Alto",
};

const STATUS_COLOR: Record<MetabolicRiskLevel, string> = {
  LOW: COLOR_LOW,
  MODERATE: COLOR_MODERATE,
  HIGH: COLOR_HIGH,
};

const INTERPRETATION: Record<MetabolicRiskLevel, string> = {
  LOW: "El conjunto de indicadores antropométricos (IMC, cintura, relación cintura-cadera y grasa visceral) se encuentra dentro de rangos saludables, lo que refleja un bajo riesgo metabólico y cardiovascular.",
  MODERATE:
    "Uno o más indicadores antropométricos se encuentran fuera del rango óptimo. Esto representa un riesgo metabólico moderado que conviene abordar antes de que progrese.",
  HIGH: "Varios indicadores antropométricos se encuentran significativamente por encima del rango saludable, lo que representa un riesgo metabólico y cardiovascular elevado que requiere atención prioritaria.",
};

const RECOMMENDATION: Record<MetabolicRiskLevel, string> = {
  LOW: "Mantener los hábitos alimentarios y de actividad física actuales para conservar este nivel de riesgo.",
  MODERATE:
    "Priorizar la reducción de grasa abdominal y visceral mediante un plan nutricional ajustado y actividad física regular, revisando la evolución de estos indicadores en los próximos informes.",
  HIGH: "Se recomienda un abordaje nutricional prioritario enfocado en la reducción de grasa abdominal y visceral, junto con seguimiento médico si corresponde.",
};

const TOOLTIP =
  "Indicador compuesto que resume el riesgo metabólico y cardiovascular combinando IMC, circunferencia de cintura, relación cintura-cadera y grasa visceral. Cada indicador aporta una puntuación según su rango, y la suma total clasifica el riesgo en bajo, moderado o alto.";

export function buildMetabolicRiskPresentation(
  metabolicRisk: MetabolicRisk,
  bmi: number,
  waistCm: number,
  waistHipRatio: number,
  visceralFatLevel: number,
): MetabolicRiskPresentation {
  return {
    title: "Semáforo de Riesgo Metabólico",
    statusLabel: STATUS_LABEL[metabolicRisk.level],
    color: STATUS_COLOR[metabolicRisk.level],
    totalScore: metabolicRisk.totalScore,
    maxScore: SCALE_MAX,
    zones: ZONES,
    scaleMin: SCALE_MIN,
    scaleMax: SCALE_MAX,
    scoreRows: [
      { label: "IMC", value: `${bmi} kg/m²`, score: metabolicRisk.bmiScore },
      { label: "Circunferencia de cintura", value: `${waistCm} cm`, score: metabolicRisk.waistScore },
      { label: "Índice cintura-cadera", value: `${waistHipRatio}`, score: metabolicRisk.waistHipRatioScore },
      { label: "Grasa visceral", value: `${visceralFatLevel}`, score: metabolicRisk.visceralFatScore },
    ],
    interpretation: INTERPRETATION[metabolicRisk.level],
    recommendation: RECOMMENDATION[metabolicRisk.level],
    technicalDetails: [
      { label: "Puntaje total", value: `${metabolicRisk.totalScore} / ${SCALE_MAX}` },
      { label: "Clasificación", value: STATUS_LABEL[metabolicRisk.level] },
    ],
    tooltip: TOOLTIP,
  };
}
