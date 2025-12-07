"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { CategoryCard } from "@/components/CategoryCard";
import { vocabularyCategories, vocabularyMap } from "@/data/vocabulary";
import { useProgressStore } from "@/store/useProgressStore";

export default function VocabularyLandingPage() {
  const hydrate = useProgressStore((state) => state.hydrate);
  const hydrated = useProgressStore((state) => state.hydrated);
  const checkpoints = useProgressStore((state) => state.state.checkpoints);

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrate, hydrated]);

  return (
    <main className="relative pb-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-12">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-primary-500">
            Vocabulary decks
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Choose a category to dive into everyday Brazilian Portuguese.
          </h1>
          <p className="text-sm text-slate-500">
            Each deck includes essential vocabulary, example sentences, and
            confidence tracking. Aim for 100% mastery!
          </p>
        </header>
        <section className="grid gap-4 md:grid-cols-2">
          {vocabularyCategories.map((category) => {
            const total = vocabularyMap[category.id].length;
            const mastered = vocabularyMap[category.id].filter((card) => {
              const checkpoint = checkpoints[card.id];
              return checkpoint?.confidence === 2;
            }).length;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CategoryCard
                  category={category.id}
                  title={category.title}
                  description={category.description}
                  icon={category.icon}
                  totalCards={total}
                  mastered={mastered}
                />
              </motion.div>
            );
          })}
        </section>
      </div>
      <BottomNav />
    </main>
  );
}
