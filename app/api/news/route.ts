import { NextResponse } from "next/server";
import { fetchNewsArticles } from "@/app/lib/news";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "India";

  const { articles, mode, note } = await fetchNewsArticles(topic);

  return NextResponse.json({
    articles,
    count: articles.length,
    mode,
    topic,
    ...(note ? { note } : {}),
  });
}
