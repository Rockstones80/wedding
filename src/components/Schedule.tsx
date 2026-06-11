import { useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { site } from "@/lib/content";
import { Modal } from "./Modal";
import { Rose } from "./Rose";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Ev = (typeof site.schedule)[number];

function gcalUrl(ev: Ev) {
  const datePart = site.dateISO.slice(0, 10).replace(/-/g, "");
  const [h, m] = ev.time.split(":").map(Number);
  const endMin = h * 60 + m + ev.durationMin;
  const eh = String(Math.floor(endMin / 60) % 24).padStart(2, "0");
  const em = String(endMin % 60).padStart(2, "0");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `${ev.title} — ${site.couple.nameA} & ${site.couple.nameB}'s Wedding`,
    dates: `${datePart}T${ev.time.replace(":", "")}00/${datePart}T${eh}${em}00`,
    details: ev.description,
    location: site.venue.mapsQuery,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function Schedule() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ev = openIdx === null ? null : site.schedule[openIdx];

  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const roseTop = useTransform(progress, [0, 1], ["12.5%", "87.5%"]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative mx-auto max-w-sm">
        <ol ref={listRef}>
        {site.schedule.map((e, i) => {
          const first = i === 0;
          const last = i === site.schedule.length - 1;
          return (
            <li key={e.title}>
              <button
                type="button"
                onClick={() => setOpenIdx(i)}
                className="group grid w-full grid-cols-[1fr_auto_1fr] items-stretch gap-x-6"
              >
                <motion.span
                  className="self-center py-5 text-right font-serif text-3xl tracking-wide text-ink sm:text-4xl"
                  initial={{ opacity: 0, x: -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.05 + i * 0.06 }}
                >
                  {e.time}
                </motion.span>
                <span className="relative w-12" aria-hidden="true">
                  <motion.span
                    className={`absolute left-1/2 w-px bg-wine/30 ${
                      first
                        ? "top-1/2 bottom-0"
                        : last
                          ? "top-0 bottom-1/2"
                          : "inset-y-0"
                    }`}
                    style={{ x: "-50%", transformOrigin: "top" }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.7,
                      ease: "easeOut",
                      delay: 0.18 + i * 0.08,
                    }}
                  />
                  <motion.span
                    className="absolute left-1/2 top-1/2 h-2 w-2 bg-wine transition-colors group-hover:bg-gold"
                    style={{ x: "-50%", y: "-50%" }}
                    initial={{ scale: 0, opacity: 0, rotate: 45 }}
                    whileInView={{ scale: 1, opacity: 1, rotate: 45 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 16,
                      delay: 0.22 + i * 0.06,
                    }}
                  />
                </span>
                <span className="flex items-center justify-start self-stretch py-5">
                  <motion.span
                    className="w-[9rem] text-center font-serif text-xl leading-snug text-ink transition-colors group-hover:text-wine sm:text-2xl"
                    initial={{ opacity: 0, x: 28 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.7,
                      ease: EASE,
                      delay: 0.1 + i * 0.06,
                    }}
                  >
                    {e.title}
                  </motion.span>
                </span>
              </button>
            </li>
          );
        })}
        </ol>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 z-10 h-12 w-12"
          style={{ top: roseTop, x: "-50%", y: "-50%" }}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            type: "spring",
            stiffness: 160,
            damping: 14,
            delay: 0.25,
          }}
        >
          <Rose className="h-full w-full" />
        </motion.div>
      </div>

      <Modal
        open={ev !== null}
        onClose={() => setOpenIdx(null)}
        label={ev?.title ?? "Event details"}
      >
        {ev && (
          <div className="px-2 py-4 text-center">
            <p className="font-script text-4xl text-wine">{ev.title}</p>
            <p className="mt-3 font-serif text-lg tracking-[0.3em] text-ink">
              {ev.time}
            </p>
            <p className="mx-auto mt-5 max-w-xs font-serif text-base leading-relaxed text-ink/85">
              {ev.description}
            </p>
            <a
              href={gcalUrl(ev)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-full bg-wine px-7 py-2.5 font-serif text-sm tracking-widest text-cream transition hover:bg-wine-deep"
            >
              Add to calendar
            </a>
            <p className="mt-4 font-serif text-xs italic text-ink/50">
              Venue and directions are in the Location section.
            </p>
          </div>
        )}
      </Modal>
    </MotionConfig>
  );
}
