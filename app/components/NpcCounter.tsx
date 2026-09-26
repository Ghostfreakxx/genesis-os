"use client";

const messages = [
  "Busy during daylight. Operational at night.",
  "System stability questionable.",
  "NPCs welcome too.",
  "Mentally exhausted but operational.",
  "Current objective: survive modern life.",
  "Low activity detected during daylight hours.",
];

export default function GenesisStatus() {

  const onlineUsers =
    Math.floor(Math.random() * 9000) + 1000;

  const randomMessage =
    messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="panel-inset p-5 flex flex-col">
      <p className="font-tactical text-xs uppercase tracking-[0.2em] text-slate-400">
        Genesis Status
      </p>

      <p className="text-slate-200 mt-2 leading-7">
        {randomMessage}
      </p>

      <p className="mt-auto pt-4 font-tactical text-xs uppercase tracking-wider text-slate-500 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Exhausted users connected:
        <span className="font-mono text-sm text-emerald-300 tabular-nums">
          {onlineUsers.toLocaleString()}
        </span>
      </p>
    </div>
  );
}
