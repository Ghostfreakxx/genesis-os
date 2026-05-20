import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "India";

  const apiKey = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({
      articles: [],
      error: "Missing GNEWS_API_KEY",
    });
  }

  try {
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      topic
    )}&lang=en&country=in&max=10&apikey=${apiKey}`;

    const response = await fetch(url, { cache: "no-store" });
    const data = await response.json();

    if (data.errors) {
      return NextResponse.json({
        articles: [],
        error: data.errors,
        raw: data,
      });
    }

    const articles = (data.articles || []).map((article: any) => ({
      title: article.title || "No title",
      description: article.description || "No description available.",
      url: article.url || "#",
      image: article.image || "",
      source: article.source?.name || "Unknown",
    }));

    return NextResponse.json({
      articles,
      count: articles.length,
      topic,
    });
  } catch (error) {
    return NextResponse.json({
      articles: [],
      error: "Failed to fetch news",
    });
  }
}