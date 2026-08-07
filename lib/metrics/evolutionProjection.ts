import type { BodyCompositionGoal, BodyCompositionGoalStatus, EvolutionProjection } from "@/lib/types";
import type { EvolutionProjectionPresentation, EvolutionTimeEstimate } from "./types";

const WEEKS_PER_MONTH = 4.345;
const WEEKS_PER_YEAR = 52;

const CASE_MESSAGE: Record<BodyCompositionGoalStatus, (weeksLabel: string) => string> = {
  REDUCE: (weeksLabel) =>
    `Si mantenés un descenso promedio de 0,5 kg por semana, podrías alcanzar tu objetivo aproximadamente en ${weeksLabel}.`,
  INCREASE: (weeksLabel) =>
    `Si mantenés una ganancia promedio saludable de masa corporal, podrías alcanzar tu objetivo aproximadamente en ${weeksLabel}.`,
  MAINTAIN: () =>
    "Actualmente te encontrás muy próximo a tu objetivo de composición corporal. El objetivo será mantener los resultados obtenidos.",
};

const INTERPRETATION: Record<BodyCompositionGoalStatus, string> = {
  REDUCE:
    "El tiempo estimado supone un descenso promedio saludable de aproximadamente 0,5 kg por semana. La velocidad real dependerá de la adherencia al plan nutricional, el entrenamiento, el descanso y otros factores individuales.",
  MAINTAIN: "El objetivo principal será conservar la composición corporal alcanzada mediante hábitos saludables.",
  INCREASE:
    "El tiempo estimado considera una progresión gradual y saludable. La ganancia de masa muscular suele requerir constancia en el entrenamiento y una adecuada alimentación.",
};

const MOTIVATIONAL_MESSAGE: Record<BodyCompositionGoalStatus, string> = {
  REDUCE: "Los pequeños cambios sostenidos generan grandes resultados. La constancia será el factor más importante para alcanzar tu objetivo.",
  INCREASE: "Cada entrenamiento y cada comida cuentan. La constancia en el entrenamiento y la alimentación será clave para lograr tu objetivo.",
  MAINTAIN: "Mantener lo logrado también es un logro. Sostener tus hábitos saludables es la mejor forma de cuidar tu progreso.",
};

const TOOLTIP =
  "El tiempo estimado se calcula utilizando la diferencia entre el peso actual y el objetivo de composición corporal, considerando una velocidad promedio saludable de 0,5 kg por semana. Es una estimación orientativa y no una predicción exacta.";

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function signedKg(value: number): string {
  const rounded = round1(value);
  if (rounded > 0) return `+${rounded} kg`;
  if (rounded < 0) return `${rounded} kg`;
  return "0.0 kg";
}

function pluralize(count: number, singular: string, plural: string): string {
  return count === 1 ? singular : plural;
}

export function formatEstimatedTime(estimatedWeeks: number): EvolutionTimeEstimate {
  const roundedWeeks = Math.round(estimatedWeeks);

  if (roundedWeeks >= WEEKS_PER_YEAR) {
    const years = Math.floor(roundedWeeks / WEEKS_PER_YEAR);
    const remainderWeeks = roundedWeeks - years * WEEKS_PER_YEAR;
    const months = Math.round(remainderWeeks / WEEKS_PER_MONTH);
    const yearsLabel = `${years} ${pluralize(years, "año", "años")}`;
    const primary = months > 0 ? `${yearsLabel} y ${months} ${pluralize(months, "mes", "meses")}` : yearsLabel;
    return { primary, secondary: null };
  }

  const months = Math.round(roundedWeeks / WEEKS_PER_MONTH);
  return {
    primary: `${roundedWeeks} ${pluralize(roundedWeeks, "semana", "semanas")}`,
    secondary: months > 0 ? `≈ ${months} ${pluralize(months, "mes", "meses")}` : null,
  };
}

export function buildEvolutionProjectionPresentation(
  evolutionProjection: EvolutionProjection,
  bodyCompositionGoal: BodyCompositionGoal,
): EvolutionProjectionPresentation {
  const status = bodyCompositionGoal.status;
  const hasEstimate = status !== "MAINTAIN";
  const estimate = hasEstimate ? formatEstimatedTime(evolutionProjection.estimatedWeeks) : null;
  const weeksLabel = estimate ? estimate.primary : "";

  return {
    title: "Proyección de Evolución",
    currentWeightKg: round1(bodyCompositionGoal.currentWeightKg),
    targetWeightKg: round1(bodyCompositionGoal.targetWeightKg),
    differenceLabel: signedKg(bodyCompositionGoal.weightDifferenceKg),
    hasEstimate,
    estimate,
    caseMessage: CASE_MESSAGE[status](weeksLabel),
    interpretation: INTERPRETATION[status],
    motivationalMessage: MOTIVATIONAL_MESSAGE[status],
    tooltip: TOOLTIP,
  };
}
