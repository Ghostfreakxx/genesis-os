"use client";

import { useCallback, useMemo } from "react";
import { isStringArray, useLocalStore } from "./local-store";
import { DEFAULT_SECTORS, findSector, type Sector } from "./sectors";
import {
  isAlertList,
  MAX_ALERTS,
  MAX_KEYWORDS,
  normalizeKeyword,
  type AlertEntry,
} from "./alerts";

const EMPTY_SECTORS: Sector[] = [];
const EMPTY_STRINGS: string[] = [];
const EMPTY_ALERTS: AlertEntry[] = [];
const DEFAULT_ACTIVE = "India Myanmar Border";

function isSectorList(value: unknown): value is Sector[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.label === "string" &&
        typeof item.threat === "string" &&
        typeof item.search === "string" &&
        typeof item.critic === "string"
    )
  );
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export type MutationResult = { ok: true; message: string } | { ok: false; message: string };

export function useWatchlist() {
  const [customSectors, setCustomSectors] = useLocalStore(
    "genesis.sectors.v1",
    EMPTY_SECTORS,
    isSectorList
  );
  const [keywords, setKeywords] = useLocalStore(
    "genesis.keywords.v1",
    EMPTY_STRINGS,
    isStringArray
  );
  const [alerts, setAlerts] = useLocalStore("genesis.alerts.v1", EMPTY_ALERTS, isAlertList);
  const [activeLabel, setActiveLabel] = useLocalStore(
    "genesis.active.v1",
    DEFAULT_ACTIVE,
    isString
  );

  const sectors = useMemo(
    () => [...DEFAULT_SECTORS, ...customSectors.map((sector) => ({ ...sector, custom: true }))],
    [customSectors]
  );

  const active =
    sectors.find((sector) => sector.label === activeLabel) ??
    sectors.find((sector) => sector.label === DEFAULT_ACTIVE) ??
    sectors[0];

  const addSector = useCallback(
    (sector: Sector): MutationResult => {
      if (!sector.label) return { ok: false, message: "SECTOR NAME REQUIRED." };
      const exists = sectors.some(
        (existing) => existing.label.toLowerCase() === sector.label.toLowerCase()
      );
      if (exists) return { ok: false, message: `SECTOR "${sector.label}" ALREADY MONITORED.` };
      setCustomSectors((prev) => [...prev, sector]);
      return { ok: true, message: `SECTOR ADDED: ${sector.label} [${sector.threat}]` };
    },
    [sectors, setCustomSectors]
  );

  const removeSector = useCallback(
    (query: string): MutationResult => {
      const match = findSector(sectors, query);
      if (!match) return { ok: false, message: `UNKNOWN SECTOR: "${query}".` };
      if (!match.custom) {
        return { ok: false, message: `${match.label} IS A CORE SECTOR AND CANNOT BE REMOVED.` };
      }
      setCustomSectors((prev) => prev.filter((sector) => sector.label !== match.label));
      return { ok: true, message: `SECTOR REMOVED: ${match.label}` };
    },
    [sectors, setCustomSectors]
  );

  const addKeyword = useCallback(
    (raw: string): MutationResult => {
      const keyword = normalizeKeyword(raw);
      if (!keyword) return { ok: false, message: "KEYWORD REQUIRED." };
      if (keywords.includes(keyword)) {
        return { ok: false, message: `ALREADY WATCHING "${keyword}".` };
      }
      if (keywords.length >= MAX_KEYWORDS) {
        return { ok: false, message: `KEYWORD LIMIT (${MAX_KEYWORDS}) REACHED.` };
      }
      setKeywords((prev) => [...prev, keyword]);
      return { ok: true, message: `WATCHING KEYWORD: "${keyword}"` };
    },
    [keywords, setKeywords]
  );

  const removeKeyword = useCallback(
    (raw: string): MutationResult => {
      const keyword = normalizeKeyword(raw);
      if (!keywords.includes(keyword)) {
        return { ok: false, message: `NOT WATCHING "${keyword}".` };
      }
      setKeywords((prev) => prev.filter((item) => item !== keyword));
      return { ok: true, message: `STOPPED WATCHING "${keyword}".` };
    },
    [keywords, setKeywords]
  );

  /** Records new alerts, skipping any already logged for the same headline + keyword. */
  const recordAlerts = useCallback(
    (incoming: Omit<AlertEntry, "id" | "at">[]): AlertEntry[] => {
      if (incoming.length === 0) return [];
      const known = new Set(alerts.map((alert) => alert.id));
      const now = Date.now();
      const fresh: AlertEntry[] = [];
      for (const entry of incoming) {
        const id = `${entry.keyword}::${entry.title}`;
        if (known.has(id)) continue;
        known.add(id);
        fresh.push({ ...entry, id, at: now });
      }
      if (fresh.length > 0) {
        setAlerts((prev) => [...fresh, ...prev].slice(0, MAX_ALERTS));
      }
      return fresh;
    },
    [alerts, setAlerts]
  );

  const clearAlerts = useCallback(() => setAlerts([]), [setAlerts]);

  return {
    sectors,
    active,
    setActiveLabel,
    addSector,
    removeSector,
    keywords,
    addKeyword,
    removeKeyword,
    alerts,
    recordAlerts,
    clearAlerts,
  };
}
