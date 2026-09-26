"use client";

import { useEffect, useState } from "react";
import { DEFAULT_THREAT_STYLE, THREAT_STYLES } from "@/app/lib/threat-levels";

interface WarRoomHudProps {
  alertLevel: string;
  callsign: string;
}

export default function WarRoomHud({ alertLevel, callsign }: WarRoomHudProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const threatStyle = THREAT_STYLES[alertLevel] ?? DEFAULT_THREAT_STYLE;
  const time = now.toUTCString().slice(17, 25);

  return (
    <div className="relative z-20 border-b border-line bg-[#060912]/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2.5 flex items-center justify-between gap-4 flex-wrap font-tactical text-xs tracking-wider">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          SECURE LINK ESTABLISHED
        </div>

        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${threatStyle.dot} animate-pulse`} />
          <span className={threatStyle.text}>
            ALERT CONDITION: {alertLevel.toUpperCase()}
          </span>
        </div>

        <div className="text-slate-500">CALLSIGN: {callsign}</div>

        <div className="text-slate-500 tabular-nums">{time} UTC</div>
      </div>
    </div>
  );
}
