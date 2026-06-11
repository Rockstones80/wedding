import { useEffect, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function partsUntil(targetMs: number): Parts {
  let s = Math.max(0, Math.floor((targetMs - Date.now()) / 1000));
  const days = Math.floor(s / 86400);
  s -= days * 86400;
  const hours = Math.floor(s / 3600);
  s -= hours * 3600;
  const minutes = Math.floor(s / 60);
  const seconds = s - minutes * 60;
  return { days, hours, minutes, seconds };
}

function RollingValue({ display }: { display: string }) {
  return (
    <div className="overflow-hidden font-serif text-5xl tabular-nums text-gray-800 sm:text-4xl">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          className="block"
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Countdown({ targetISO }: { targetISO: string }) {
  const [t, setT] = useState<Parts | null>(null);

  useEffect(() => {
    const target = new Date(targetISO).getTime();
    const tick = () => setT(partsUntil(target));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  const cells = [
    { value: t?.days, label: "Days" },
    { value: t?.hours, label: "Hours" },
    { value: t?.minutes, label: "Minutes" },
    { value: t?.seconds, label: "Seconds" },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex items-start justify-center">
        {cells.map((c, i) => (
          <div key={c.label} className="flex items-start">
            {i > 0 && (
              <motion.span
                className="px-2 pt-1 font-serif text-4xl text-gray-800 sm:px-3 sm:text-6xl"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
              >
                :
              </motion.span>
            )}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
            >
              <RollingValue
                display={
                  c.value === undefined
                    ? "–"
                    : String(c.value).padStart(2, "0")
                }
              />
              <div className="mt-2 font-serif text-xs uppercase font-extrabold text-gray-800 sm:text-lg">
                {c.label}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </MotionConfig>
  );
}
