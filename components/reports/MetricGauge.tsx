import type { MetricZone } from "@/lib/metrics/types";

type MetricGaugeProps = {
  zones: MetricZone[];
  scaleMin: number;
  scaleMax: number;
  value: number;
};

export function MetricGauge({ zones, scaleMin, scaleMax, value }: MetricGaugeProps) {
  const span = scaleMax - scaleMin;
  const clampedValue = Math.min(Math.max(value, scaleMin), scaleMax);
  const position = ((clampedValue - scaleMin) / span) * 100;

  const visibleZones = zones
    .map((zone) => {
      const zoneMin = Math.max(zone.min, scaleMin);
      const zoneMax = Math.min(zone.max, scaleMax);
      const width = ((zoneMax - zoneMin) / span) * 100;
      return { ...zone, width };
    })
    .filter((zone) => zone.width > 0);

  return (
    <div className="w-full select-none">
      <div className="relative pt-4">
        <div
          className="absolute top-0 -translate-x-1/2"
          style={{ left: `${position}%` }}
          aria-hidden
        >
          <div className="h-3 w-3 rotate-45 rounded-[2px] bg-foreground shadow-sm" />
        </div>
        <div className="flex h-2.5 w-full overflow-hidden rounded-full">
          {visibleZones.map((zone) => (
            <div key={zone.key} title={zone.label} style={{ width: `${zone.width}%`, background: zone.color }} />
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex w-full text-[10px] text-muted">
        {visibleZones.map((zone) => (
          <div key={zone.key} style={{ width: `${zone.width}%` }} className="truncate text-center">
            {zone.label}
          </div>
        ))}
      </div>
    </div>
  );
}
