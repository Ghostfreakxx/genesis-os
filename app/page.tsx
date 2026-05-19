"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  description: string;
  url: string;
};

export default function Home() {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();

      setTime(now.toLocaleTimeString());

      if (hour < 12) {
        setGreeting("Good morning, Ghost.");
      } else if (hour < 17) {
        setGreeting("Good afternoon, Ghost.");
      } else if (hour < 21) {
        setGreeting("Good evening, Ghost.");
      } else {
        setGreeting("Good night, Ghost.");
      }
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/news");
        const data = await response.json();

        setNews(data.articles || []);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNews();
  }, []);

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
            <p className="text-green-400 text-sm">
              SYSTEM ONLINE
            </p>

            <p className="text-zinc-500 text-sm">
              Mizoram Node Active
            </p>

            <p className="text-cyan-400 text-2xl mt-2">
              {time}
            </p>
          </div>
        </div>

        <div className="bg-zinc-950 border border-cyan-500 rounded-2xl p-6 mb-10">
          <h2 className="text-2xl text-cyan-400 font-bold">
            {greeting}
          </h2>

          <p className="text-zinc-400 mt-2">
            Genesis is online. Monitoring geopolitical signals,
            cyber risk, regional instability, and governance intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {[
            ["Northeast India", "Stable", "Border monitoring active", "cyan"],
            ["Cyber Threat Level", "Medium", "Scam activity detected", "red"],
            ["Active Surveillance", "24/7", "AI monitoring enabled", "green"],
            ["Global Alerts", "12", "Geopolitical events tracked", "yellow"],
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
              <h2 className="text-xl font-semibold">
                {title}
              </h2>

              <p
                className={`text-4xl font-bold mt-4 ${
                  color === "cyan"
                    ? "text-cyan-400"
                    : color === "red"
                    ? "text-red-400"
                    : color === "green"
                    ? "text-green-400"
                    : "text-yellow-400"
                }`}
              >
                {value}
              </p>

              <p className="text-zinc-500 mt-2">
                {note}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              Live Geopolitical Feed
            </h2>

            <div className="space-y-6">
              {news.map((article, index) => (
                <div
                  key={index}
                  className="border-b border-zinc-800 pb-4"
                >
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

            <p className="text-green-400">
              &gt; Genesis core initialized
            </p>

            <p className="text-green-400">
              &gt; Mizoram node connected
            </p>

            <p className="text-green-400">
              &gt; Cyber watch active
            </p>

            <p className="text-green-400">
              &gt; Intelligence feed online
            </p>

            <p className="text-cyan-400 mt-4 animate-pulse">
              &gt; Awaiting command...
            </p>
          </div>

        </div>

      </div>
    </main>
  );
}