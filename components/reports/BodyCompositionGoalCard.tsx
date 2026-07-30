import type { BodyCompositionGoalComposition, BodyCompositionGoalPresentation } from "@/lib/metrics/types";

const COLOR_FAT_FREE = "#0d9488";
const COLOR_FAT = "#f59e0b";

type BodyCompositionGoalCardProps = {
  metric: BodyCompositionGoalPresentation;
};

function CompositionBar({ label, composition }: { label: string; composition: BodyCompositionGoalComposition }) {
  return (
    <div>
      <p className="mb-1 text-[11px] uppercase tracking-wide text-muted">{label}</p>
      <div className="flex h-3 w-full overflow-hidden rounded-full">
        <div style={{ width: `${composition.fatFreePercentage}%`, background: COLOR_FAT_FREE }} title="Masa libre de grasa" />
        <div style={{ width: `${composition.fatPercentage}%`, background: COLOR_FAT }} title="Masa grasa" />
      </div>
    </div>
  );
}

export function BodyCompositionGoalCard({ metric }: BodyCompositionGoalCardProps) {
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

      <p className="mt-3 text-sm text-foreground/80">{metric.message}</p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {metric.stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-[11px] uppercase tracking-wide text-muted">{stat.label}</p>
            <p className="mt-0.5 text-sm font-semibold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        <CompositionBar label="Composición actual" composition={metric.current} />
        <CompositionBar label="Composición objetivo" composition={metric.target} />
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: COLOR_FAT_FREE }} />
            <span className="text-muted">Masa libre de grasa</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: COLOR_FAT }} />
            <span className="text-muted">Masa grasa</span>
          </div>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-wide text-muted">
              <th className="pb-2 font-medium">Indicador</th>
              <th className="pb-2 text-right font-medium">Actual</th>
              <th className="pb-2 text-right font-medium">Objetivo</th>
              <th className="pb-2 text-right font-medium">Cambio</th>
            </tr>
          </thead>
          <tbody>
            {metric.comparisonRows.map((row) => (
              <tr key={row.label} className="border-t border-border">
                <td className="py-1.5 text-foreground">{row.label}</td>
                <td className="py-1.5 text-right text-foreground">{row.actual}</td>
                <td className="py-1.5 text-right text-foreground">{row.target}</td>
                <td className="py-1.5 text-right text-foreground">{row.change}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-muted">{metric.comparisonNote}</p>
      </div>

      <p className="mt-4 rounded-xl bg-primary-soft px-3 py-2 text-sm text-primary-dark">{metric.clinicalNote}</p>

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
