import { useState } from "react";
import { Modal } from "./Modal";
import { Rsvp } from "./Rsvp";
import { site } from "@/lib/content";

export function RsvpCta() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-7 inline-block rounded-full bg-ivory px-12 py-2.5 font-serif text-base tracking-[0.15em] text-wine transition hover:bg-champagne"
      >
        RSVP
      </button>
      <Modal open={open} onClose={() => setOpen(false)} label="RSVP">
        <div className="px-1 py-3">
          <p className="text-center font-script text-4xl text-wine">RSVP</p>
          <p className="mt-2 text-center font-serif text-sm text-ink/70">
            Kindly respond before {site.rsvp.deadlineDisplay}
          </p>
          <div className="mt-5">
            <Rsvp />
          </div>
        </div>
      </Modal>
    </>
  );
}
