import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "geopolitics";
  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ articles: [], error: "Missing API key" });
  }

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        topic
      )}&lang=en&max=6&apikey=${apiKey}`,
      { cache: "no-store" }
    );

    const data = await response.json();

    const articles = (data.articles || []).map((article: any) => ({
      title: article.title || "No title",
      description: article.description || "No description available.",
      url: article.url || "#",
      image: article.image || "",
      source: article.source?.name || "Unknown",
    }));

    return NextResponse.json({ articles });
  } catch {
    return NextResponse.json({ articles: [], error: "Failed to fetch news" });
  }
}