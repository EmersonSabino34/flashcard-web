"use client";

import { useEffect, useMemo, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Flashcard } from "@/components/Flashcard";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/Button";
import {
  vocabularyCategories,
  vocabularyMap
} from "@/data/vocabulary";
import { VocabularyCategory } from "@/types";
import { shuffleArray } from "@/lib/shuffle";
import { useProgressStore } from "@/store/useProgressStore";

export default function CategoryStudyPage() {
  const params = useParams<{ category: VocabularyCategory }>();
  const categoryId = params?.category;
  const router = useRouter();

  const hydrate = useProgressStore((state) => state.hydrate);
  const hydrated = useProgressStore((state) => state.hydrated);
  const markCard = useProgressStore((state) => state.markCard);
  const recordSession = useProgressStore((state) => state.recordSession);

  useEffect(() => {
    if (!hydrated) {
      hydrate();
    }
  }, [hydrate, hydrated]);

  const category = useMemo(
    () =>
      vocabularyCategories.find(
        (entry) => entry.id === categoryId
      ),
    [categoryId]
  );

  const cards = useMemo(() => {
    if (!categoryId) return [];
    return shuffleArray(vocabularyMap[categoryId]);
  }, [categoryId]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [sessionStart, setSessionStart] = useState(() => Date.now());

  useEffect(() => {
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setCompleted(false);
    setSessionStart(Date.now());
  }, [categoryId]);

  if (!categoryId || !category) {
    notFound();
  }

  const totalCards = cards.length;
  const currentCard = cards[currentIndex];

  const handleMark = (correct: boolean) => {
    markCard(currentCard.id, correct);
    if (correct) {
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setIncorrectAnswers((prev) => prev + 1);
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalCards) {
      setCompleted(true);
      const durationSeconds = Math.max(
        1,
        Math.round((Date.now() - sessionStart) / 1000)
      );
      recordSession(
        categoryId,
        totalCards,
        correct ? correctAnswers + 1 : correctAnswers,
        correct ? incorrectAnswers : incorrectAnswers + 1,
        durationSeconds
      );
    } else {
      setCurrentIndex(nextIndex);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setCompleted(false);
    setSessionStart(Date.now());
  };

  return (
    <main className="relative pb-28">
      <div className="mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-3xl flex-col px-6 py-10">
        <button
          type="button"
          className="text-sm font-medium text-primary-500 hover:text-primary-600"
          onClick={() => router.push("/vocabulary")}
        >
          ← Back to categories
        </button>
        <div className="mt-6 flex flex-1 flex-col items-center justify-center">
          {completed ? (
            <motion.div
              className="w-full max-w-md rounded-3xl bg-white/90 p-6 text-center shadow-card"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h2 className="text-2xl font-semibold text-slate-900">
                Deck complete! 🥳
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                You mastered {correctAnswers} of {totalCards} cards this run.
              </p>
              <div className="mt-6 grid gap-3 text-sm text-slate-700">
                <div className="rounded-2xl bg-primary-50/70 px-4 py-3">
                  Accuracy:{" "}
                  {Math.round((correctAnswers / totalCards) * 100)}%
                </div>
                <div className="rounded-2xl bg-primary-50/70 px-4 py-3">
                  Missed: {incorrectAnswers}
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Button onClick={handleRestart}>Study again</Button>
                <Button
                  variant="secondary"
                  onClick={() => router.push("/verbs")}
                >
                  Practice verbs next
                </Button>
              </div>
            </motion.div>
          ) : (
            currentCard && (
              <Flashcard
                card={currentCard}
                index={currentIndex}
                total={totalCards}
                onMark={handleMark}
              />
            )
          )}
        </div>
      </div>
      <BottomNav />
    </main>
  );
}
