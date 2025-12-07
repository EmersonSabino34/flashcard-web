"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, id, ...props }, ref) => {
    const inputId = id ?? `input-${props.name ?? Math.random()}`;
    return (
      <label className="flex w-full flex-col gap-2 text-sm font-medium text-slate-700">
        {label && <span>{label}</span>}
        <input
          id={inputId}
          ref={ref}
          className={twMerge(
            "w-full rounded-xl border border-primary-100 bg-white px-4 py-3 text-base font-normal text-slate-900 shadow-sm outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-200",
            className
          )}
          {...props}
        />
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </label>
    );
  }
);

Input.displayName = "Input";
