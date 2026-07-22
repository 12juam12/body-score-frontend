import type { CompositionPresentation } from "@/lib/metrics/fatFreeMass";

type CompositionMetricCardProps = {
  metric: CompositionPresentation;
};

export function CompositionMetricCard({ metric }: CompositionMetricCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
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
        {metric.mainValue} <span className="text-sm font-normal text-muted">{metric.unit}</span>
      </p>
      <p className="text-xs text-muted">{metric.caption}</p>

      <div className="mt-5">
        <div className="flex h-3 w-full overflow-hidden rounded-full">
          {metric.segments.map((segment) => (
            <div
              key={segment.key}
              title={segment.label}
              style={{ width: `${segment.percentage}%`, background: segment.color }}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-xs">
          {metric.segments.map((segment) => (
            <div key={segment.key} className="flex items-center gap-1.5">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: segment.color }} />
              <span className="text-muted">{segment.label}:</span>
              <span className="font-medium text-foreground">
                {segment.valueKg} kg ({segment.percentage}%)
              </span>
            </div>
          ))}
        </div>
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
