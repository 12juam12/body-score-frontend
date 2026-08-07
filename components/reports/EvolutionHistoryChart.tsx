"use client";

import { useState } from "react";
import type { EvolutionHistoryPresentation } from "@/lib/metrics/types";

type EvolutionHistoryChartProps = {
  metric: EvolutionHistoryPresentation;
};

const VIEWBOX_WIDTH = 600;
const VIEWBOX_HEIGHT = 260;
const MARGIN_TOP = 16;
const MARGIN_BOTTOM = 32;
const MARGIN_LEFT = 12;
const MARGIN_RIGHT = 12;

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit" });
}

export function EvolutionHistoryChart({ metric }: EvolutionHistoryChartProps) {
  const [hiddenKeys, setHiddenKeys] = useState<Set<string>>(new Set());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  if (!metric.hasHistory) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
        <h3 className="font-semibold text-foreground">Historial de Evolución</h3>
        <p className="mt-3 text-sm text-muted">{metric.emptyMessage}</p>
      </div>
    );
  }

  const pointCount = metric.series[0].points.length;
  const plotWidth = VIEWBOX_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
  const plotHeight = VIEWBOX_HEIGHT - MARGIN_TOP - MARGIN_BOTTOM;
  const stepWidth = plotWidth / (pointCount - 1 || 1);

  const xForIndex = (index: number) => MARGIN_LEFT + (pointCount === 1 ? plotWidth / 2 : stepWidth * index);

  const yScales = new Map(
    metric.series.map((series) => {
      const values = series.points.map((point) => point.value);
      return [series.key, { min: Math.min(...values), max: Math.max(...values) }];
    }),
  );

  const yForSeriesValue = (seriesKey: string, value: number) => {
    const scale = yScales.get(seriesKey);
    if (!scale) return MARGIN_TOP + plotHeight / 2;
    const span = scale.max - scale.min;
    if (span === 0) return MARGIN_TOP + plotHeight / 2;
    return MARGIN_TOP + plotHeight - ((value - scale.min) / span) * plotHeight;
  };

  const toggleSeries = (key: string) => {
    setHiddenKeys((previous) => {
      const next = new Set(previous);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const visibleSeries = metric.series.filter((series) => !hiddenKeys.has(series.key));
  const dateLabels = metric.series[0].points.map((point) => formatDate(point.date));
  const hoveredPoint = hoveredIndex !== null ? metric.series[0].points[hoveredIndex] : null;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h3 className="font-semibold text-foreground">Historial de Evolución</h3>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {metric.series.map((series) => {
          const isHidden = hiddenKeys.has(series.key);
          return (
            <button
              key={series.key}
              type="button"
              onClick={() => toggleSeries(series.key)}
              className="flex items-center gap-1.5"
              style={{ opacity: isHidden ? 0.4 : 1 }}
            >
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: series.color }} />
              <span className={isHidden ? "text-muted line-through" : "text-foreground"}>{series.label}</span>
            </button>
          );
        })}
      </div>

      <svg
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
        preserveAspectRatio="none"
        className="mt-4 h-56 w-full"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {hoveredIndex !== null ? (
          <line
            x1={xForIndex(hoveredIndex)}
            x2={xForIndex(hoveredIndex)}
            y1={MARGIN_TOP}
            y2={MARGIN_TOP + plotHeight}
            className="stroke-border"
            strokeWidth={1}
          />
        ) : null}

        {visibleSeries.map((series) => {
          const path = series.points
            .map((point, index) => `${index === 0 ? "M" : "L"}${xForIndex(index)},${yForSeriesValue(series.key, point.value)}`)
            .join(" ");
          return (
            <g key={series.key}>
              <path d={path} fill="none" stroke={series.color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              {series.points.map((point, index) => (
                <circle key={index} cx={xForIndex(index)} cy={yForSeriesValue(series.key, point.value)} r={3} fill={series.color} />
              ))}
            </g>
          );
        })}

        {dateLabels.map((label, index) => (
          <text key={index} x={xForIndex(index)} y={VIEWBOX_HEIGHT - 10} textAnchor="middle" className="fill-muted" fontSize={10}>
            {label}
          </text>
        ))}

        {dateLabels.map((_, index) => (
          <rect
            key={index}
            x={xForIndex(index) - stepWidth / 2}
            y={MARGIN_TOP}
            width={stepWidth}
            height={plotHeight}
            fill="transparent"
            onMouseEnter={() => setHoveredIndex(index)}
          />
        ))}
      </svg>

      {hoveredPoint ? (
        <div className="mt-2 rounded-xl bg-secondary px-3 py-2 text-xs text-white">
          <p className="font-medium">{formatDate(hoveredPoint.date)}</p>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
            {visibleSeries.map((series) => (
              <span key={series.key} className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: series.color }} />
                {series.label}: {series.points[hoveredIndex ?? 0].value}
                {series.unit}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
