import { DEFAULT_THREAT_STYLE, THREAT_STYLES } from "@/app/lib/threat-levels";

export default function ThreatBadge({ level }: { level: string }) {
  const style = THREAT_STYLES[level] ?? DEFAULT_THREAT_STYLE;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-tactical uppercase tracking-wider border rounded px-1.5 py-0.5 ${style.text} ${style.border} ${style.bg}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
      {level}
    </span>
  );
}
