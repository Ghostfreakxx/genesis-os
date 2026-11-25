"use client";

import { useEffect, useEffectEvent, useState } from "react";
import { matchKeywords } from "@/app/lib/alerts";

type Article = {
  title: string;
  description?: string;
  url: string;
  source?: string;
};

export interface FeedMatch {
  keyword: string;
  title: string;
  url: string;
}

interface LiveNewsFeedProps {
  topic: string;
  keywords?: string[];
  onMatches?: (matches: FeedMatch[]) => void;
}

export default function LiveNewsFeed({ topic, keywords = [], onMatches }: LiveNewsFeedProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<"live" | "fallback" | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadNews() {
      setLoading(true);
      try {
        const res = await fetch(`/api/news?topic=${encodeURIComponent(topic)}`);
        const data = await res.json();
        if (cancelled) return;
        setArticles(data.articles || []);
        setMode(data.mode === "live" ? "live" : "fallback");
      } catch {
        if (cancelled) return;
        setArticles([]);
        setMode("fallback");
      }
      setLoading(false);
    }

    loadNews();
    return () => {
      cancelled = true;
    };
  }, [topic]);

  const visible = articles.slice(0, 5);

  const reportMatches = useEffectEvent((list: Article[], watch: string[]) => {
    if (!onMatches || watch.length === 0) return;
    const matches: FeedMatch[] = [];
    for (const article of list) {
      const hits = matchKeywords(`${article.title} ${article.description ?? ""}`, watch);
      for (const keyword of hits) {
        matches.push({ keyword, title: article.title, url: article.url });
      }
    }
    if (matches.length > 0) onMatches(matches);
  });

  // Live headlines only: fallback articles are static filler, not real signals.
  useEffect(() => {
    if (mode === "live") reportMatches(articles, keywords);
  }, [articles, keywords, mode]);

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

      {!loading && mode === "fallback" && (
        <p className="text-amber-300/90 text-sm mt-4">
          No live articles loaded. System using fallback mode.
        </p>
      )}

      <div className="mt-4 space-y-2">
        {visible.map((article, index) => {
          const hits = matchKeywords(
            `${article.title} ${article.description ?? ""}`,
            keywords
          );
          const flagged = hits.length > 0;

          return (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className={`group block panel-inset p-4 transition-colors ${
                flagged
                  ? "border-amber-400/50 bg-amber-400/[0.06] hover:bg-amber-400/10"
                  : "hover:border-accent/40 hover:bg-white/[0.04]"
              }`}
            >
              <p className="text-slate-100 font-medium leading-snug group-hover:text-white">
                {article.title}
              </p>

              <p className="text-slate-400 text-sm mt-1.5 line-clamp-2">
                {article.description || "No description available."}
              </p>

              <div className="flex items-center justify-between gap-2 flex-wrap mt-3">
                <p className="font-tactical text-[11px] uppercase tracking-wider text-accent/70">
                  {article.source || "Public feed"}
                </p>
                {flagged && (
                  <p className="font-tactical text-[11px] uppercase tracking-wider text-amber-300">
                    ⚠ Keyword hit: {hits.join(", ")}
                  </p>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
