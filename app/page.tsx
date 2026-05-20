"use client";

import { useState } from "react";
import MarketWatch from "./components/MarketWatch";

export default function HomePage() {

  const topics = [
    {
      label: "Northeast India",
      threat: "Moderate",
      critic:
        "Delhi ignores Northeast geopolitics until crisis hits the border.",
      search: "Northeast India geopolitics",
    },

    {
      label: "India Myanmar Border",
      threat: "High",
      critic:
        "India reacts slowly while instability spreads through the borderlands.",
      search: "India Myanmar border",
    },

    {
      label: "China Taiwan",
      threat: "Extreme",
      critic:
        "One Taiwan escalation can shake global semiconductors overnight.",
      search: "China Taiwan conflict",
    },

    {
      label: "Cybersecurity",
      threat: "Critical",
      critic:
        "Most people still use weak passwords while living fully online.",
      search: "Cybersecurity attacks",
    },

    {
      label: "Global Conflict",
      threat: "Severe",
      critic:
        "Modern wars are now economic, cyber, media, and drone warfare combined.",
      search: "Global conflict news",
    },
  ];

  const [active, setActive] = useState(topics[1]);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-5xl font-bold text-cyan-300 animate-pulse">
            GENESIS
          </h1>

          <p className="text-zinc-400 mt-2">
            Late night operations online, Ghost.
          </p>

          <p className="text-sm text-cyan-500 mt-1">
            Genesis is monitoring India Myanmar Border.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">

          <div className="border border-cyan-500 rounded-2xl p-5 bg-black">

            <h2 className="text-3xl font-bold text-cyan-300 mb-5">
              World Signal Feed
            </h2>

            <div className="space-y-3">
              {topics.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActive(item)}
                  className={`w-full text-left border rounded-xl p-4 transition-all duration-300 ${
                    active.label === item.label
                      ? "border-red-500 bg-red-500/10"
                      : "border-green-500 bg-[#0a0a0a]"
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

          <div className="md:col-span-2 border border-cyan-500 rounded-2xl p-6 bg-black">

            <h2 className="text-4xl font-bold text-cyan-300">
              {active.label}
            </h2>

            <p className="text-red-400 font-bold mt-3">
              Threat Level: {active.threat}
            </p>

            <div className="mt-6 border border-red-500 rounded-xl p-5 bg-[#0a0a0a]">

              <p className="text-red-400 font-bold mb-3">
                Brutal AI Read
              </p>

              <p className="text-zinc-300 leading-7">
                {active.critic}
              </p>

            </div>

            <a
              href={`https://news.google.com/search?q=${encodeURIComponent(
                active.search
              )}`}
              target="_blank"
              className="inline-block mt-6 text-green-400 underline"
            >
              Open live news search →
            </a>

            <div className="mt-10">
              <MarketWatch />
            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
