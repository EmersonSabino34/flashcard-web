"use client";

import { create } from "zustand";
import {
  ProgressState,
  StudySession,
  VocabularyCategory
} from "@/types";
import {
  addStudySession,
  createInitialProgressState,
  updateCheckpoint
} from "@/lib/progress";
import { loadProgress, persistProgress, clearProgress } from "@/lib/storage";

interface ProgressStore {
  state: ProgressState;
  hydrated: boolean;
  hydrate: () => void;
  recordSession: (
    category: VocabularyCategory | "verbs",
    total: number,
    correct: number,
    incorrect: number,
    durationSeconds: number
  ) => void;
  markCard: (cardId: string, correct: boolean) => void;
  reset: () => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  state: createInitialProgressState(),
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) {
      return;
    }
    const stored = loadProgress();
    set({
      state: stored ?? createInitialProgressState(),
      hydrated: true
    });
  },
  recordSession: (
    category,
    total,
    correct,
    incorrect,
    durationSeconds
  ) => {
    const session: StudySession = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `session-${Date.now()}`,
      category,
      total,
      correct,
      incorrect,
      durationSeconds,
      timestamp: Date.now()
    };

    set((current) => {
      const updated = addStudySession(current.state, session);
      persistProgress(updated);
      return { state: updated };
    });
  },
  markCard: (cardId, correct) => {
    set((current) => {
      const updated = updateCheckpoint(current.state, cardId, correct);
      persistProgress(updated);
      return { state: updated };
    });
  },
  reset: () => {
    const baseline = createInitialProgressState();
    clearProgress();
    set({
      state: baseline,
      hydrated: true
    });
  }
}));
