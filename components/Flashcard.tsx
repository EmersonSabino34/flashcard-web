"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { VocabularyCard } from "@/types";
import { Button } from "./ui/Button";

interface FlashcardProps {
  card: VocabularyCard;
  onMark: (correct: boolean) => void;
  index: number;
  total: number;
}

export function Flashcard({ card, index, total, onMark }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleReveal = () => setIsFlipped(true);
  const handleReset = () => setIsFlipped(false);

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 flex items-center justify-between text-sm text-slate-600">
        <span>
          Card {index + 1} of {total}
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="text-primary-500 underline-offset-2 hover:underline"
        >
          Reset card
        </button>
      </div>

      <div className="relative h-80 w-full perspective">
        <motion.div
          className="flashcard-rotate relative h-full w-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <motion.div
            className="flashcard-face absolute inset-0"
            style={{ backfaceVisibility: "hidden" }}
            aria-hidden={isFlipped}
          >
            <CardFace
              subtitle="Português"
              title={card.portuguese}
              id={card.id}
              footerLeft="Tap actions below"
              footerRight="Flip for answer"
            />
          </motion.div>
          <motion.div
            className="flashcard-face absolute inset-0"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
            aria-hidden={!isFlipped}
          >
            <CardFace
              subtitle="English"
              title={card.english}
              id={card.id}
              example={card.example}
              exampleTranslation={card.exampleTranslation}
              footerLeft="Mark your answer"
              footerRight="Tap below"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-6 flex gap-3">
        {!isFlipped ? (
          <Button className="flex-1" onClick={handleReveal}>
            Revelar tradução
          </Button>
        ) : (
          <>
            <Button
              className="flex-1"
              variant="ghost"
              onClick={() => {
              onMark(false);
              setIsFlipped(false);
            }}
          >
            Errei
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                onMark(true);
                setIsFlipped(false);
              }}
            >
              Acertei
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

interface CardFaceProps {
  subtitle: string;
  title: string;
  id: string;
  example?: string;
  exampleTranslation?: string;
  footerLeft: string;
  footerRight: string;
}

function CardFace({
  subtitle,
  title,
  id,
  example,
  exampleTranslation,
  footerLeft,
  footerRight
}: CardFaceProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/90 p-6 shadow-card backdrop-blur">
      <div className="flex items-center justify-between text-sm font-medium uppercase tracking-wide text-primary-400">
        <span>{subtitle}</span>
        <span>{id}</span>
      </div>
      <div className="mt-6 flex-1">
        <h2 className="font-display text-4xl font-semibold text-slate-900">
          {title}
        </h2>
        {example && (
          <div className="mt-6 space-y-2 text-base text-slate-600">
            <p className="italic text-slate-700">“{example}”</p>
            {exampleTranslation && (
              <p className="text-sm text-slate-500">{exampleTranslation}</p>
            )}
          </div>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-wider text-slate-400">
        <span>{footerLeft}</span>
        <span>{footerRight}</span>
      </div>
    </div>
  );
}
