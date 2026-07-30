import type { MuscleGoalPresentation } from "@/lib/metrics/types";
import { MetricGauge } from "./MetricGauge";

const COLOR_CURRENT_MARKER = "#3b82f6";
const COLOR_ADEQUATE_ZONE = "#22c55e";

type MuscleGoalCardProps = {
  metric: MuscleGoalPresentation;
};

export function MuscleGoalCard({ metric }: MuscleGoalCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
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
        <span className="shrink-0 rounded-full px-3 py-1 text-xs font-medium text-white" style={{ background: metric.color }}>
          {metric.statusLabel}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {metric.stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-[11px] uppercase tracking-wide text-muted">{stat.label}</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {metric.goalSubtext ? <p className="mt-2 text-xs text-muted">{metric.goalSubtext}</p> : null}

      <div className="mt-5">
        <MetricGauge
          zones={metric.zones}
          scaleMin={metric.scaleMin}
          scaleMax={metric.scaleMax}
          value={metric.currentValue}
          markerColor={metric.markerColor}
          boundaryMarkers={[metric.referenceValue]}
        />
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: COLOR_CURRENT_MARKER }} />
            <span className="text-muted">Masa muscular actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: COLOR_ADEQUATE_ZONE }} />
            <span className="text-muted">Zona adecuada</span>
          </div>
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <p className="text-foreground/80">
          <span className="font-semibold text-foreground">{metric.interpretationHighlight}</span>{" "}
          {metric.interpretationBody}
        </p>
        <p className="rounded-xl bg-primary-soft px-3 py-2 text-primary-dark">{metric.recommendation}</p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-muted">
              <th className="pb-2 font-medium">Indicador</th>
              <th className="pb-2 text-right font-medium">Actual</th>
              <th className="pb-2 text-right font-medium">Referencia</th>
              <th className="pb-2 text-right font-medium">Cambio</th>
            </tr>
          </thead>
          <tbody>
            {metric.comparisonRows.map((row) => (
              <tr key={row.label} className="border-t border-border">
                <td className="py-1.5 text-foreground">{row.label}</td>
                <td className="py-1.5 text-right text-foreground">{row.actual}</td>
                <td className="py-1.5 text-right text-foreground">{row.reference}</td>
                <td className="py-1.5 text-right text-foreground">{row.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
