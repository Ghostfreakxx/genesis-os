export const THREAT_LEVELS = ["Moderate", "High", "Severe", "Critical", "Extreme"] as const;

export type ThreatLevel = (typeof THREAT_LEVELS)[number];

export interface Sector {
  label: string;
  threat: string;
  critic: string;
  search: string;
  custom?: boolean;
}

export const DEFAULT_SECTORS: Sector[] = [
  {
    label: "Northeast India",
    threat: "Moderate",
    critic: "Delhi ignores Northeast geopolitics until crisis hits the border.",
    search: "Northeast India geopolitics",
  },
  {
    label: "India Myanmar Border",
    threat: "High",
    critic: "India reacts slowly while instability spreads through the borderlands.",
    search: "India Myanmar border",
  },
  {
    label: "China Taiwan",
    threat: "Extreme",
    critic: "One Taiwan escalation can shake global semiconductors overnight.",
    search: "China Taiwan conflict",
  },
  {
    label: "South China Sea",
    threat: "Severe",
    critic: "Grey-zone coercion at sea moves faster than any diplomatic protest.",
    search: "South China Sea",
  },
  {
    label: "Russia Ukraine",
    threat: "Extreme",
    critic: "A war of attrition rewritten daily by drones, energy, and sanctions.",
    search: "Russia Ukraine war",
  },
  {
    label: "Middle East",
    threat: "Severe",
    critic: "Every local flare-up here is one miscalculation from a regional war.",
    search: "Middle East conflict",
  },
  {
    label: "Cybersecurity",
    threat: "Critical",
    critic: "Most people still use weak passwords while living fully online.",
    search: "Cybersecurity attacks",
  },
  {
    label: "Global Conflict",
    threat: "Severe",
    critic: "Modern wars are now economic, cyber, media, and drone warfare combined.",
    search: "Global conflict news",
  },
];

export const MAX_LABEL_LENGTH = 40;

/** Case-insensitive match on a threat level name; returns the canonical spelling. */
export function parseThreatLevel(value: string): ThreatLevel | null {
  const needle = value.trim().toLowerCase();
  return THREAT_LEVELS.find((level) => level.toLowerCase() === needle) ?? null;
}

export function createCustomSector(
  label: string,
  threat: string,
  search?: string,
  critic?: string
): Sector {
  const cleanLabel = label.trim().slice(0, MAX_LABEL_LENGTH);
  return {
    label: cleanLabel,
    threat: parseThreatLevel(threat) ?? "Moderate",
    search: search?.trim() || cleanLabel,
    critic: critic?.trim() || "Operator-defined sector. No analyst read on file yet.",
    custom: true,
  };
}

/** Exact (case-insensitive) label match first, then substring match. */
export function findSector(sectors: Sector[], query: string): Sector | undefined {
  const needle = query.trim().toLowerCase();
  if (!needle) return undefined;
  return (
    sectors.find((sector) => sector.label.toLowerCase() === needle) ??
    sectors.find((sector) => sector.label.toLowerCase().includes(needle))
  );
}
