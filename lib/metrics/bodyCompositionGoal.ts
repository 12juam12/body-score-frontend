import type { BodyCompositionGoal, BodyCompositionGoalStatus } from "@/lib/types";
import type { BodyCompositionGoalComparisonRow, BodyCompositionGoalPresentation } from "./types";

const COLOR_REDUCE_HIGH = "#ef4444";
const COLOR_REDUCE_LOW = "#f97316";
const COLOR_MAINTAIN = "#22c55e";
const COLOR_INCREASE = "#3b82f6";

const REDUCE_HIGH_THRESHOLD_KG = 15;

const STATUS_LABEL: Record<BodyCompositionGoalStatus, string> = {
  REDUCE: "Reducir grasa",
  MAINTAIN: "Mantener",
  INCREASE: "Aumentar grasa",
};

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function signedKg(value: number): string {
  const rounded = round1(value);
  if (rounded > 0) return `+${rounded} kg`;
  if (rounded < 0) return `${rounded} kg`;
  return "0.0 kg";
}

function signedPoints(value: number): string {
  const rounded = round1(value);
  if (rounded > 0) return `+${rounded} puntos`;
  if (rounded < 0) return `${rounded} puntos`;
  return "0.0 puntos";
}

function buildMessage(goal: BodyCompositionGoal, targetWeightKg: number, targetFatMassKg: number, absoluteDifference: number): string {
  if (goal.status === "MAINTAIN") {
    return "Tu composición corporal actual ya se encuentra muy próxima al objetivo estimado.";
  }

  const verb = goal.status === "INCREASE" ? "aumentar" : "reducir";
  return `Para alcanzar una composición corporal estimada de ${goal.targetFatPercentage} % de grasa, tu peso objetivo sería de ${round1(targetWeightKg)} kg. Esto implica ${verb} aproximadamente ${absoluteDifference} kg de grasa, procurando mantener los ${round1(goal.fatFreeMassKg)} kg de masa libre de grasa actuales.`;
}

export function buildBodyCompositionGoalPresentation(goal: BodyCompositionGoal): BodyCompositionGoalPresentation {
  const absoluteDifference = round1(Math.abs(goal.fatControlKg));

  const color =
    goal.status === "MAINTAIN"
      ? COLOR_MAINTAIN
      : goal.status === "INCREASE"
        ? COLOR_INCREASE
        : absoluteDifference > REDUCE_HIGH_THRESHOLD_KG
          ? COLOR_REDUCE_HIGH
          : COLOR_REDUCE_LOW;

  const comparisonRows: BodyCompositionGoalComparisonRow[] = [
    {
      label: "Peso corporal",
      actual: `${round1(goal.currentWeightKg)} kg`,
      target: `${round1(goal.targetWeightKg)} kg`,
      change: signedKg(goal.weightDifferenceKg),
    },
    {
      label: "Masa grasa",
      actual: `${round1(goal.currentFatMassKg)} kg`,
      target: `${round1(goal.targetFatMassKg)} kg`,
      change: signedKg(goal.fatControlKg),
    },
    {
      label: "Masa libre de grasa",
      actual: `${round1(goal.fatFreeMassKg)} kg`,
      target: `${round1(goal.fatFreeMassKg)} kg`,
      change: "0.0 kg",
    },
    {
      label: "Porcentaje de grasa",
      actual: `${round1(goal.currentFatPercentage)} %`,
      target: `${goal.targetFatPercentage} %`,
      change: signedPoints(goal.targetFatPercentage - goal.currentFatPercentage),
    },
  ];

  return {
    title: "Objetivo de Composición Corporal",
    statusLabel: STATUS_LABEL[goal.status],
    color,
    message: buildMessage(goal, goal.targetWeightKg, goal.targetFatMassKg, absoluteDifference),
    stats: [
      { label: "Peso actual", value: `${round1(goal.currentWeightKg)} kg` },
      { label: "Peso objetivo", value: `${round1(goal.targetWeightKg)} kg` },
      { label: "Diferencia de peso", value: signedKg(goal.weightDifferenceKg) },
      { label: "Masa grasa actual", value: `${round1(goal.currentFatMassKg)} kg` },
      { label: "Masa grasa objetivo", value: `${round1(goal.targetFatMassKg)} kg` },
      { label: "Control de grasa", value: signedKg(goal.fatControlKg) },
      { label: "Masa libre de grasa a preservar", value: `${round1(goal.fatFreeMassKg)} kg` },
      { label: "Grasa actual", value: `${round1(goal.currentFatPercentage)} %` },
      { label: "Grasa objetivo", value: `${goal.targetFatPercentage} %` },
    ],
    current: {
      fatFreeMassKg: round1(goal.fatFreeMassKg),
      fatFreePercentage: round1((goal.fatFreeMassKg / goal.currentWeightKg) * 100),
      fatMassKg: round1(goal.currentFatMassKg),
      fatPercentage: round1((goal.currentFatMassKg / goal.currentWeightKg) * 100),
    },
    target: {
      fatFreeMassKg: round1(goal.fatFreeMassKg),
      fatFreePercentage: round1((goal.fatFreeMassKg / goal.targetWeightKg) * 100),
      fatMassKg: round1(goal.targetFatMassKg),
      fatPercentage: goal.targetFatPercentage,
    },
    comparisonRows,
    comparisonNote: "El objetivo es estimativo y supone que se mantiene toda la masa libre de grasa durante el proceso.",
    clinicalNote:
      "Este objetivo es estimativo y supone que la masa libre de grasa se mantiene estable durante el proceso. El profesional podrá modificar el porcentaje de grasa objetivo según la edad, el estado clínico y los objetivos del paciente.",
    technicalDetails: [
      { label: "Masa libre de grasa", value: `${round1(goal.fatFreeMassKg)} kg` },
      { label: "Porcentaje de grasa objetivo", value: `${goal.targetFatPercentage} %` },
      {
        label: "Fórmula (peso objetivo)",
        value: `${round1(goal.fatFreeMassKg)} / (1 - ${goal.targetFatPercentage / 100}) = ${round1(goal.targetWeightKg)} kg`,
      },
      {
        label: "Fórmula (masa grasa objetivo)",
        value: `${round1(goal.targetWeightKg)} × ${goal.targetFatPercentage / 100} = ${round1(goal.targetFatMassKg)} kg`,
      },
      {
        label: "Fórmula (control de grasa)",
        value: `${round1(goal.targetFatMassKg)} − ${round1(goal.currentFatMassKg)} = ${signedKg(goal.fatControlKg)}`,
      },
    ],
    tooltip:
      "El Objetivo de Composición Corporal estima tu peso objetivo y cuántos kilogramos de grasa deberías reducir, mantener o aumentar, asumiendo que se conserva toda tu masa libre de grasa actual y se alcanza un porcentaje de grasa corporal saludable según tu sexo.",
  };
}
