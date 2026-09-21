import { NextResponse } from "next/server";
import { MARKET_ASSETS, type MarketData } from "@/app/lib/market-assets";

export async function GET() {
  const ids = MARKET_ASSETS.map((asset) => asset.id).join(",");
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Market data provider returned an error" },
        { status: 502 }
      );
    }

    const data: MarketData = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Market data service unavailable" },
      { status: 502 }
    );
  }
}
