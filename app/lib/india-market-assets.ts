export type IndiaAssetCategory = "index" | "stock";

export interface IndiaMarketAsset {
  symbol: string;
  name: string;
  ticker: string;
  category: IndiaAssetCategory;
}

export const INDIA_MARKET_ASSETS: IndiaMarketAsset[] = [
  { symbol: "^NSEI", name: "Nifty 50", ticker: "NIFTY50", category: "index" },
  { symbol: "^BSESN", name: "Sensex", ticker: "SENSEX", category: "index" },
  { symbol: "^NSEBANK", name: "Bank Nifty", ticker: "BANKNIFTY", category: "index" },
  { symbol: "RELIANCE.NS", name: "Reliance Industries", ticker: "RELIANCE", category: "stock" },
  { symbol: "TCS.NS", name: "Tata Consultancy Services", ticker: "TCS", category: "stock" },
  { symbol: "HDFCBANK.NS", name: "HDFC Bank", ticker: "HDFCBANK", category: "stock" },
  { symbol: "INFY.NS", name: "Infosys", ticker: "INFY", category: "stock" },
  { symbol: "ICICIBANK.NS", name: "ICICI Bank", ticker: "ICICIBANK", category: "stock" },
];

export const HOW_TO_INVEST: Record<IndiaAssetCategory, string> = {
  index:
    "You can't buy an index directly. Invest via an index fund or ETF that tracks it, available on any SEBI-registered mutual fund platform or broker — a monthly SIP is the common way in.",
  stock:
    "Open a demat + trading account with a SEBI-registered broker, complete KYC, then buy shares directly on NSE/BSE during market hours (9:15 AM-3:30 PM IST).",
};

export interface IndiaQuote {
  price: number;
  changePercent: number;
}

export type IndiaMarketData = Partial<Record<string, IndiaQuote>>;

export type IndiaMarketMode = "live" | "partial" | "fallback";

export interface IndiaMarketResponse {
  data: IndiaMarketData;
  mode: IndiaMarketMode;
}
