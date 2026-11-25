export interface AlertEntry {
  id: string;
  keyword: string;
  title: string;
  url: string;
  sector: string;
  at: number;
}

export const MAX_ALERTS = 25;
export const MAX_KEYWORDS = 20;

export function normalizeKeyword(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ").slice(0, 40);
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Keywords that appear in the text as whole words (case-insensitive). */
export function matchKeywords(text: string, keywords: string[]): string[] {
  return keywords.filter((keyword) =>
    new RegExp(`(^|\\W)${escapeRegExp(keyword)}($|\\W)`, "i").test(text)
  );
}

export function isAlertList(value: unknown): value is AlertEntry[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.keyword === "string" &&
        typeof item.title === "string" &&
        typeof item.url === "string" &&
        typeof item.sector === "string" &&
        typeof item.at === "number"
    )
  );
}
