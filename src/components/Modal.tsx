import { useEffect, useRef } from "react";
import { TORN_PATHS, TORN_VIEWBOX } from "./TornSeam";
import { PALETTE } from "@/lib/palette";

export function Modal({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-ink/55"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative w-full outline-none sm:max-w-md"
      >
        <svg
          className="block h-5 w-full"
          viewBox={TORN_VIEWBOX}
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ transform: "scaleY(-1)" }}
        >
          <path d={TORN_PATHS[0]} fill={PALETTE.ivory} />
        </svg>
        <div className="max-h-[78vh] overflow-y-auto bg-ivory px-6 pb-9 pt-3 sm:rounded-b-2xl">
          {children}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-7 flex h-9 w-9 items-center justify-center rounded-full text-wine/60 transition hover:bg-wine/10 hover:text-wine"
        >
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>
    </div>
  );
}
