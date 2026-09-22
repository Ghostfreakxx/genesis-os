export interface ThreatStyle {
  text: string;
  dot: string;
  border: string;
  bg: string;
}

export const THREAT_STYLES: Record<string, ThreatStyle> = {
  Moderate: {
    text: "text-yellow-400",
    dot: "bg-yellow-400",
    border: "border-yellow-500/40",
    bg: "bg-yellow-500/10",
  },
  High: {
    text: "text-orange-400",
    dot: "bg-orange-400",
    border: "border-orange-500/40",
    bg: "bg-orange-500/10",
  },
  Severe: {
    text: "text-red-400",
    dot: "bg-red-400",
    border: "border-red-500/40",
    bg: "bg-red-500/10",
  },
  Critical: {
    text: "text-red-400",
    dot: "bg-red-400",
    border: "border-red-500/40",
    bg: "bg-red-500/10",
  },
  Extreme: {
    text: "text-pink-400",
    dot: "bg-pink-400",
    border: "border-pink-500/40",
    bg: "bg-pink-500/10",
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
  { max: 24, label: "LOW", text: "text-green-400", bar: "bg-green-500", bg: "bg-green-500/10", border: "border-green-500/40" },
  { max: 49, label: "GUARDED", text: "text-yellow-400", bar: "bg-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/40" },
  { max: 69, label: "ELEVATED", text: "text-orange-400", bar: "bg-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/40" },
  { max: 89, label: "HIGH", text: "text-red-400", bar: "bg-red-500", bg: "bg-red-500/10", border: "border-red-500/40" },
  { max: 100, label: "SEVERE", text: "text-pink-400", bar: "bg-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/40" },
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
