"use client";

import { twMerge } from "tailwind-merge";

interface ProgressBarProps {
  value: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ value, label, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={twMerge("space-y-2", className)}>
      {label && <p className="text-sm font-medium text-slate-600">{label}</p>}
      <div className="h-3 w-full overflow-hidden rounded-full bg-primary-100">
        <div
          className="h-full rounded-full bg-primary-500 transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
