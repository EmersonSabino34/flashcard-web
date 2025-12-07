import { ProgressState } from "@/types";

const STORAGE_KEY = "flashcards-progress";

export const isBrowser = typeof window !== "undefined";

export function loadProgress(): ProgressState | null {
  if (!isBrowser) {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return null;
    }
    return JSON.parse(stored) as ProgressState;
  } catch (error) {
    console.warn("Failed to read progress from localStorage", error);
    return null;
  }
}

export function persistProgress(state: ProgressState) {
  if (!isBrowser) {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to save progress state", error);
  }
}

export function clearProgress() {
  if (!isBrowser) {
    return;
  }
  window.localStorage.removeItem(STORAGE_KEY);
}
