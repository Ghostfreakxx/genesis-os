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
    <div className="mt-4">
      <div className="flex items-baseline justify-between gap-3 flex-wrap">
        <h2 className="text-xl font-semibold tracking-tight text-white">
          Live Signal Feed
        </h2>

        <p className="font-tactical text-xs uppercase tracking-wider text-slate-500">
          Scan: {topic}
        </p>
      </div>

      {loading && (
        <p className="text-accent/80 text-sm mt-4 animate-pulse">
          Scanning public sources...
        </p>
      )}

      {!loading && articles.length === 0 && (
        <p className="text-amber-300/90 text-sm mt-4">
          No live articles loaded. System using fallback mode.
        </p>
      )}

      <div className="mt-4 space-y-2">
        {articles.slice(0, 5).map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            className="group block panel-inset p-4 hover:border-accent/40 hover:bg-white/[0.04] transition-colors"
          >
            <p className="text-slate-100 font-medium leading-snug group-hover:text-white">
              {article.title}
            </p>

            <p className="text-slate-400 text-sm mt-1.5 line-clamp-2">
              {article.description || "No description available."}
            </p>

            <p className="font-tactical text-[11px] uppercase tracking-wider text-accent/70 mt-3">
              {article.source || "Public feed"}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
