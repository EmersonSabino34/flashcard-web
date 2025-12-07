"use client";

import { twMerge } from "tailwind-merge";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
}

export function Card({
  className,
  glow = false,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={twMerge(
        "rounded-3xl border border-white/60 bg-white/80 p-6 shadow-card backdrop-blur transition-all",
        glow ? "ring-2 ring-primary-200" : "",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
