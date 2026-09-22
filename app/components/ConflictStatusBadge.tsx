import { CONFLICT_STATUS_STYLES } from "@/app/lib/conflict-status";
import type { ConflictStatus } from "@/app/lib/conflict-zones";

export default function ConflictStatusBadge({ status }: { status: ConflictStatus }) {
  const style = CONFLICT_STATUS_STYLES[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-tactical uppercase tracking-wider border rounded px-1.5 py-0.5 ${style.text} ${style.border} ${style.bg}`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: style.dot }}
      />
      {style.label}
    </span>
  );
}
