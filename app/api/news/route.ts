import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "geopolitics india myanmar china";

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${encodeURIComponent(
        topic
      )}&lang=en&max=6&apikey=${process.env.GNEWS_API_KEY}`
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}