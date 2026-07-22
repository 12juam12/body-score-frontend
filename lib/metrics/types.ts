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

export type MetricPresentation = {
  title: string;
  unit: string;
  value: number;
  // A classification badge + gauge are only shown when a metric can be
  // classified on its own (e.g. IMC). Metrics whose interpretation depends
  // on another metric (e.g. body fat mass depends on the expected range)
  // omit these and render as a plain value + interpretation card.
  categoryLabel?: string;
  color?: string;
  zones?: MetricZone[];
  scaleMin?: number;
  scaleMax?: number;
  interpretation: string;
  recommendation?: string;
  technicalDetails: MetricTechnicalDetail[];
  tooltip: string;
};

export type MetricRangePresentation = {
  title: string;
  unit: string;
  actualValue: number;
  minValue: number;
  maxValue: number;
  statusLabel: string;
  color: string;
  differenceLabel: string;
  zones: MetricZone[];
  scaleMin: number;
  scaleMax: number;
  interpretation: string;
  recommendation: string;
  technicalDetails: MetricTechnicalDetail[];
  tooltip: string;
};
