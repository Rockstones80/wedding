import { useEffect, useState } from "react";

// Guests unlock private details (venue + RSVP) with the code on their
// invitation. Set VITE_INVITE_CODE in .env.local to override. As a static
// site the check runs in the browser — a curtain for casual visitors, not a
// vault.
const STORAGE_KEY = "wedding-unlocked-v1";
const EVENT = "wedding:unlock";

export const INVITE_CODE = (
  (import.meta.env.VITE_INVITE_CODE as string | undefined) ?? "forever"
)
  .trim()
  .toLowerCase();

export function isUnlocked(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function verifyCode(code: string): boolean {
  return code.trim().toLowerCase() === INVITE_CODE;
}

export function unlock(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // ignore storage failures (private mode, etc.)
  }
  window.dispatchEvent(new Event(EVENT));
}

// Subscribes to unlock changes so every gate (venue, RSVP) stays in sync.
export function useUnlocked(): boolean {
  const [unlocked, setUnlocked] = useState(isUnlocked);
  useEffect(() => {
    const update = () => setUnlocked(isUnlocked());
    window.addEventListener(EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);
  return unlocked;
}
