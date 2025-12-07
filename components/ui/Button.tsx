"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-500 text-white shadow-lg shadow-primary-500/30 hover:bg-primary-600",
  secondary:
    "bg-white text-primary-600 border border-primary-200 hover:border-primary-400 hover:text-primary-700",
  ghost: "bg-transparent text-primary-600 hover:bg-primary-100/80"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", isLoading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-base font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2",
          variantClasses[variant],
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
