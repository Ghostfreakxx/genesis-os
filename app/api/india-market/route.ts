import { NextResponse } from "next/server";
import {
  INDIA_MARKET_ASSETS,
  type IndiaMarketData,
  type IndiaMarketMode,
  type IndiaQuote,
} from "@/app/lib/india-market-assets";

// Representative fallback values used only when the live quote feed is
// unreachable, so the panel never renders blank.
const FALLBACK_DATA: IndiaMarketData = {
  "^NSEI": { price: 24800, changePercent: 0.32 },
  "^BSESN": { price: 81400, changePercent: 0.28 },
  "^NSEBANK": { price: 52300, changePercent: 0.15 },
  "RELIANCE.NS": { price: 2950, changePercent: -0.4 },
  "TCS.NS": { price: 4150, changePercent: 0.6 },
  "HDFCBANK.NS": { price: 1720, changePercent: 0.1 },
  "INFY.NS": { price: 1830, changePercent: -0.2 },
  "ICICIBANK.NS": { price: 1275, changePercent: 0.5 },
};

async function fetchQuote(symbol: string): Promise<IndiaQuote | null> {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol
  )}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  if (!res.ok) return null;

  const json = await res.json();
  const meta = json?.chart?.result?.[0]?.meta;
  const price = meta?.regularMarketPrice;
  const prevClose = meta?.previousClose ?? meta?.chartPreviousClose;

  if (typeof price !== "number" || typeof prevClose !== "number" || prevClose === 0) {
    return null;
  }

  return { price, changePercent: ((price - prevClose) / prevClose) * 100 };
}

export async function GET() {
  try {
    const results = await Promise.allSettled(
      INDIA_MARKET_ASSETS.map((asset) => fetchQuote(asset.symbol))
    );

    const data: IndiaMarketData = {};
    let liveCount = 0;

    results.forEach((result, index) => {
      const { symbol } = INDIA_MARKET_ASSETS[index];
      if (result.status === "fulfilled" && result.value) {
        data[symbol] = result.value;
        liveCount += 1;
      } else {
        data[symbol] = FALLBACK_DATA[symbol];
      }
    });

    const mode: IndiaMarketMode =
      liveCount === INDIA_MARKET_ASSETS.length
        ? "live"
        : liveCount > 0
          ? "partial"
          : "fallback";

    return NextResponse.json({ data, mode });
  } catch {
    return NextResponse.json({ data: FALLBACK_DATA, mode: "fallback" });
  }
}
