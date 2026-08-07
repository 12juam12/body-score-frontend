import type { MetabolicRiskPresentation } from "@/lib/metrics/types";
import { MetricGauge } from "./MetricGauge";

type MetabolicRiskCardProps = {
  metric: MetabolicRiskPresentation;
};

export function MetabolicRiskCard({ metric }: MetabolicRiskCardProps) {
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

      <p className="mt-4 text-sm text-muted">
        Puntaje total: <span className="font-semibold text-foreground">{metric.totalScore}</span> / {metric.maxScore}
      </p>

      <div className="mt-3">
        <MetricGauge zones={metric.zones} scaleMin={metric.scaleMin} scaleMax={metric.scaleMax} value={metric.totalScore} />
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <p className="text-foreground/80">{metric.interpretation}</p>
        <p className="rounded-xl bg-primary-soft px-3 py-2 text-primary-dark">{metric.recommendation}</p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-muted">
              <th className="pb-2 font-medium">Indicador</th>
              <th className="pb-2 text-right font-medium">Valor</th>
              <th className="pb-2 text-right font-medium">Puntaje</th>
            </tr>
          </thead>
          <tbody>
            {metric.scoreRows.map((row) => (
              <tr key={row.label} className="border-t border-border">
                <td className="py-1.5 text-foreground">{row.label}</td>
                <td className="py-1.5 text-right text-foreground">{row.value}</td>
                <td className="py-1.5 text-right text-foreground">{row.score}</td>
              </tr>
            ))}
            <tr className="border-t border-border font-semibold">
              <td className="py-1.5 text-foreground">Total</td>
              <td className="py-1.5 text-right text-foreground"></td>
              <td className="py-1.5 text-right text-foreground">{metric.totalScore}</td>
            </tr>
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
