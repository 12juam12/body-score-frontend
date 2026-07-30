type DualPoint = {
  value: number;
  label: string;
  color: string;
};

type DualPointGaugeProps = {
  scaleMin: number;
  scaleMax: number;
  points: DualPoint[];
};

export function DualPointGauge({ scaleMin, scaleMax, points }: DualPointGaugeProps) {
  const span = scaleMax - scaleMin;
  const positioned = points.map((point) => ({
    ...point,
    position: ((Math.min(Math.max(point.value, scaleMin), scaleMax) - scaleMin) / span) * 100,
  }));
  const sorted = [...positioned].sort((a, b) => a.position - b.position);
  const left = sorted[0];
  const right = sorted[sorted.length - 1];

  return (
    <div className="w-full select-none">
      <div className="relative h-2 w-full rounded-full bg-border">
        <div
          className="absolute h-2 rounded-full bg-foreground/20"
          style={{ left: `${left.position}%`, width: `${right.position - left.position}%` }}
        />
        {positioned.map((point) => (
          <div
            key={point.label}
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${point.position}%` }}
          >
            <div className="h-4 w-4 rounded-full border-2 border-white shadow" style={{ background: point.color }} />
          </div>
        ))}
      </div>
      <div className="relative mt-2 h-10 text-xs">
        {positioned.map((point) => (
          <div
            key={point.label}
            className="absolute -translate-x-1/2 text-center"
            style={{ left: `${point.position}%` }}
          >
            <p className="font-medium" style={{ color: point.color }}>
              {point.label}
            </p>
            <p className="text-muted">{point.value} kg</p>
          </div>
        ))}
      </div>
    </div>
  );
}
