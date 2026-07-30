import type { MuscleGoal, MuscleGoalStatus } from "@/lib/types";
import type { MetricZone, MuscleGoalComparisonRow, MuscleGoalPresentation } from "./types";

const COLOR_INCREASE = "#3b82f6";
const COLOR_MAINTAIN = "#22c55e";
const COLOR_CURRENT_MARKER = "#3b82f6";

const STATUS_LABEL: Record<MuscleGoalStatus, string> = {
  INCREASE: "💪 Aumentar masa muscular",
  MAINTAIN: "✅ Mantener masa muscular",
};

const STATUS_COLOR: Record<MuscleGoalStatus, string> = {
  INCREASE: COLOR_INCREASE,
  MAINTAIN: COLOR_MAINTAIN,
};

const GOAL_HEADLINE: Record<MuscleGoalStatus, string> = {
  INCREASE: "Incrementar masa muscular",
  MAINTAIN: "Mantener masa muscular",
};

const INTERPRETATION_HIGHLIGHT: Record<MuscleGoalStatus, string> = {
  INCREASE: "Tu masa muscular se encuentra por debajo del valor de referencia",
  MAINTAIN: "Tu masa muscular ya se encuentra dentro o por encima del valor de referencia",
};

const INTERPRETATION_BODY: Record<MuscleGoalStatus, string> = {
  INCREASE:
    "para una composición corporal saludable. Incrementarla progresivamente favorecerá un mayor metabolismo basal, más fuerza y una mejor salud metabólica.",
  MAINTAIN: "El objetivo será conservarla mientras disminuye la grasa corporal.",
};

const RECOMMENDATION: Record<MuscleGoalStatus, string> = {
  INCREASE:
    "Entrenamiento de fuerza, un consumo adecuado de proteínas y descanso suficiente favorecerán el aumento de masa muscular.",
  MAINTAIN:
    "Continuar con entrenamiento de fuerza y mantener el aporte proteico ayudará a preservar la masa muscular durante el descenso de grasa.",
};

const TOOLTIP =
  "La masa muscular de referencia es un valor estimado calculado a partir de la masa libre de grasa. Se utiliza como orientación para determinar si conviene aumentar o mantener la masa muscular durante el tratamiento. No representa un objetivo rígido ni un valor obligatorio.";

function round1(value: number): number {
  return Math.round(value * 10) / 10;
}

function buildZones(referenceMuscleMassKg: number, scaleMin: number, scaleMax: number): MetricZone[] {
  return [
    { key: "BELOW", label: "Baja", color: COLOR_INCREASE, min: scaleMin, max: referenceMuscleMassKg },
    { key: "ADEQUATE", label: "Adecuada", color: COLOR_MAINTAIN, min: referenceMuscleMassKg, max: scaleMax },
  ];
}

export function buildMuscleGoalPresentation(muscleGoal: MuscleGoal, fatFreeMassKg: number): MuscleGoalPresentation {
  const currentRounded = round1(muscleGoal.currentMuscleMassKg);
  const referenceRounded = round1(muscleGoal.targetMuscleMassKg);
  const increaseRounded = round1(muscleGoal.increaseNeededKg);
  const fatFreeMassRounded = round1(fatFreeMassKg);

  const span = Math.max(Math.abs(referenceRounded - currentRounded), referenceRounded * 0.25, 2);
  const scaleMin = Math.max(0, Math.min(currentRounded, referenceRounded) - span);
  const scaleMax = Math.max(currentRounded, referenceRounded) + span;

  const goalHeadline = GOAL_HEADLINE[muscleGoal.status];

  const comparisonRows: MuscleGoalComparisonRow[] = [
    {
      label: "Masa muscular",
      actual: `${currentRounded} kg`,
      reference: `${referenceRounded} kg`,
      change: muscleGoal.status === "INCREASE" ? `+${increaseRounded} kg` : "0 kg",
    },
    {
      label: "Masa libre de grasa",
      actual: `${fatFreeMassRounded} kg`,
      reference: `${fatFreeMassRounded} kg`,
      change: "0 kg",
    },
  ];

  return {
    title: "Objetivo Muscular",
    statusLabel: STATUS_LABEL[muscleGoal.status],
    color: STATUS_COLOR[muscleGoal.status],
    goalHeadline,
    goalSubtext: muscleGoal.status === "INCREASE" ? `Incremento estimado: +${increaseRounded} kg` : null,
    stats: [
      { label: "Masa muscular actual", value: `${currentRounded} kg` },
      { label: "Masa muscular de referencia", value: `${referenceRounded} kg` },
      { label: "Objetivo", value: goalHeadline },
    ],
    interpretationHighlight: INTERPRETATION_HIGHLIGHT[muscleGoal.status],
    interpretationBody: INTERPRETATION_BODY[muscleGoal.status],
    recommendation: RECOMMENDATION[muscleGoal.status],
    currentValue: currentRounded,
    referenceValue: referenceRounded,
    markerColor: COLOR_CURRENT_MARKER,
    zones: buildZones(referenceRounded, scaleMin, scaleMax),
    scaleMin,
    scaleMax,
    comparisonRows,
    technicalDetails: [
      { label: "Masa muscular actual", value: `${currentRounded} kg` },
      { label: "Masa muscular de referencia", value: `${referenceRounded} kg` },
      { label: "Fórmula (masa muscular actual)", value: `peso × % masa muscular / 100 = ${currentRounded} kg` },
      { label: "Fórmula (masa muscular de referencia)", value: `masa libre de grasa × 0.55 = ${referenceRounded} kg` },
    ],
    tooltip: TOOLTIP,
  };
}
