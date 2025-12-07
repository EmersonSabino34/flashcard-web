export type VocabularyCategory =
  | "airport"
  | "directions"
  | "doctor"
  | "greetings"
  | "hotel"
  | "pharmacy"
  | "restaurant"
  | "shopping";

export interface VocabularyCard {
  id: string;
  portuguese: string;
  english: string;
  example?: string;
  exampleTranslation?: string;
}

export type VerbTense = "present" | "preterite" | "imperfect" | "future";

export type VerbPerson =
  | "eu"
  | "tu"
  | "voce"
  | "nos"
  | "vos"
  | "eles";

export interface VerbEntry {
  infinitive: string;
  translation: string;
  regular: boolean;
  group: "ar" | "er" | "ir";
  conjugations: Record<VerbTense, Record<VerbPerson, string>>;
}

export interface ProgressTotals {
  studiedCards: number;
  masteredCards: number;
  studiedVerbs: number;
  masteredVerbs: number;
  streak: number;
  lastStudyDate: string | null;
}

export interface StudySession {
  id: string;
  timestamp: number;
  category: VocabularyCategory | "verbs";
  total: number;
  correct: number;
  incorrect: number;
  durationSeconds: number;
}

export interface StudyCheckpoint {
  cardId: string;
  correctStreak: number;
  incorrectStreak: number;
  lastStudiedAt: number | null;
  confidence: 0 | 1 | 2;
}

export interface ProgressState {
  totals: ProgressTotals;
  checkpoints: Record<string, StudyCheckpoint>;
  sessions: StudySession[];
}
