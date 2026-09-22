import type { EventCategory } from "@/app/lib/ww2-timeline";

export interface CategoryStyle {
  label: string;
  text: string;
  border: string;
  bg: string;
}

export const CATEGORY_STYLES: Record<EventCategory, CategoryStyle> = {
  political: {
    label: "Political",
    text: "text-cyan-400",
    border: "border-cyan-500/40",
    bg: "bg-cyan-500/10",
  },
  military: {
    label: "Military",
    text: "text-orange-400",
    border: "border-orange-500/40",
    bg: "bg-orange-500/10",
  },
  diplomatic: {
    label: "Diplomatic",
    text: "text-green-400",
    border: "border-green-500/40",
    bg: "bg-green-500/10",
  },
  // Deliberately muted, no glow — genocide and war crimes are not styled
  // like the other "exciting" categories.
  atrocity: {
    label: "Atrocity",
    text: "text-zinc-300",
    border: "border-zinc-600",
    bg: "bg-zinc-800/60",
  },
};
