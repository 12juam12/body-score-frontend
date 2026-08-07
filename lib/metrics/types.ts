export type MetricZone = {
  key: string;
  label: string;
  color: string;
  min: number;
  max: number;
};

export type MetricTechnicalDetail = {
  label: string;
  value: string;
};

export type MetricWarning = {
  title: string;
  message: string;
};

export type MetricPresentation = {
  title: string;
  subtitle?: string;
  unit: string;
  value: number;
  gaugeValue?: number;
  categoryLabel?: string;
  color?: string;
  zones?: MetricZone[];
  scaleMin?: number;
  scaleMax?: number;
  gaugeSmooth?: boolean;
  warning?: MetricWarning;
  interpretation: string;
  recommendation?: string;
  technicalDetails: MetricTechnicalDetail[];
  tooltip: string;
};

export type BodyCompositionGoalStat = {
  label: string;
  value: string;
};

export type BodyCompositionGoalComposition = {
  fatFreeMassKg: number;
  fatFreePercentage: number;
  fatMassKg: number;
  fatPercentage: number;
};

export type BodyCompositionGoalComparisonRow = {
  label: string;
  actual: string;
  target: string;
  change: string;
};

export type BodyCompositionGoalPresentation = {
  title: string;
  statusLabel: string;
  color: string;
  message: string;
  stats: BodyCompositionGoalStat[];
  current: BodyCompositionGoalComposition;
  target: BodyCompositionGoalComposition;
  comparisonRows: BodyCompositionGoalComparisonRow[];
  comparisonNote: string;
  clinicalNote: string;
  technicalDetails: MetricTechnicalDetail[];
  tooltip: string;
};

export type MuscleGoalStat = {
  label: string;
  value: string;
};

export type MuscleGoalComparisonRow = {
  label: string;
  actual: string;
  reference: string;
  change: string;
};

export type MuscleGoalPresentation = {
  title: string;
  statusLabel: string;
  color: string;
  goalHeadline: string;
  goalSubtext: string | null;
  stats: MuscleGoalStat[];
  interpretationHighlight: string;
  interpretationBody: string;
  recommendation: string;
  currentValue: number;
  referenceValue: number;
  markerColor: string;
  zones: MetricZone[];
  scaleMin: number;
  scaleMax: number;
  comparisonRows: MuscleGoalComparisonRow[];
  technicalDetails: MetricTechnicalDetail[];
  tooltip: string;
};

export type WeightComparisonStat = {
  label: string;
  value: string;
};

export type WeightComparisonPoint = {
  value: number;
  label: string;
  color: string;
};

export type WeightComparisonRow = {
  method: string;
  result: string;
};

export type WeightComparisonPresentation = {
  title: string;
  stats: WeightComparisonStat[];
  points: WeightComparisonPoint[];
  scaleMin: number;
  scaleMax: number;
  explanation: string;
  caseMessage: string;
  comparisonRows: WeightComparisonRow[];
  tooltip: string;
};

export type MetabolicRiskScoreRow = {
  label: string;
  value: string;
  score: number;
};

export type MetabolicRiskPresentation = {
  title: string;
  statusLabel: string;
  color: string;
  totalScore: number;
  maxScore: number;
  zones: MetricZone[];
  scaleMin: number;
  scaleMax: number;
  scoreRows: MetabolicRiskScoreRow[];
  interpretation: string;
  recommendation: string;
  technicalDetails: MetricTechnicalDetail[];
  tooltip: string;
};

export type EvolutionTimeEstimate = {
  primary: string;
  secondary: string | null;
};

export type EvolutionProjectionPresentation = {
  title: string;
  currentWeightKg: number;
  targetWeightKg: number;
  differenceLabel: string;
  hasEstimate: boolean;
  estimate: EvolutionTimeEstimate | null;
  caseMessage: string;
  interpretation: string;
  motivationalMessage: string;
  tooltip: string;
};

export type EvolutionHistoryPoint = {
  date: string;
  value: number;
};

export type EvolutionHistorySeries = {
  key: string;
  label: string;
  color: string;
  unit: string;
  points: EvolutionHistoryPoint[];
};

export type EvolutionHistoryPresentation = {
  hasHistory: boolean;
  series: EvolutionHistorySeries[];
  emptyMessage: string;
};

export type MetricRangePresentation = {
  title: string;
  subtitle?: string;
  unit: string;
  actualValue: number;
  minValue: number;
  maxValue: number;
  statusLabel: string;
  color: string;
  differenceLabel: string;
  actualLabel?: string;
  rangeLabel?: string;
  differenceStatLabel?: string;
  zones: MetricZone[];
  scaleMin: number;
  scaleMax: number;
  interpretation: string;
  recommendation: string;
  technicalDetails: MetricTechnicalDetail[];
  tooltip: string;
};
