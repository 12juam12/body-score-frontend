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
  unit: string;
  value: number;
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

export type TargetWeightStep = {
  label: string;
  value: string;
};

export type TargetWeightPresentation = {
  title: string;
  subtitle: string;
  currentWeightKg: number;
  targetWeightKg: number;
  currentLabel: string;
  targetLabel: string;
  currentColor: string;
  targetColor: string;
  scaleMin: number;
  scaleMax: number;
  statusLabel: string;
  differenceMessage: string;
  steps: TargetWeightStep[];
  interpretation: string;
  recommendation: string;
  technicalDetails: MetricTechnicalDetail[];
  tooltip: string;
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
