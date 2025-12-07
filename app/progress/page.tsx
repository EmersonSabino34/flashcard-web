"use client";

import { useEffect } from "react";
import { BottomNav } from "@/components/BottomNav";
import { ProgressDashboard } from "@/components/ProgressDashboard";
import { useProgressStore } from "@/store/useProgressStore";
import { Button } from "@/components/ui/Button";

export default function ProgressPage() {
  const hydrate = useProgressStore((state) => state.hydrate);
  const hydrated = useProgressStore((state) => state.hydrated);
  const progress = useProgressStore((state) => state.state);
  const reset = useProgressStore((state) => state.reset);

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrate, hydrated]);

  return (
    <main className="relative pb-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
        <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs uppercase tracking-wide text-primary-500">
              Progress overview
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Celebrate what you have already mastered.
            </h1>
            <p className="text-sm text-slate-500">
              Your study history lives locally in your browser. Clear it anytime
              for a fresh start.
            </p>
          </div>
          <Button variant="secondary" onClick={reset}>
            Reset progress
          </Button>
        </header>

        <ProgressDashboard progress={progress} />
      </div>
      <BottomNav />
    </main>
  );
}
