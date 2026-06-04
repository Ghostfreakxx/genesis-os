"use client";

import LiveNewsFeed from "./components/livenewsfeed";
import NewNEMap from "./components/NewNEMap";
import { useState } from "react";
import MarketWatch from "./components/MarketWatch";
import NpcCounter from "./components/NpcCounter";

export default function HomePage() {
  const topics = [
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

  const [active, setActive] = useState(topics[1]);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-6 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#22d3ee33_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee33_1px,transparent_1px)] bg-[size:45px_45px] animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="mb-8 border border-cyan-500/40 rounded-3xl p-6 bg-black/60 shadow-[0_0_30px_#0891b255]">
          <h1 className="text-5xl font-bold text-cyan-300 animate-pulse drop-shadow-[0_0_20px_#22d3ee]">
            GENESIS
          </h1>

          <p className="text-zinc-400 mt-2">
            Monitoring global signals.
          </p>

          <p className="text-sm text-cyan-500 mt-1 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            Genesis is monitoring India Myanmar Border.
          </p>

          <NpcCounter />

          <div className="mt-5 h-1 bg-cyan-500 rounded-full shadow-[0_0_20px_#22d3ee] animate-pulse"></div>

          <div className="relative mt-2 h-1 overflow-hidden rounded-full bg-zinc-900">
            <div className="h-full w-1/2 bg-cyan-300 shadow-[0_0_20px_#22d3ee] animate-[scan_3s_linear_infinite]"></div>
          </div>

          <style jsx>{`
            @keyframes scan {
              0% {
                transform: translateX(-120%);
              }
              100% {
                transform: translateX(220%);
              }
            }
          `}</style>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div className="border border-cyan-500 rounded-2xl p-5 bg-black shadow-[0_0_25px_#0891b244] hover:shadow-[0_0_40px_#22d3ee66] transition-all duration-500">
            <h2 className="text-3xl font-bold text-cyan-300 mb-5">
              World Signal Feed
            </h2>

            <div className="space-y-3">
              {topics.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActive(item)}
                  className={`w-full text-left border rounded-xl p-4 transition-all duration-300 hover:scale-[1.03] ${
                    active.label === item.label
                      ? "border-red-500 bg-red-500/10 shadow-[0_0_25px_#ef444455]"
                      : "border-green-500 bg-[#0a0a0a] hover:shadow-[0_0_20px_#22c55e55]"
                  }`}
                >
                  <p className="font-bold text-lg">
                    {item.label}
                  </p>

                  <p className="text-sm text-zinc-400 mt-1">
                    Threat: {item.threat}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 border border-cyan-500 rounded-2xl p-6 bg-black shadow-[0_0_25px_#0891b244]">
            <h2 className="text-4xl font-bold text-cyan-300 drop-shadow-[0_0_15px_#22d3ee]">
              {active.label}
            </h2>

            <p className="text-red-400 font-bold mt-3 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
              Threat Level: {active.threat}
            </p>

            <div className="mt-6 border border-red-500 rounded-xl p-5 bg-[#0a0a0a] shadow-[0_0_25px_#ef444433] hover:shadow-[0_0_40px_#ef444466] transition-all duration-500">
              <p className="text-red-400 font-bold mb-3">
                Brutal AI Read
              </p>

              <LiveNewsFeed topic={active.search} />

              <p className="text-zinc-300 leading-7 mt-4">
                {active.critic}
              </p>
            </div>

            <a
              href={`https://news.google.com/search?q=${encodeURIComponent(
                active.search
              )}`}
              target="_blank"
              className="inline-block mt-6 text-green-400 underline hover:text-cyan-300 transition-colors"
            >
              Open live news search →
            </a>

            <div className="mt-10 hover:scale-[1.01] transition-all duration-500">
              <NewNEMap />
            </div>

            <div className="mt-10 hover:scale-[1.01] transition-all duration-500">
              <MarketWatch />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}