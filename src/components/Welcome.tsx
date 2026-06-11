import { useRef, useState } from "react";
import EnvelopePreloader from "./EnvelopePreloader";
import { site } from "@/lib/content";
import { INVITATION_OPENED } from "@/lib/events";

export function Welcome() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleOpen() {
    setOpened(true);
    window.dispatchEvent(new Event(INVITATION_OPENED));
    const a = audioRef.current;
    if (!a) return;
    a.volume = 0.55;
    a.play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }

  function toggleMusic() {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play()
        .then(() => setPlaying(true))
        .catch(() => {});
    } else {
      a.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      {site.musicSrc && (
        <audio ref={audioRef} src={site.musicSrc} loop preload="auto" />
      )}

      <EnvelopePreloader onOpen={handleOpen} />

      {site.musicSrc && opened && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={playing ? "Pause music" : "Play music"}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-wine/90 text-ivory shadow-lg transition hover:bg-wine"
        >
          {playing ? (
            <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              <span className="eq-bar w-[3px] rounded-full bg-ivory" />
              <span className="eq-bar w-[3px] rounded-full bg-ivory [animation-delay:180ms]" />
              <span className="eq-bar w-[3px] rounded-full bg-ivory [animation-delay:360ms]" />
            </span>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M9 18V6l8-2v12" />
              <circle cx="7" cy="18" r="2.2" />
              <circle cx="15" cy="16" r="2.2" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
