"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { VocabularyCategory } from "@/types";

interface CategoryCardProps {
  category: VocabularyCategory;
  title: string;
  description: string;
  icon: string;
  totalCards: number;
  mastered?: number;
}

export function CategoryCard({
  category,
  title,
  description,
  icon,
  totalCards,
  mastered = 0
}: CategoryCardProps) {
  const masteryPercent =
    totalCards > 0 ? Math.round((mastered / totalCards) * 100) : 0;

  return (
    <motion.div
      className="group flex flex-col justify-between rounded-3xl border border-white/60 bg-white/80 p-6 shadow-card backdrop-blur transition hover:-translate-y-1 hover:shadow-xl"
      whileHover={{ scale: 1.01 }}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>
        <div className="rounded-2xl bg-primary-50/80 p-4 text-sm text-primary-700">
          <p className="font-semibold">
            {mastered} / {totalCards} mastered
          </p>
          <p className="text-xs text-primary-500">
            {masteryPercent || 0}% mastery
          </p>
        </div>
      </div>
      <Link
        href={`/vocabulary/${category}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary-600 transition group-hover:gap-3"
      >
        Start practicing
        <span aria-hidden>→</span>
      </Link>
    </motion.div>
  );
}
