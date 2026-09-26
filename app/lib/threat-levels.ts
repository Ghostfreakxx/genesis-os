export interface ThreatStyle {
  text: string;
  dot: string;
  border: string;
  bg: string;
}

export const THREAT_STYLES: Record<string, ThreatStyle> = {
  Moderate: {
    text: "text-amber-300",
    dot: "bg-amber-300",
    border: "border-amber-400/30",
    bg: "bg-amber-400/10",
  },
  High: {
    text: "text-orange-400",
    dot: "bg-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
  },
  Severe: {
    text: "text-rose-400",
    dot: "bg-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
  },
  Critical: {
    text: "text-rose-400",
    dot: "bg-rose-400",
    border: "border-rose-500/30",
    bg: "bg-rose-500/10",
  },
  Extreme: {
    text: "text-fuchsia-400",
    dot: "bg-fuchsia-400",
    border: "border-fuchsia-500/30",
    bg: "bg-fuchsia-500/10",
  },
};

export const DEFAULT_THREAT_STYLE: ThreatStyle = THREAT_STYLES.Moderate;

const THREAT_WEIGHT: Record<string, number> = {
  Moderate: 20,
  High: 45,
  Severe: 65,
  Critical: 80,
  Extreme: 95,
};

const DEFAULT_THREAT_WEIGHT = 50;

export interface TensionLevel {
  max: number;
  label: string;
  text: string;
  bar: string;
  bg: string;
  border: string;
}

const TENSION_LEVELS: TensionLevel[] = [
  { max: 24, label: "LOW", text: "text-emerald-400", bar: "bg-emerald-500", bg: "bg-emerald-500/10", border: "border-emerald-500/30" },
  { max: 49, label: "GUARDED", text: "text-amber-300", bar: "bg-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/30" },
  { max: 69, label: "ELEVATED", text: "text-orange-400", bar: "bg-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/30" },
  { max: 89, label: "HIGH", text: "text-rose-400", bar: "bg-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/30" },
  { max: 100, label: "SEVERE", text: "text-fuchsia-400", bar: "bg-fuchsia-500", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30" },
];

export function computeTensionScore(threats: string[]): number {
  if (threats.length === 0) return 0;
  const total = threats.reduce(
    (sum, threat) => sum + (THREAT_WEIGHT[threat] ?? DEFAULT_THREAT_WEIGHT),
    0
  );
  return Math.round(total / threats.length);
}

export function getTensionLevel(score: number): TensionLevel {
  return (
    TENSION_LEVELS.find((level) => score <= level.max) ??
    TENSION_LEVELS[TENSION_LEVELS.length - 1]
  );
}
