"use client";

import { useEffect } from "react";
import { BottomNav } from "@/components/BottomNav";
import { VerbGame } from "@/components/VerbGame";
import verbsData from "@/data/verbs.json";
import { useProgressStore } from "@/store/useProgressStore";
import type { VerbEntry } from "@/types";

const verbs = verbsData as VerbEntry[];

export default function VerbPracticePage() {
  const hydrate = useProgressStore((state) => state.hydrate);
  const hydrated = useProgressStore((state) => state.hydrated);
  const recordSession = useProgressStore((state) => state.recordSession);

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrate, hydrated]);

  return (
    <main className="relative pb-28">
      <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-4xl flex-col px-6 py-12">
        <div className="flex flex-1 items-center justify-center">
          <VerbGame
            verbs={verbs}
            rounds={10}
            onSessionComplete={(summary) =>
              recordSession(
                "verbs",
                summary.total,
                summary.correct,
                summary.incorrect,
                summary.durationSeconds
              )
            }
          />
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
