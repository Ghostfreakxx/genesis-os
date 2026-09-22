import { NextResponse } from "next/server";
import { fetchNewsArticles } from "@/app/lib/news";

type BriefingMode = "live" | "offline" | "error";

interface CacheEntry {
  briefing: string;
  expires: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map<string, CacheEntry>();

const ANTHROPIC_MODEL = "claude-haiku-4-5-20251001";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "India";
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ briefing: null, mode: "offline" satisfies BriefingMode });
  }

  const cached = cache.get(topic);
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json({ briefing: cached.briefing, mode: "live" satisfies BriefingMode });
  }

  try {
    const { articles } = await fetchNewsArticles(topic);
    const sourceText = articles
      .slice(0, 5)
      .map((article, index) => `${index + 1}. ${article.title} — ${article.description}`)
      .join("\n");

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 220,
        system:
          "You are a blunt tactical intelligence analyst writing a short SITREP for a monitoring dashboard. Summarize only what the provided headlines actually say. 3-4 sentences, direct, no hedging, no bullet points, no markdown.",
        messages: [
          {
            role: "user",
            content: `Sector: ${topic}\n\nHeadlines:\n${sourceText}\n\nWrite the SITREP.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ briefing: null, mode: "error" satisfies BriefingMode });
    }

    const data = await response.json();
    const briefing: string | undefined = data?.content?.[0]?.text?.trim();

    if (!briefing) {
      return NextResponse.json({ briefing: null, mode: "error" satisfies BriefingMode });
    }

    cache.set(topic, { briefing, expires: Date.now() + CACHE_TTL_MS });

    return NextResponse.json({ briefing, mode: "live" satisfies BriefingMode });
  } catch {
    return NextResponse.json({ briefing: null, mode: "error" satisfies BriefingMode });
  }
}
