import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Modal } from "./Modal";
import { RsvpModalBody } from "./RsvpModalBody";
import { site } from "@/lib/content";
import { INVITATION_OPENED } from "@/lib/events";

export function StickyRsvp() {
  const [revealed, setRevealed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setRevealed(true);
    window.addEventListener(INVITATION_OPENED, show);
    // Fallback in case the event already fired before mount.
    const fallback = window.setTimeout(show, 16000);
    return () => {
      window.removeEventListener(INVITATION_OPENED, show);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-[calc(0.85rem+env(safe-area-inset-bottom))]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 rounded-full border border-white/50 bg-white/70 py-1.5 pl-6 pr-1.5 shadow-[0_10px_30px_rgba(43,33,28,0.22)] backdrop-blur-md">
              <span className="font-serif text-base tracking-wide text-ink">
                {site.dateDisplay}
              </span>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="rounded-full bg-wine px-6 py-2.5 font-serif text-sm tracking-[0.2em] text-cream transition hover:bg-wine-deep"
              >
                RSVP
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal open={open} onClose={() => setOpen(false)} label="RSVP">
        <RsvpModalBody />
      </Modal>
    </>
  );
}
