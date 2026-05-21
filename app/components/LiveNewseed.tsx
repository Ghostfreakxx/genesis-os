"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  description?: string;
  url: string;
  source?: string;
};

export default function LiveNewsFeed({ topic }: { topic: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);

      try {
        const res = await fetch(`/api/news?topic=${encodeURIComponent(topic)}`);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch {
        setArticles([]);
      }

      setLoading(false);
    }

    loadNews();
  }, [topic]);

  return (
    <div className="mt-6 border border-cyan-500 rounded-2xl p-5 bg-black">
      <h2 className="text-3xl font-bold text-cyan-300">
        Live Signal Feed
      </h2>

      <p className="text-zinc-400 mt-2">
        Current scan: {topic}
      </p>

      {loading && (
        <p className="text-green-400 mt-4 animate-pulse">
          Scanning public sources...
        </p>
      )}

      {!loading && articles.length === 0 && (
        <p className="text-red-400 mt-4">
          No live articles loaded. System using fallback mode.
        </p>
      )}

      <div className="mt-5 space-y-4">
        {articles.slice(0, 5).map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            className="block border border-zinc-700 rounded-xl p-4 hover:border-green-400 transition"
          >
            <p className="text-cyan-200 font-bold">
              {article.title}
            </p>

            <p className="text-zinc-400 text-sm mt-2">
              {article.description || "No description available."}
            </p>

            <p className="text-green-400 text-xs mt-3">
              Source: {article.source || "Public feed"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}