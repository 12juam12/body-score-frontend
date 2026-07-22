import type { BodyFatMass } from "@/lib/types";
import type { MetricPresentation } from "./types";

const TOOLTIP =
  "Es la cantidad total de grasa presente en el cuerpo, expresada en kilogramos. Permite conocer cuántos kilos del peso corporal corresponden al tejido adiposo.";

export function buildBodyFatMassPresentation(
  bodyFatMass: BodyFatMass,
  weightKg: number,
  bodyFatPercentage: number,
): MetricPresentation {
  const roundedValue = Math.round(bodyFatMass.valueKg * 10) / 10;

  return {
    title: "Masa de Grasa Corporal",
    unit: "kg",
    value: roundedValue,
    interpretation: `De los ${weightKg} kg de peso corporal total, aproximadamente ${roundedValue} kg corresponden a masa grasa. Este valor se interpreta comparándolo con el rango de masa grasa esperada según tu peso y sexo.`,
    technicalDetails: [
      { label: "Peso utilizado", value: `${weightKg} kg` },
      { label: "Porcentaje de grasa utilizado", value: `${bodyFatPercentage} %` },
      { label: "Fórmula aplicada", value: `${weightKg} × ${bodyFatPercentage} / 100 = ${roundedValue} kg` },
    ],
    tooltip: TOOLTIP,
  };
}
