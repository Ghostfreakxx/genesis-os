"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  description: string;
  url: string;
  image?: string;
  source?: string;
};

const presets = [
  {
    name: "India",
    risk: 52,
    color: "#00ff99",
  },
  {
    name: "Myanmar",
    risk: 78,
    color: "#ffaa00",
  },
  {
    name: "China",
    risk: 82,
    color: "#ff4444",
  },
  {
    name: "Taiwan",
    risk: 74,
    color: "#00ccff",
  },
  {
    name: "Russia",
    risk: 86,
    color: "#ff2222",
  },
];

function generateAnalysis(country: string) {
  return `${country} remains under geopolitical observation. 
Power struggles, economic pressure, cyber risks, border tension, and media narratives continue shaping the country's strategic position. 
Modern geopolitics is no longer just tanks and borders. 
It is information warfare, economics, cyber pressure, and public influence fighting at the same time. 
Everyone talks about peace until resources, trade routes, and power are involved.`;
}

export default function PulsePage() {
  const [selected, setSelected] = useState("India");
  const [time, setTime] = useState("");
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const preset =
    presets.find((p) => p.name === selected) || {
      name: selected,
      risk: Math.floor(Math.random() * 40) + 40,
      color: "#00ccff",
    };

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());

    const clock = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/news?topic=${encodeURIComponent(selected)}`
        );

        const data = await response.json();

        setNews((data.articles || []).slice(0, 4));
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }

    fetchNews();
  }, [selected]);

  return (
    <main className="min-h-screen bg-black text-cyan-300 p-4">
      <div className="max-w-5xl mx-auto">

        <div className="border border-cyan-400 rounded-2xl p-5 bg-zinc-950 mb-5">
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-300">
            GENESIS PULSE
          </h1>

          <p className="text-zinc-400 mt-2">
            Public geopolitical watch dashboard
          </p>

          <p className="text-green-400 mt-2">
            Live: {time}
          </p>

          <a href="/" className="text-sm underline text-cyan-500">
            Back to Genesis OS
          </a>
        </div>

        <div className="border border-cyan-500 rounded-2xl p-5 bg-zinc-950 mb-5">
          <h2 className="text-2xl font-bold mb-4">
            Search Country / Region
          </h2>

          <div className="flex gap-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search any country..."
              className="flex-1 bg-black border border-cyan-500 rounded-xl p-3 text-cyan-300"
            />

            <button
              onClick={() => {
                if (search.trim()) {
                  setSelected(search.trim());
                }
              }}
              className="bg-cyan-500 text-black px-5 rounded-xl font-bold"
            >
              Scan
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-5">
          {presets.map((country) => (
            <button
              key={country.name}
              onClick={() => setSelected(country.name)}
              className="rounded-xl p-4 border text-left bg-zinc-950"
              style={{
                borderColor: country.color,
                color: country.color,
              }}
            >
              <p className="font-bold">{country.name}</p>
              <p className="text-xs text-zinc-400">
                Quick Signal
              </p>
            </button>
          ))}
        </div>

        <div
          className="border rounded-2xl p-5 bg-zinc-950 mb-5"
          style={{ borderColor: preset.color }}
        >
          <p className="text-zinc-400">
            Selected Region
          </p>

          <h2
            className="text-5xl font-bold mt-2"
            style={{ color: preset.color }}
          >
            {selected}
          </h2>

          <div className="mt-5">
            <p className="text-zinc-400 mb-2">
              AI Risk Score
            </p>

            <p
              className="text-6xl font-bold"
              style={{ color: preset.color }}
            >
              {preset.risk}
            </p>

            <div className="w-full h-3 bg-zinc-800 rounded-full mt-3">
              <div
                className="h-3 rounded-full"
                style={{
                  width: `${preset.risk}%`,
                  background: preset.color,
                }}
              />
            </div>
          </div>
        </div>

        <div className="border border-purple-500 rounded-2xl p-5 bg-zinc-950 mb-5">
          <h2 className="text-2xl font-bold text-purple-400">
            Genesis Brutal Analysis
          </h2>

          <p className="mt-3 text-zinc-300 leading-7 whitespace-pre-line">
            {generateAnalysis(selected)}
          </p>
        </div>

        <div className="border border-cyan-500 rounded-2xl p-5 bg-zinc-950 mb-5">

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">
                Live Signal Feed
              </h2>

              <p className="text-zinc-400 mt-1">
                News and media related to {selected}
              </p>
            </div>

            {loading && (
              <p className="text-green-400 animate-pulse text-sm">
                updating...
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-5">
            {news.map((article, index) => (
              <div
                key={index}
                className="border border-zinc-700 rounded-2xl overflow-hidden bg-black"
              >
                {article.image && (
                  <img
                    src={article.image}
                    alt="news"
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">
                  <h3 className="text-xl font-bold text-cyan-300">
                    {article.title}
                  </h3>

                  <p className="text-xs text-zinc-500 mt-1">
                    Source: {article.source || "Unknown"}
                  </p>

                  <p className="text-sm text-zinc-300 mt-3">
                    {article.description}
                  </p>

                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-cyan-400 underline"
                  >
                    Watch / Read source →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

   <div className="border border-green-500 rounded-2xl p-5 bg-zinc-950 font-mono mb-10">
  <h2 className="text-2xl font-bold text-green-400">
    Signal Console
  </h2>

  <p className="mt-3 text-green-400">
    &gt; selected region: {selected}
  </p>

  <p className="text-green-400">
    &gt; AI risk score: {preset.risk}
  </p>

  <p className="text-green-400">
    &gt; scanning public geopolitical signals
  </p>

  <p className="text-cyan-400 animate-pulse">
    &gt; Genesis Pulse online...
  </p>
</div>

<div className="text-center mt-10 mb-4">
  <p className="text-zinc-500 text-sm italic">
    Pathian leh Mizoram tan
  </p>

  <p className="text-zinc-700 text-xs mt-1">
    For God and Mizoram
  </p>
</div>

</div>
</main>     
 );
}