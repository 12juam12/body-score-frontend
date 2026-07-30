import type { TargetWeight, TargetWeightStatus } from "@/lib/types";
import type { TargetWeightPresentation } from "./types";

const COLOR_TARGET = "#0d9488";
const COLOR_ABOVE = "#f97316";
const COLOR_NEAR = "#22c55e";
const COLOR_BELOW = "#3b82f6";

const STATUS_LABEL: Record<TargetWeightStatus, string> = {
  ABOVE_TARGET: "Por encima del objetivo",
  NEAR_TARGET: "Cerca del objetivo",
  BELOW_TARGET: "Por debajo del objetivo",
};

const STATUS_COLOR: Record<TargetWeightStatus, string> = {
  ABOVE_TARGET: COLOR_ABOVE,
  NEAR_TARGET: COLOR_NEAR,
  BELOW_TARGET: COLOR_BELOW,
};

const INTERPRETATION: Record<TargetWeightStatus, (targetWeightKg: number) => string> = {
  ABOVE_TARGET: (targetWeightKg) =>
    `Tu peso actual es superior al peso estimado para una composición corporal saludable. Reduciendo grasa corporal y manteniendo tu masa muscular podrías alcanzar aproximadamente los ${targetWeightKg} kg.`,
  NEAR_TARGET: () =>
    "Tu peso actual se encuentra muy próximo al peso objetivo. El foco del tratamiento será mantener la composición corporal.",
  BELOW_TARGET: () =>
    "Tu peso actual es inferior al peso objetivo estimado. Se recomienda evaluar si existe una adecuada masa muscular y un correcto estado nutricional.",
};

const RECOMMENDATION: Record<TargetWeightStatus, (targetWeightKg: number) => string> = {
  ABOVE_TARGET: (targetWeightKg) =>
    `El objetivo será disminuir progresivamente la grasa corporal preservando toda la masa muscular posible hasta alcanzar aproximadamente los ${targetWeightKg} kg.`,
  NEAR_TARGET: () => "Se recomienda mantener el peso actual y continuar fortaleciendo la masa muscular.",
  BELOW_TARGET: () => "Podría ser conveniente aumentar masa muscular antes que reducir peso.",
};

const DIFFERENCE_MESSAGE: Record<TargetWeightStatus, (differenceKg: number) => string> = {
  ABOVE_TARGET: (differenceKg) => `Faltan aproximadamente ${differenceKg} kg para alcanzar el peso objetivo.`,
  NEAR_TARGET: () => "Te encontrás muy cerca de tu peso objetivo.",
  BELOW_TARGET: () => "Actualmente estás por debajo del peso objetivo estimado.",
};

const TOOLTIP =
  "El Peso Objetivo representa el peso corporal estimado si mantuvieras toda tu masa libre de grasa actual y alcanzaras un porcentaje de grasa corporal saludable. A diferencia del IMC, este cálculo considera tu composición corporal y ofrece un objetivo mucho más personalizado.";

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

export function buildTargetWeightPresentation(
  targetWeight: TargetWeight,
  currentWeightKg: number,
  fatFreeMassKg: number,
): TargetWeightPresentation {
  const roundedTarget = round1(targetWeight.targetWeightKg);
  const roundedDifference = round1(Math.abs(targetWeight.differenceKg));
  const span = Math.abs(targetWeight.targetWeightKg - currentWeightKg) || 1;
  const margin = Math.max(span * 0.4, 3);

  return {
    title: "Peso Objetivo",
    subtitle: "Peso estimado manteniendo toda tu masa muscular",
    currentWeightKg: round1(currentWeightKg),
    targetWeightKg: roundedTarget,
    currentLabel: "Peso Actual",
    targetLabel: "Peso Objetivo",
    currentColor: STATUS_COLOR[targetWeight.status],
    targetColor: COLOR_TARGET,
    scaleMin: Math.min(targetWeight.targetWeightKg, currentWeightKg) - margin,
    scaleMax: Math.max(targetWeight.targetWeightKg, currentWeightKg) + margin,
    statusLabel: STATUS_LABEL[targetWeight.status],
    differenceMessage: DIFFERENCE_MESSAGE[targetWeight.status](roundedDifference),
    steps: [
      { label: "Masa Libre de Grasa", value: `${round1(fatFreeMassKg)} kg` },
      { label: "Grasa objetivo", value: `${targetWeight.targetFatPercentage} %` },
      { label: "Peso objetivo", value: `${roundedTarget} kg` },
    ],
    interpretation: INTERPRETATION[targetWeight.status](roundedTarget),
    recommendation: RECOMMENDATION[targetWeight.status](roundedTarget),
    technicalDetails: [
      { label: "Masa Libre de Grasa", value: `${round1(fatFreeMassKg)} kg` },
      { label: "Grasa objetivo", value: `${targetWeight.targetFatPercentage} %` },
      {
        label: "Fórmula aplicada",
        value: `${round1(fatFreeMassKg)} / (1 - ${targetWeight.targetFatPercentage / 100}) = ${roundedTarget} kg`,
      },
    ],
    tooltip: TOOLTIP,
  };
}
