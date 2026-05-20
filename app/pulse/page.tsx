"use client";

import { useState } from "react";
import MarketWatch from "./components/MarketWatch";

const topics = [
  {
    label: "Northeast India",
    threat: "Medium",
    title: "Northeast India Watch",
    summary:
      "Focus on Mizoram, Manipur, Assam, border security, ethnic tension, migration, and regional development.",
    critic:
      "Most aspirants ignore Northeast geopolitics until exam season. That is why their answers sound empty.",
    search: "Northeast India geopolitics Mizoram Manipur Assam",
  },
  {
    label: "India Myanmar Border",
    threat: "High",
    title: "India Myanmar Border Watch",
    summary:
      "Tracks conflict spillover, refugees, smuggling, border fencing, ethnic armed groups, and security pressure.",
    critic:
      "The border is not just a line on a map. It is where weak policy becomes visible.",
    search: "India Myanmar border conflict Mizoram Manipur",
  },
  {
    label: "China Taiwan",
    threat: "High",
    title: "China Taiwan Flashpoint",
    summary:
      "Tracks Indo Pacific tension, military drills, semiconductor risks, US China rivalry, and maritime pressure.",
    critic:
      "People call it far away until chips, markets, and war anxiety hit their pocket.",
    search: "China Taiwan conflict Indo Pacific",
  },
  {
    label: "Cybersecurity",
    threat: "Medium",
    title: "Cybersecurity Watch",
    summary:
      "Tracks scams, phishing, cyber fraud, data leaks, AI threats, and digital hygiene problems.",
    critic:
      "The average scam works not because hackers are geniuses, but because users are careless.",
    search: "India cybersecurity scam fraud phishing",
  },
  {
    label: "Global Conflict",
    threat: "High",
    title: "Global Conflict Monitor",
    summary:
      "Tracks wars, sanctions, oil pressure, refugee flows, military alliances, and market fear.",
    critic:
      "Global politics is usually rich men gambling with poor men’s lives.",
    search: "global conflict war geopolitics today",
  },
];

export default function HomePage() {
  const [active, setActive] = useState(topics[1]);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <header className="border border-cyan-400 rounded-2xl p-5 bg-[#0a0a0a] mb-6">
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-300">
            GENESIS
          </h1>
          <p className="text-zinc-400 mt-2">
            Geopolitical Intelligence System for Mizoram aspirants.
          </p>
          <p className="text-cyan-500 text-sm mt-1">
            Pathian leh Mizoram tan
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="border border-cyan-400 rounded-2xl p-5 bg-[#0a0a0a]">
            <p className="text-cyan-300 text-sm">Current Zone</p>
            <h2 className="text-3xl font-bold mt-2">{active.label}</h2>
            <p className="text-zinc-400 mt-2">Regional feed active</p>
          </div>

          <div className="border border-red-400 rounded-2xl p-5 bg-[#0a0a0a]">
            <p className="text-red-300 text-sm">Threat Level</p>
            <h2 className="text-3xl font-bold text-red-300 mt-2">
              {active.threat}
            </h2>
            <p className="text-zinc-400 mt-2">Public signal detected</p>
          </div>

          <div className="border border-green-400 rounded-2xl p-5 bg-[#0a0a0a]">
            <p className="text-green-300 text-sm">Study Mode</p>
            <h2 className="text-3xl font-bold text-green-300 mt-2">ON</h2>
            <p className="text-zinc-400 mt-2">Aspirant friendly</p>
          </div>

          <div className="border border-yellow-400 rounded-2xl p-5 bg-[#0a0a0a]">
            <p className="text-yellow-300 text-sm">Market Signal</p>
            <h2 className="text-3xl font-bold text-yellow-300 mt-2">Watch</h2>
            <p className="text-zinc-400 mt-2">Crypto, gold, oil, dollar</p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border border-cyan-400 rounded-2xl p-5 bg-[#0a0a0a]">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-300">
              Live Geopolitical Feed
            </h2>

            <p className="text-sm text-cyan-500 mt-1 mb-5">
              Current topic: {active.label}
            </p>

            <div className="border border-zinc-700 rounded-2xl overflow-hidden bg-black">
              <img
                src={`https://source.unsplash.com/1200x600/?${encodeURIComponent(
                  active.search
                )}`}
                alt={active.label}
                className="w-full h-[220px] md:h-[320px] object-cover"
              />

              <div className="p-5">
                <h3 className="text-2xl md:text-3xl font-bold text-cyan-200">
                  {active.title}
                </h3>

                <p className="text-zinc-300 mt-3 leading-7">
                  {active.summary}
                </p>

                <div className="mt-5 border border-red-500 rounded-xl p-4 bg-[#050505]">
                  <p className="text-red-400 font-bold">Brutal AI Read</p>
                  <p className="text-zinc-300 mt-2 leading-7">
                    {active.critic}
                  </p>
                </div>

                <a
                  href={`https://news.google.com/search?q=${encodeURIComponent(
                    active.search
                  )}`}
                  target="_blank"
                  className="inline-block mt-5 text-green-400 underline"
                >
                  Open live news search →
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border border-purple-400 rounded-2xl p-5 bg-[#0a0a0a]">
              <h2 className="text-3xl font-bold text-purple-300">
                World Signal
              </h2>

              <p className="text-zinc-400 mt-2 leading-7">
                Select a command below. Genesis will shift the public news focus
                for aspirants, researchers, and Mizoram-based observers.
              </p>

              <div className="mt-5 border border-cyan-500 rounded-xl p-4 bg-black">
                <p className="text-cyan-300 font-bold">{active.label}</p>
                <p className="text-zinc-400 mt-1">Threat: {active.threat}</p>
              </div>
            </div>

            <div className="border border-green-400 rounded-2xl p-5 bg-[#0a0a0a]">
              <h2 className="text-3xl font-bold text-green-300 mb-4">
                Command Console
              </h2>

              <div className="space-y-3">
                {topics.map((topic) => (
                  <button
                    key={topic.label}
                    onClick={() => setActive(topic)}
                    className={`w-full text-left border rounded-lg px-4 py-3 transition ${
                      active.label === topic.label
                        ? "border-cyan-400 text-cyan-300 bg-cyan-950/30"
                        : "border-green-500 text-green-300 bg-black"
                    }`}
                  >
                    {">"} {topic.label}
                  </button>
                ))}
              </div>

              <p className="text-green-400 mt-5 animate-pulse">
                {">"} Command active: {active.label}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <MarketWatch />
        </div>
      </div>
    </main>
  );
}