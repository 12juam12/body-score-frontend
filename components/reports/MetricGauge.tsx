import type { MetricZone } from "@/lib/metrics/types";

type MetricGaugeProps = {
  zones: MetricZone[];
  scaleMin: number;
  scaleMax: number;
  value: number;
  smooth?: boolean;
  markerColor?: string;
  boundaryMarkers?: number[];
};

export function MetricGauge({ zones, scaleMin, scaleMax, value, smooth = false, markerColor, boundaryMarkers = [] }: MetricGaugeProps) {
  const span = scaleMax - scaleMin;
  const clampedValue = Math.min(Math.max(value, scaleMin), scaleMax);
  const position = ((clampedValue - scaleMin) / span) * 100;
  const boundaryPositions = boundaryMarkers.map((marker) => {
    const clampedMarker = Math.min(Math.max(marker, scaleMin), scaleMax);
    return ((clampedMarker - scaleMin) / span) * 100;
  });

  const visibleZones = zones
    .map((zone) => {
      const zoneMin = Math.max(zone.min, scaleMin);
      const zoneMax = Math.min(zone.max, scaleMax);
      const width = ((zoneMax - zoneMin) / span) * 100;
      return { ...zone, width };
    })
    .filter((zone) => zone.width > 0);

  const gradientStops = smooth
    ? visibleZones
        .reduce<{ color: string; position: number }[]>((stops, zone, index) => {
          const start = visibleZones.slice(0, index).reduce((sum, z) => sum + z.width, 0);
          const midpoint = start + zone.width / 2;
          return [...stops, { color: zone.color, position: midpoint }];
        }, [])
        .flatMap((stop, index, all) => {
          if (index === 0 && stop.position > 0) {
            return [{ ...stop, position: 0 }, stop];
          }
          if (index === all.length - 1 && stop.position < 100) {
            return [stop, { ...stop, position: 100 }];
          }
          return [stop];
        })
    : [];

  const gradientStopStrings = gradientStops.map((stop) => `${stop.color} ${stop.position}%`);
  const gradient = `linear-gradient(to right, ${gradientStopStrings.join(", ")})`;

  return (
    <div className="w-full select-none">
      <div className="relative pt-4">
        <div
          className="absolute top-0 -translate-x-1/2"
          style={{ left: `${position}%` }}
          aria-hidden
        >
          <div
            className={`h-3 w-3 rotate-45 rounded-[2px] shadow-sm ${markerColor ? "" : "bg-foreground"}`}
            style={markerColor ? { background: markerColor } : undefined}
          />
        </div>
        <div className="relative">
          {smooth ? (
            <div className="h-2.5 w-full rounded-full" style={{ background: gradient }} />
          ) : (
            <div className="flex h-2.5 w-full overflow-hidden rounded-full">
              {visibleZones.map((zone) => (
                <div key={zone.key} title={zone.label} style={{ width: `${zone.width}%`, background: zone.color }} />
              ))}
            </div>
          )}
          {boundaryPositions.map((boundaryPosition) => (
            <div
              key={boundaryPosition}
              className="absolute top-0 h-2.5 w-0.5 bg-white/80"
              style={{ left: `${boundaryPosition}%` }}
              aria-hidden
            />
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
