"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onClose: () => void;
  children?: ReactNode;
}

export function Modal({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onClose,
  children
}: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className="w-full max-w-md rounded-3xl bg-white p-6 shadow-card"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
          >
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
              {description && (
                <p className="text-sm text-slate-600">{description}</p>
              )}
            </div>
            {children && <div className="mt-4 space-y-3">{children}</div>}
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={onClose}>
                {cancelLabel}
              </Button>
              {onConfirm && (
                <Button onClick={onConfirm}>{confirmLabel}</Button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
