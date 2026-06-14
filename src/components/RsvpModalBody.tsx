import { useState } from "react";
import { Rsvp } from "./Rsvp";
import { site } from "@/lib/content";
import { unlock, useUnlocked, verifyCode } from "@/lib/unlock";

export function RsvpModalBody() {
  const unlocked = useUnlocked();
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "wrong">("idle");

  if (unlocked) {
    return (
      <div className="px-1 py-3">
        <p className="text-center font-script text-4xl text-wine">RSVP</p>
        <p className="mt-2 text-center font-serif text-sm text-ink/70">
          Kindly respond before {site.rsvp.deadlineDisplay}
        </p>
        <div className="mt-5">
          <Rsvp />
        </div>
      </div>
    );
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim() === "") return;
    setState("checking");
    window.setTimeout(() => {
      if (verifyCode(code)) {
        unlock();
      } else {
        setState("wrong");
      }
    }, 450);
  }

  return (
    <form onSubmit={submit} className="px-2 py-5 text-center">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        className="mx-auto h-9 w-9 text-gold"
        aria-hidden="true"
      >
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
      </svg>
      <p className="mt-4 font-script text-4xl text-wine">Welcome</p>
      <p className="mx-auto mt-2 max-w-xs font-serif text-base text-ink/80">
        Please enter the code from your invitation card to RSVP.
      </p>
      <input
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          setState("idle");
        }}
        autoFocus
        autoCapitalize="characters"
        autoComplete="off"
        placeholder="INVITE CODE"
        className="mt-6 w-full rounded-xl border border-champagne-deep bg-white/60 px-4 py-3 text-center font-serif text-xl uppercase tracking-[0.3em] text-ink outline-none transition placeholder:text-ink/30 focus:border-gold"
      />
      {state === "wrong" && (
        <p className="mt-3 font-serif text-sm text-wine">
          That code doesn&apos;t match — please check your invitation.
        </p>
      )}
      <button
        type="submit"
        disabled={state === "checking" || code.trim() === ""}
        className="mt-6 rounded-full bg-wine px-9 py-2.5 font-serif text-sm tracking-widest text-cream transition hover:bg-wine-deep disabled:cursor-not-allowed disabled:opacity-50"
      >
        {state === "checking" ? "Checking…" : "Unlock"}
      </button>
    </form>
  );
}
