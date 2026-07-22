import type { MetricPresentation } from "@/lib/metrics/types";
import { MetricGauge } from "./MetricGauge";

type MetricCardProps = {
  metric: MetricPresentation;
};

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-foreground">{metric.title}</h3>
            <span className="group relative inline-flex">
              <span className="flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-border text-[10px] text-muted">
                ?
              </span>
              <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-secondary px-3 py-2 text-xs leading-snug text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                {metric.tooltip}
              </span>
            </span>
          </div>
          <p className="mt-1 text-2xl font-semibold text-foreground">
            {metric.value} <span className="text-sm font-normal text-muted">{metric.unit}</span>
          </p>
        </div>
        <span
          className="shrink-0 rounded-full px-3 py-1 text-xs font-medium text-white"
          style={{ background: metric.color }}
        >
          {metric.categoryLabel}
        </span>
      </div>

      <div className="mt-5">
        <MetricGauge zones={metric.zones} scaleMin={metric.scaleMin} scaleMax={metric.scaleMax} value={metric.value} />
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <p className="whitespace-pre-line text-foreground/80">{metric.interpretation}</p>
        <p className="rounded-xl bg-primary-soft px-3 py-2 text-primary-dark">{metric.recommendation}</p>
      </div>

      <details className="mt-4 text-xs text-muted">
        <summary className="cursor-pointer select-none">Ver detalle técnico</summary>
        <ul className="mt-2 space-y-1">
          {metric.technicalDetails.map((detail) => (
            <li key={detail.label} className="flex justify-between gap-4">
              <span>{detail.label}</span>
              <span className="text-right text-foreground">{detail.value}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
