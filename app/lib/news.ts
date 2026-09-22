export interface Article {
  title: string;
  description: string;
  url: string;
  image: string;
  source: string;
}

export const FALLBACK_ARTICLES: Article[] = [
  {
    title: "India strengthens regional security watch across sensitive border zones",
    description:
      "Public reports continue to highlight border security, cyber awareness, and regional instability as important issues for Northeast India.",
    url: "https://news.google.com/search?q=India%20Northeast%20border%20security",
    image:
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=1200&q=80",
    source: "Genesis fallback",
  },
  {
    title: "Myanmar instability remains a major concern for India’s eastern frontier",
    description:
      "Conflict, smuggling networks, refugee movement, and weak governance continue to shape public discussion around the India Myanmar border.",
    url: "https://news.google.com/search?q=India%20Myanmar%20border%20conflict",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    source: "Genesis fallback",
  },
  {
    title: "Cybersecurity awareness becomes a public governance issue",
    description:
      "Scams, phishing, weak passwords, and digital fraud show why cyber hygiene is now part of everyday public safety.",
    url: "https://news.google.com/search?q=India%20cybersecurity%20scam%20fraud",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    source: "Genesis fallback",
  },
];

interface GNewsArticle {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  source?: { name?: string };
}

export type NewsMode = "live" | "fallback";

export interface NewsResult {
  articles: Article[];
  mode: NewsMode;
  note?: string;
}

export async function fetchNewsArticles(topic: string): Promise<NewsResult> {
  const apiKey = process.env.GNEWS_API_KEY;

  try {
    if (!apiKey) {
      return {
        articles: FALLBACK_ARTICLES,
        mode: "fallback",
        note: "Missing GNEWS_API_KEY",
      };
    }

    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      topic
    )}&lang=en&max=10&apikey=${apiKey}`;

    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    const rawArticles: GNewsArticle[] = data.articles || [];
    const articles: Article[] = rawArticles.map((article) => ({
      title: article.title || "No title",
      description: article.description || "No description available.",
      url: article.url || "#",
      image: article.image || "",
      source: article.source?.name || "Unknown",
    }));

    if (articles.length === 0) {
      return {
        articles: FALLBACK_ARTICLES,
        mode: "fallback",
        note: "GNews returned empty result",
      };
    }

    return { articles, mode: "live" };
  } catch {
    return {
      articles: FALLBACK_ARTICLES,
      mode: "fallback",
      note: "GNews request failed",
    };
  }
}
