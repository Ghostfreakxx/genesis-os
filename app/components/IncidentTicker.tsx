"use client";

import { useEffect, useRef, useState } from "react";

const FLAVOR_EVENTS = [
  "SATELLITE UPLINK STABLE",
  "OSINT CRAWLER SWEEP COMPLETE",
  "NO ANOMALIES IN SECTOR 7",
  "SIGNAL INTEGRITY: NOMINAL",
  "BACKGROUND SCAN CYCLE COMPLETE",
  "ENCRYPTED CHANNEL VERIFIED",
  "PERIMETER SENSORS: GREEN",
  "ROUTINE TELEMETRY SYNC OK",
];

export default function IncidentTicker({ activeLabel }: { activeLabel: string }) {
  const [events, setEvents] = useState<string[]>([
    `GENESIS ONLINE — MONITORING ${activeLabel.toUpperCase()}`,
  ]);
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setEvents((prev) =>
      [...prev, `OPERATOR FOCUS SHIFTED TO ${activeLabel.toUpperCase()}`].slice(-30)
    );
  }, [activeLabel]);

  useEffect(() => {
    const timer = setInterval(() => {
      const line = FLAVOR_EVENTS[Math.floor(Math.random() * FLAVOR_EVENTS.length)];
      setEvents((prev) => [...prev, line].slice(-30));
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const feed = events.join("     //     ");

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-line bg-[#060912]/80 backdrop-blur-md overflow-hidden py-2">
      <div className="ticker-track whitespace-nowrap font-tactical text-xs text-slate-400 tracking-wider [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <span className="pr-10">{feed}</span>
        <span className="pr-10">{feed}</span>
      </div>
    </div>
  );
}
