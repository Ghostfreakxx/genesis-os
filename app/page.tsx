"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const GenesisMap = dynamic(
  () => import("./components/GenesisMap"),
  {
    ssr: false,
  }
);

type Article = {
  title: string;
  description: string;
  url: string;
  image?: string;
  source?: string;
};

type Target = {
  name: string;
  lat: number;
  lng: number;
  threat: string;
};

const commands = [
  {
    label: "Northeast India",
    topic: "Mizoram OR Manipur OR Assam",
    target: {
      name: "Northeast India",
      lat: 24.817,
      lng: 93.9368,
      threat: "Medium",
    },
  },

  {
    label: "India Myanmar Border",
    topic: "Myanmar India border OR Mizoram Myanmar",
    target: {
      name: "India Myanmar Border",
      lat: 23.1645,
      lng: 92.9376,
      threat: "High",
    },
  },

  {
    label: "China Taiwan",
    topic: "China Taiwan conflict",
    target: {
      name: "Taiwan Strait",
      lat: 25.033,
      lng: 121.5654,
      threat: "High",
    },
  },

  {
    label: "Cybersecurity",
    topic: "cyber attack OR cybersecurity",
    target: {
      name: "Cyber Threat Grid",
      lat: 37.7749,
      lng: -122.4194,
      threat: "Medium",
    },
  },

  {
    label: "Global Conflict",
    topic: "war OR military conflict",
    target: {
      name: "Global Conflict Zone",
      lat: 48.8566,
      lng: 2.3522,
      threat: "High",
    },
  },
];

export default function Home() {
  const [time, setTime] = useState("");
  const [news, setNews] = useState<Article[]>([]);
  const [activeTopic, setActiveTopic] = useState(commands[0]);
  const [selectedArticle, setSelectedArticle] =
    useState<Article | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchNews(activeTopic.topic);
  }, [activeTopic]);

  const fetchNews = async (topic: string) => {
    try {
      const response = await fetch(
        `/api/news?topic=${encodeURIComponent(topic)}`
      );

      const data = await response.json();

      setNews(data.articles || []);

      if (data.articles?.length > 0) {
        setSelectedArticle(data.articles[0]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-cyan-300 p-4">

      <div className="border border-cyan-400 rounded-2xl p-5 mb-5 bg-[#111]">
        <h1 className="text-5xl font-bold text-cyan-400">
          GENESIS
        </h1>

        <p className="text-sm text-cyan-200 mt-2">
          Geopolitical Intelligence System
        </p>

        <div className="mt-5">
          <h2 className="text-3xl font-bold">
            Late night operations online, Ghost.
          </h2>

          <p className="mt-2 text-cyan-100">
            Genesis is monitoring {activeTopic.label}.
          </p>

          <p className="mt-2 text-sm text-cyan-500">
            Last updated: {time}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-5">

        <div className="border border-cyan-400 rounded-2xl p-5 bg-[#111]">
          <h2>Northeast India</h2>
          <p className="text-4xl font-bold text-cyan-300 mt-2">
            Watch
          </p>
          <p className="mt-2 text-cyan-100">
            Regional feed active
          </p>
        </div>

        <div className="border border-red-400 rounded-2xl p-5 bg-[#111]">
          <h2>Cyber Threat Level</h2>
          <p className="text-4xl font-bold text-red-400 mt-2">
            Medium
          </p>
          <p className="mt-2 text-cyan-100">
            Scam activity detected
          </p>
        </div>

        <div className="border border-green-400 rounded-2xl p-5 bg-[#111]">
          <h2>Active Surveillance</h2>
          <p className="text-4xl font-bold text-green-400 mt-2">
            24/7
          </p>
          <p className="mt-2 text-cyan-100">
            News API connected
          </p>
        </div>

        <div className="border border-yellow-400 rounded-2xl p-5 bg-[#111]">
          <h2>Global Alerts</h2>
          <p className="text-4xl font-bold text-yellow-300 mt-2">
            {news.length}
          </p>
          <p className="mt-2 text-cyan-100">
            Live articles loaded
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">

        <div className="border border-cyan-400 rounded-2xl p-5 bg-[#111]">

          <h2 className="text-4xl font-bold mb-2">
            Live Geopolitical Feed
          </h2>

          <p className="text-sm text-cyan-500 mb-5">
            Current topic: {activeTopic.label}
          </p>

          <div className="space-y-5 max-h-[700px] overflow-y-auto">

            {news.map((article, index) => (

              <div
                key={index}
                onClick={() => setSelectedArticle(article)}
                className="border border-cyan-700 rounded-2xl p-4 bg-[#1a1a1a] hover:border-cyan-300 cursor-pointer transition"
              >

                {article.image && (
                  <img
                    src={article.image}
                    alt="news"
                    className="rounded-xl mb-3 w-full h-[220px] object-cover"
                  />
                )}

                <h3 className="text-2xl font-bold text-cyan-300">
                  {article.title}
                </h3>

                <p className="text-sm text-cyan-500 mt-1">
                  Source: {article.source}
                </p>

                <p className="mt-3 text-cyan-100">
                  {article.description}
                </p>

                <a
                  href={article.url}
                  target="_blank"
                  className="inline-block mt-4 text-cyan-400 underline"
                >
                  Read full article →
                </a>

              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">

          <div className="border border-cyan-400 rounded-2xl p-5 bg-[#111]">

            <h2 className="text-4xl font-bold mb-4">
              Intelligence Map
            </h2>

            <GenesisMap target={activeTopic.target} />

          </div>

          <div className="border border-green-400 rounded-2xl p-5 bg-[#111]">

            <h2 className="text-4xl font-bold mb-4 text-green-400">
              Command Console
            </h2>

            <div className="space-y-3">

              {commands.map((command, index) => (

                <button
                  key={index}
                  onClick={() => setActiveTopic(command)}
                  className="w-full border border-green-400 rounded-xl p-3 text-left hover:bg-green-900 transition"
                >
                  {">"} {command.label}
                </button>

              ))}
            </div>

            <div className="mt-5 text-green-400 font-mono">
              {">"} Awaiting command...
            </div>

          </div>

          {selectedArticle && (

            <div className="border border-purple-500 rounded-2xl p-5 bg-[#111]">

              <h2 className="text-3xl font-bold text-purple-400 mb-4">
                Intelligence Preview
              </h2>

              {selectedArticle.image && (
                <img
                  src={selectedArticle.image}
                  alt="preview"
                  className="rounded-xl mb-4 w-full h-[250px] object-cover"
                />
              )}

              <h3 className="text-2xl font-bold text-cyan-300">
                {selectedArticle.title}
              </h3>

              <p className="mt-3 text-cyan-100">
                {selectedArticle.description}
              </p>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}