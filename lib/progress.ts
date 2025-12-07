import { ProgressState, StudySession } from "@/types";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function createInitialProgressState(): ProgressState {
  return {
    totals: {
      studiedCards: 0,
      masteredCards: 0,
      studiedVerbs: 0,
      masteredVerbs: 0,
      streak: 0,
      lastStudyDate: null
    },
    checkpoints: {},
    sessions: []
  };
}

export function addStudySession(
  state: ProgressState,
  session: StudySession
): ProgressState {
  const sessions = [session, ...state.sessions].slice(0, 50);
  const totals = { ...state.totals };

  if (session.category === "verbs") {
    totals.studiedVerbs += session.total;
    totals.masteredVerbs += session.correct;
  } else {
    totals.studiedCards += session.total;
    totals.masteredCards += session.correct;
  }

  totals.streak = calculateStreak(
    totals.lastStudyDate,
    session.timestamp,
    totals.streak
  );
  totals.lastStudyDate = new Date(session.timestamp).toISOString();

  return {
    ...state,
    totals,
    sessions
  };
}

export function updateCheckpoint(
  state: ProgressState,
  cardId: string,
  correct: boolean
): ProgressState {
  const checkpoint = state.checkpoints[cardId] ?? {
    cardId,
    confidence: 0,
    correctStreak: 0,
    incorrectStreak: 0,
    lastStudiedAt: null
  };

  const correctStreak = correct ? checkpoint.correctStreak + 1 : 0;
  const incorrectStreak = correct
    ? 0
    : Math.min(checkpoint.incorrectStreak + 1, 3);
  const confidence = Math.max(
    0,
    Math.min(2, correct ? checkpoint.confidence + 1 : checkpoint.confidence - 1)
  ) as 0 | 1 | 2;

  return {
    ...state,
    checkpoints: {
      ...state.checkpoints,
      [cardId]: {
        ...checkpoint,
        correctStreak,
        incorrectStreak,
        confidence,
        lastStudiedAt: Date.now()
      }
    }
  };
}

export function calculateStreak(
  lastStudyISO: string | null,
  nextTimestamp: number,
  currentStreak: number
): number {
  if (!lastStudyISO) {
    return 1;
  }

  const lastStudy = new Date(lastStudyISO).getTime();
  const diffDays = Math.floor((nextTimestamp - lastStudy) / MS_PER_DAY);

  if (diffDays <= 0) {
    return Math.max(1, currentStreak);
  }

  if (diffDays === 1) {
    return currentStreak + 1;
  }

  return 1;
}
