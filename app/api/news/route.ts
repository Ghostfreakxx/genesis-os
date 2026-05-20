import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const topic =
    searchParams.get("topic") ||
    "Mizoram OR Manipur OR Assam";

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${topic}&lang=en&max=6&apikey=${process.env.GNEWS_API_KEY}`
    );

    const data = await response.json();

    const articles = data.articles.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      image: article.image,
      source: article.source?.name || "Unknown",
    }));

    return NextResponse.json({ articles });

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}