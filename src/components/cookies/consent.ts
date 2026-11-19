import { useSyncExternalStore } from "react";

/**
 * Magazyn zgód na pliki cookie / treści zewnętrzne.
 * - zero zależności poza Reactem,
 * - bezpieczny dla prerenderu (SSG): po stronie serwera i podczas hydracji ready=false,
 * - zgoda w localStorage, wygasa po 12 miesiącach lub po zmianie CONSENT_VERSION.
 *
 * Nowa kategoria (np. analityka): dopisz ją do ConsentCategory, DEFAULTS i CONSENT_CATEGORIES,
 * a kod, który wymaga zgody, uruchamiaj dopiero gdy useConsent().categories.analytics === true.
 */

export type ConsentCategory = "external";

export const CONSENT_CATEGORIES: {
  id: ConsentCategory;
  label: string;
  description: string;
}[] = [
  {
    id: "external",
    label: "Treści zewnętrzne (Mapy Google)",
    description:
      "Mapa dojazdu na stronie Kontakt. Po włączeniu mapa ładuje się automatycznie, a Google może zapisywać własne pliki cookie i otrzymywać dane o wizycie.",
  },
];

export type ConsentChoices = Record<ConsentCategory, boolean>;

const STORAGE_KEY = "ds_consent";
const CONSENT_VERSION = 1;
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;

const DEFAULTS: ConsentChoices = { external: false };

type Stored = { v: number; ts: number; categories: ConsentChoices };

export type ConsentState = {
  /** false na serwerze i do czasu odczytu localStorage (nie pokazuj wtedy banera) */
  ready: boolean;
  /** czy użytkownik już podjął decyzję */
  decided: boolean;
  settingsOpen: boolean;
  categories: ConsentChoices;
};

const serverState: ConsentState = {
  ready: false,
  decided: false,
  settingsOpen: false,
  categories: DEFAULTS,
};

let state: ConsentState = serverState;
let initialized = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function read(): Stored | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Stored;
    if (parsed.v !== CONSENT_VERSION) return null;
    if (Date.now() - parsed.ts > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

function write(categories: ConsentChoices) {
  try {
    const value: Stored = { v: CONSENT_VERSION, ts: Date.now(), categories };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // localStorage zablokowany: wybór obowiązuje do końca sesji karty
  }
}

function apply(stored: Stored | null) {
  state = {
    ...state,
    ready: true,
    decided: stored !== null,
    categories: { ...DEFAULTS, ...(stored?.categories ?? {}) },
  };
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  apply(read());
  // synchronizacja między kartami
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      apply(read());
      emit();
    }
  });
}

function commit(categories: ConsentChoices) {
  init();
  write(categories);
  state = { ...state, ready: true, decided: true, settingsOpen: false, categories };
  emit();
}

export function acceptAll() {
  commit({ external: true });
}

export function rejectAll() {
  commit({ external: false });
}

export function save(categories: ConsentChoices) {
  commit(categories);
}

export function openCookieSettings() {
  init();
  state = { ...state, settingsOpen: true };
  emit();
}

export function closeSettings() {
  if (!state.settingsOpen) return;
  state = { ...state, settingsOpen: false };
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  init();
  return state;
}

export function useConsent(): ConsentState {
  return useSyncExternalStore(subscribe, getSnapshot, () => serverState);
}
