import { useEffect, useState } from "react";
import { Modal } from "./Modal";

const STORAGE_KEY = "wedding-unlocked-v1";

// The code guests get on their invitation card. Set VITE_INVITE_CODE in
// .env.local to override; note that as a static site the check runs in the
// browser — it is a curtain for casual visitors, not a vault.
const EXPECTED = (
  (import.meta.env.VITE_INVITE_CODE as string | undefined) ?? "forever"
)
  .trim()
  .toLowerCase();

export function LockGate({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [asking, setAsking] = useState(false);
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "wrong">("idle");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") setUnlocked(true);
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (code.trim() === "") return;
    setState("checking");
    window.setTimeout(() => {
      if (code.trim().toLowerCase() === EXPECTED) {
        localStorage.setItem(STORAGE_KEY, "1");
        setUnlocked(true);
        setAsking(false);
      } else {
        setState("wrong");
      }
    }, 450);
  }

  if (unlocked) return <>{children}</>;

  return (
    <>
      <div className="mx-auto max-w-sm rounded-2xl border border-champagne-deep bg-ivory px-6 py-10 text-center">
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
        <p className="mt-4 font-serif text-xl text-ink">
          These details are reserved for our guests.
        </p>
        <p className="mt-2 font-serif text-sm italic text-ink/60">
          Enter the code from your invitation to view the venue and address.
        </p>
        <button
          type="button"
          onClick={() => {
            setAsking(true);
            setState("idle");
            setCode("");
          }}
          className="mt-6 rounded-full bg-wine px-7 py-2.5 font-serif text-sm tracking-widest text-cream transition hover:bg-wine-deep"
        >
          Enter invite code
        </button>
      </div>

      <Modal
        open={asking}
        onClose={() => setAsking(false)}
        label="Enter invite code"
      >
        <form onSubmit={submit} className="px-2 py-4 text-center">
          <p className="font-script text-4xl text-wine">Welcome</p>
          <p className="mx-auto mt-3 max-w-xs font-serif text-base text-ink/80">
            Enter the code printed on your invitation card.
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
      </Modal>
    </>
  );
}
