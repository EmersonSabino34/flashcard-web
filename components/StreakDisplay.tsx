"use client";

interface StreakDisplayProps {
  streak: number;
}

export function StreakDisplay({ streak }: StreakDisplayProps) {
  if (!streak) {
    return (
      <div className="flex items-center gap-2 rounded-2xl bg-white/60 px-3 py-2 text-sm text-slate-600">
        <span>🔥</span>
        <span>Start studying to build your streak</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 rounded-2xl bg-white/80 px-3 py-2 text-sm font-semibold text-primary-600">
      <span role="img" aria-label="fire">
        🔥
      </span>
      <span>{streak} day streak</span>
    </div>
  );
}
