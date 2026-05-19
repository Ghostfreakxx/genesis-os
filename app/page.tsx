"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  description: string;
  url: string;
};

const commands = [
  { label: "Northeast India", topic: "Mizoram OR Manipur OR Assam OR Northeast India" },
  { label: "India Myanmar Border", topic: "Myanmar India border OR Mizoram Myanmar OR Manipur Myanmar" },
  { label: "China Taiwan", topic: "China Taiwan" },
  { label: "Cybersecurity", topic: "cyber attack OR cybersecurity OR data breach" },
  { label: "Global Conflict", topic: "war OR geopolitics OR military conflict" },
];

export default function Home() {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [news, setNews] = useState<Article[]>([]);
  const [activeTopic, setActiveTopic] = useState(commands[0]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();

      setTime(now.toLocaleTimeString());

      if (hour < 12) setGreeting("Good morning, Ghost.");
      else if (hour < 17) setGreeting("Good afternoon, Ghost.");
      else if (hour < 21) setGreeting("Good evening, Ghost.");
      else setGreeting("Good night, Ghost.");
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchNews() {
      const response = await fetch(
        `/api/news?topic=${encodeURIComponent(activeTopic.topic)}`
      );

      const data = await response.json();
      setNews(data.articles || []);
    }

    fetchNews();
  }, [activeTopic]);

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-6xl font-bold text-cyan-400">
              GENESIS
            </h1>
            <p className="text-zinc-400 mt-2">
              Geopolitical Intelligence System
            </p>
          </div>

          <div className="text-right">
            <p className="text-green-400 text-sm">SYSTEM ONLINE</p>
            <p className="text-zinc-500 text-sm">Mizoram Node Active</p>
            <p className="text-cyan-400 text-2xl mt-2">{time}</p>
          </div>
        </div>

        <div className="bg-zinc-950 border border-cyan-500 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl text-cyan-400 font-bold">
            {greeting}
          </h2>
          <p className="text-zinc-400 mt-2">
            Genesis is monitoring {activeTopic.label}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            ["Northeast India", "Watch", "Regional feed active", "cyan"],
            ["Cyber Threat Level", "Medium", "Scam activity detected", "red"],
            ["Active Surveillance", "24/7", "News API connected", "green"],
            ["Global Alerts", news.length.toString(), "Live articles loaded", "yellow"],
          ].map(([title, value, note, color]) => (
            <div
              key={title}
              className={`bg-zinc-900 border rounded-2xl p-6 ${
                color === "cyan"
                  ? "border-cyan-500"
                  : color === "red"
                  ? "border-red-500"
                  : color === "green"
                  ? "border-green-500"
                  : "border-yellow-500"
              }`}
            >
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className={`text-4xl font-bold mt-4 ${
                color === "cyan"
                  ? "text-cyan-400"
                  : color === "red"
                  ? "text-red-400"
                  : color === "green"
                  ? "text-green-400"
                  : "text-yellow-400"
              }`}>
                {value}
              </p>
              <p className="text-zinc-500 mt-2">{note}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-cyan-400 mb-2">
              Live Geopolitical Feed
            </h2>

            <p className="text-zinc-500 mb-6">
              Current topic: {activeTopic.label}
            </p>

            <div className="space-y-6">
              {news.map((article, index) => (
                <div key={index} className="border-b border-zinc-800 pb-4">
                  <a
                    href={article.url}
                    target="_blank"
                    className="text-xl text-cyan-300 hover:text-cyan-400"
                  >
                    {article.title}
                  </a>

                  <p className="text-zinc-400 mt-2 text-sm">
                    {article.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-black border border-green-500 rounded-2xl p-8 font-mono">
            <h2 className="text-2xl font-bold text-green-400 mb-4">
              Command Console
            </h2>

            <div className="space-y-3">
              {commands.map((command) => (
                <button
                  key={command.label}
                  onClick={() => setActiveTopic(command)}
                  className={`block w-full text-left border rounded-xl p-3 ${
                    activeTopic.label === command.label
                      ? "border-cyan-400 text-cyan-400"
                      : "border-green-800 text-green-400 hover:border-green-400"
                  }`}
                >
                  &gt; {command.label}
                </button>
              ))}
            </div>

            <p className="text-cyan-400 mt-6 animate-pulse">
              &gt; Awaiting command...
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}