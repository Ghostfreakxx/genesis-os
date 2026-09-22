import type { ConflictStatus } from "@/app/lib/conflict-zones";

export interface ConflictStatusStyle {
  label: string;
  text: string;
  border: string;
  bg: string;
  /** Hex color for Leaflet path options, which can't use Tailwind classes. */
  dot: string;
}

export const CONFLICT_STATUS_STYLES: Record<ConflictStatus, ConflictStatusStyle> = {
  "active-war": {
    label: "Active War",
    text: "text-red-400",
    border: "border-red-500/50",
    bg: "bg-red-500/10",
    dot: "#f87171",
  },
  insurgency: {
    label: "Insurgency",
    text: "text-orange-400",
    border: "border-orange-500/50",
    bg: "bg-orange-500/10",
    dot: "#fb923c",
  },
  ceasefire: {
    label: "Fragile Ceasefire",
    text: "text-yellow-400",
    border: "border-yellow-500/50",
    bg: "bg-yellow-500/10",
    dot: "#facc15",
  },
  tension: {
    label: "Territorial Tension",
    text: "text-cyan-400",
    border: "border-cyan-500/50",
    bg: "bg-cyan-500/10",
    dot: "#22d3ee",
  },
};
