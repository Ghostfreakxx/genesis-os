"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store for operator preferences.
 *
 * Uses useSyncExternalStore so the server render (and first client render)
 * always use the fallback, avoiding hydration mismatches, and so every
 * component reading the same key stays in sync. Storage failures (private
 * mode, blocked site data) silently fall back to in-memory state.
 */

const listeners = new Map<string, Set<() => void>>();
const memory = new Map<string, string | null>();
const parsedCache = new Map<string, { raw: string | null; value: unknown }>();

function readRaw(key: string): string | null {
  if (memory.has(key)) return memory.get(key) ?? null;
  try {
    const raw = window.localStorage.getItem(key);
    memory.set(key, raw);
    return raw;
  } catch {
    return null;
  }
}

function writeRaw(key: string, raw: string) {
  memory.set(key, raw);
  try {
    window.localStorage.setItem(key, raw);
  } catch {
    // keep the in-memory copy
  }
  listeners.get(key)?.forEach((listener) => listener());
}

function subscribe(key: string, listener: () => void) {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === key) {
      memory.set(key, event.newValue);
      listener();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    set.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useLocalStore<T>(
  key: string,
  fallback: T,
  validate: (value: unknown) => value is T
): [T, (update: T | ((prev: T) => T)) => void] {
  const getSnapshot = useCallback((): T => {
    const raw = readRaw(key);
    const cached = parsedCache.get(key);
    if (cached && cached.raw === raw) return cached.value as T;

    let value: T = fallback;
    if (raw !== null) {
      try {
        const parsed: unknown = JSON.parse(raw);
        if (validate(parsed)) value = parsed;
      } catch {
        // corrupt entry: use fallback
      }
    }
    parsedCache.set(key, { raw, value });
    return value;
  }, [key, fallback, validate]);

  const value = useSyncExternalStore(
    useCallback((listener) => subscribe(key, listener), [key]),
    getSnapshot,
    () => fallback
  );

  const setValue = useCallback(
    (update: T | ((prev: T) => T)) => {
      const prev = getSnapshot();
      const next =
        typeof update === "function" ? (update as (prev: T) => T)(prev) : update;
      writeRaw(key, JSON.stringify(next));
    },
    [key, getSnapshot]
  );

  return [value, setValue];
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
