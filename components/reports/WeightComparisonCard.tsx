import type { WeightComparisonPresentation } from "@/lib/metrics/types";
import { MultiPointGauge } from "./MultiPointGauge";

type WeightComparisonCardProps = {
  metric: WeightComparisonPresentation;
};

export function WeightComparisonCard({ metric }: WeightComparisonCardProps) {
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

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {metric.stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-[11px] uppercase tracking-wide text-muted">{stat.label}</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <MultiPointGauge scaleMin={metric.scaleMin} scaleMax={metric.scaleMax} points={metric.points} />
      </div>

      <div className="mt-5 space-y-3 text-sm">
        <p className="text-foreground/80">{metric.explanation}</p>
        <p className="rounded-xl bg-primary-soft px-3 py-2 text-primary-dark">{metric.caseMessage}</p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-muted">
              <th className="pb-2 font-medium">Método</th>
              <th className="pb-2 text-right font-medium">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {metric.comparisonRows.map((row) => (
              <tr key={row.method} className="border-t border-border">
                <td className="py-1.5 text-foreground">{row.method}</td>
                <td className="py-1.5 text-right text-foreground">{row.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
