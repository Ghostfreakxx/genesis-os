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
