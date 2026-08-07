import type { BodyWater, BodyWaterStatus } from "@/lib/types";
import type { MetricPresentation, MetricZone } from "./types";

const COLOR_VERY_LOW = "#ef4444";
const COLOR_SLIGHTLY_LOW = "#eab308";
const COLOR_NORMAL = "#22c55e";
const COLOR_HIGH = "#38bdf8";

const SLIGHTLY_LOW_TOLERANCE_POINTS = 2;
const SCALE_MARGIN_POINTS = 10;

const CATEGORY_LABEL: Record<BodyWaterStatus, string> = {
  VERY_LOW: "Muy bajo",
  SLIGHTLY_LOW: "Levemente bajo",
  NORMAL: "Normal",
  HIGH: "Elevado",
};

const CATEGORY_COLOR: Record<BodyWaterStatus, string> = {
  VERY_LOW: COLOR_VERY_LOW,
  SLIGHTLY_LOW: COLOR_SLIGHTLY_LOW,
  NORMAL: COLOR_NORMAL,
  HIGH: COLOR_HIGH,
};

const INTERPRETATION: Record<BodyWaterStatus, string> = {
  VERY_LOW:
    "El porcentaje de agua corporal se encuentra por debajo del rango esperado. Esto puede relacionarse con un exceso de grasa corporal, un bajo nivel de hidratación o alteraciones en la composición corporal.",
  SLIGHTLY_LOW:
    "El porcentaje de agua corporal es ligeramente inferior al esperado. Mejorar la composición corporal y mantener una adecuada hidratación puede contribuir a normalizar este indicador.",
  NORMAL:
    "El porcentaje de agua corporal se encuentra dentro del rango esperado para tu sexo. Esto indica una adecuada proporción de agua en relación con tu composición corporal.",
  HIGH: "El porcentaje de agua corporal es superior al rango habitual. En personas con una elevada masa muscular este resultado puede ser completamente normal.",
};

const RECOMMENDATION: Record<BodyWaterStatus, string> = {
  VERY_LOW:
    "Mantener una adecuada hidratación diaria, mejorar la composición corporal reduciendo el exceso de grasa, priorizar alimentos ricos en agua (frutas y verduras) y controlar nuevamente la composición corporal en futuras evaluaciones.",
  SLIGHTLY_LOW:
    "Mantener una adecuada hidratación diaria, mejorar la composición corporal reduciendo el exceso de grasa, priorizar alimentos ricos en agua (frutas y verduras) y controlar nuevamente la composición corporal en futuras evaluaciones.",
  NORMAL: "Mantener los hábitos actuales de hidratación y continuar con controles periódicos.",
  HIGH: "No se requieren intervenciones específicas. Este resultado suele observarse en personas con buena masa muscular y una adecuada composición corporal.",
};

const TOOLTIP =
  "El Agua Corporal Total representa la cantidad de agua contenida en el organismo. Se estima a partir de la Masa Libre de Grasa, ya que aproximadamente el 73 % de ella está formada por agua. Un porcentaje adecuado suele reflejar una buena composición corporal y un correcto estado de hidratación.";

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function buildZones(minPercentage: number, maxPercentage: number, scaleMin: number, scaleMax: number): MetricZone[] {
  return [
    { key: "VERY_LOW", label: "Muy bajo", color: COLOR_VERY_LOW, min: scaleMin, max: minPercentage - SLIGHTLY_LOW_TOLERANCE_POINTS },
    {
      key: "SLIGHTLY_LOW",
      label: "Bajo",
      color: COLOR_SLIGHTLY_LOW,
      min: minPercentage - SLIGHTLY_LOW_TOLERANCE_POINTS,
      max: minPercentage,
    },
    { key: "NORMAL", label: "Normal", color: COLOR_NORMAL, min: minPercentage, max: maxPercentage },
    { key: "HIGH", label: "Alto", color: COLOR_HIGH, min: maxPercentage, max: scaleMax },
  ];
}

export function buildBodyWaterPresentation(bodyWater: BodyWater): MetricPresentation {
  const volumeRounded = round1(bodyWater.volumeLiters);
  const percentageRounded = round1(bodyWater.percentage);

  const scaleMin = bodyWater.minPercentage - SCALE_MARGIN_POINTS;
  const scaleMax = bodyWater.maxPercentage + SCALE_MARGIN_POINTS;

  return {
    title: "Agua Corporal Total",
    subtitle: `${percentageRounded} % del peso corporal`,
    unit: "L",
    value: volumeRounded,
    gaugeValue: percentageRounded,
    categoryLabel: CATEGORY_LABEL[bodyWater.status],
    color: CATEGORY_COLOR[bodyWater.status],
    zones: buildZones(bodyWater.minPercentage, bodyWater.maxPercentage, scaleMin, scaleMax),
    scaleMin,
    scaleMax,
    interpretation: INTERPRETATION[bodyWater.status],
    recommendation: RECOMMENDATION[bodyWater.status],
    technicalDetails: [
      { label: "Agua corporal total", value: `${volumeRounded} L` },
      { label: "Porcentaje de agua corporal", value: `${percentageRounded} %` },
      { label: "Rango esperado", value: `${bodyWater.minPercentage}–${bodyWater.maxPercentage} %` },
      { label: "Fórmula (agua corporal)", value: `masa libre de grasa × 0.73 = ${volumeRounded} L` },
      { label: "Fórmula (porcentaje)", value: `${volumeRounded} / peso × 100 = ${percentageRounded} %` },
    ],
    tooltip: TOOLTIP,
  };
}
