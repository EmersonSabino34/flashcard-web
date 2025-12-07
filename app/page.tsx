"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { BottomNav } from "@/components/BottomNav";
import { StreakDisplay } from "@/components/StreakDisplay";
import { vocabularyCategories } from "@/data/vocabulary";
import { useProgressStore } from "@/store/useProgressStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

const FEATURE_CARDS = [
  {
    title: "Flip & master cards",
    description:
      "Interactive flashcards with pronunciations, examples, and confidence tracking."
  },
  {
    title: "Verb conjugation drills",
    description:
      "Practice the most used Portuguese verbs with intelligent repetition."
  },
  {
    title: "Offline progress",
    description:
      "Everything is saved locally so you can practice anywhere, anytime."
  }
];

export default function HomePage() {
  const hydrate = useProgressStore((state) => state.hydrate);
  const streak = useProgressStore((state) => state.state.totals.streak);
  const hydrated = useProgressStore((state) => state.hydrated);
  const router = useRouter();

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrate, hydrated]);

  return (
    <main className="relative pb-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-12">
        <header className="space-y-6">
          <StreakDisplay streak={streak} />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-card backdrop-blur"
          >
            <div className="max-w-xl space-y-4">
              <motion.h1 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">
                Portuguese mastery starts here.
              </motion.h1>
              <p className="text-lg text-slate-600">
                Study Brazilian Portuguese vocabulary decks curated for Escola
                Bom Dia students, and drill verb conjugations that actually show
                up day-to-day.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={() => router.push("/vocabulary")}>
                  Start flashcards
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => router.push("/verbs")}
                >
                  Practice verbs
                </Button>
              </div>
            </div>
          </motion.div>
        </header>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">
              What&apos;s inside the MVP
            </h2>
            <Link
              href="/doc/mvp_simplified_spec"
              className="text-sm font-medium text-primary-600 underline-offset-4 hover:underline"
            >
              Read the MVP spec
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {FEATURE_CARDS.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-white/80 bg-white/80 p-6 text-slate-700 shadow-card backdrop-blur"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">
            The core decks
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {vocabularyCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-white/80 bg-white/80 p-5 text-slate-700 shadow-card backdrop-blur"
              >
                <div className="text-2xl">{category.icon}</div>
                <p className="mt-2 text-sm uppercase tracking-wide text-primary-500">
                  {category.title}
                </p>
                <p className="mt-3 text-sm text-slate-500">
                  {category.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <BottomNav />
    </main>
  );
}
