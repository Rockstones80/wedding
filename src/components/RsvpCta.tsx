import { useState } from "react";
import { Modal } from "./Modal";
import { RsvpModalBody } from "./RsvpModalBody";

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
        <RsvpModalBody />
      </Modal>
    </>
  );
}
