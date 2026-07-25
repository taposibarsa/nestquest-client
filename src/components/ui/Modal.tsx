"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function Modal({
  open,
  title,
  children,
  onClose,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  confirmVariant = "danger",
  confirming = false,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  confirmVariant?: "danger" | "primary";
  confirming?: boolean;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !confirming) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, confirming]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-navy/50"
        aria-label="Close dialog"
        onClick={() => {
          if (!confirming) onClose();
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-busy={confirming}
        className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="mb-4 flex items-start justify-between gap-3">
          <h2
            id="modal-title"
            className="font-display text-xl font-semibold text-navy"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={confirming}
            className="rounded-lg p-1 text-cool-gray hover:bg-navy/5 disabled:opacity-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="text-sm text-charcoal">{children}</div>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={confirming}
          >
            {cancelLabel}
          </Button>
          <button
            type="button"
            disabled={confirming}
            onClick={onConfirm}
            className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
              confirmVariant === "danger"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-amber text-navy hover:bg-amber/90"
            }`}
          >
            {confirming ? (
              <>
                <LoadingSpinner
                  className={`h-4 w-4 ${
                    confirmVariant === "danger" ? "text-white" : "text-navy"
                  }`}
                />
                Please wait…
              </>
            ) : (
              confirmLabel
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
