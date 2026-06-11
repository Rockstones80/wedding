import { useEffect, useState } from "react";
import { motion, MotionConfig } from "motion/react";
import { site } from "@/lib/content";
import { INVITATION_OPENED } from "@/lib/events";

const textShadow = "[text-shadow:0_2px_16px_rgba(43,33,28,0.45)]";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(INVITATION_OPENED, onOpen);
    const fallback = window.setTimeout(() => setOpen(true), 15000);
    return () => {
      window.removeEventListener(INVITATION_OPENED, onOpen);
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <header className="relative overflow-x-clip bg-wine">
        <div className="relative mx-auto min-h-svh w-full max-w-md overflow-hidden bg-mist">
          {site.heroImage && (
            <img
              src={site.heroImage}
              alt={`${site.couple.nameA} and ${site.couple.nameB}`}
              className="kenburns absolute inset-0 h-full w-full object-cover"
              style={{ transformOrigin: "50% 10%" }}
            />
          )}
          <div
            className="absolute inset-x-0 top-0 h-[44%] bg-gradient-to-b from-ink/55 via-ink/20 to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-wine/45 to-transparent"
            aria-hidden="true"
          />

          <div className="relative flex min-h-svh flex-col items-center px-6 pt-[10svh] text-center">
            <motion.p
              className={`font-script text-3xl text-white sm:text-4xl ${textShadow}`}
              initial={{ opacity: 0, y: -18, filter: "blur(6px)" }}
              animate={
                open ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined
              }
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
            >
              Wedding Day
            </motion.p>
            <motion.p
              className={`mt-2 font-serif text-base tracking-[0.3em] text-white/90 ${textShadow}`}
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={
                open ? { opacity: 1, letterSpacing: "0.3em" } : undefined
              }
              transition={{ duration: 1.1, ease: EASE, delay: 0.72 }}
            >
              {site.dateDisplay}
            </motion.p>

            <h1
              className={`mt-[15svh] font-script leading-[0.95] text-white ${textShadow} font-medium`}
            >
              <motion.span
                className="block text-5xl sm:text-6xl"
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={
                  open ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined
                }
                transition={{ duration: 1.05, ease: EASE, delay: 0.9 }}
              >
                {site.couple.nameA}
              </motion.span>
              <motion.span
                className="-my-1 block text-3xl text-white/85"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={open ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.7, ease: "backOut", delay: 1.12 }}
              >
                &amp;
              </motion.span>
              <motion.span
                className="block text-5xl sm:text-6xl"
                initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                animate={
                  open ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined
                }
                transition={{ duration: 1.05, ease: EASE, delay: 1.02 }}
              >
                {site.couple.nameB}
              </motion.span>
            </h1>
          </div>
        </div>

        {site.heroFloral && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 z-10 w-[min(44rem,120vw)]"
            style={{ x: "-50%" }}
            initial={{ opacity: 0, y: "55%" }}
            animate={open ? { opacity: 1, y: "38%" } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: 1.15 }}
          >
            <img
              src={site.heroFloral}
              alt=""
              width={1200}
              height={500}
              className="h-auto w-full"
            />
          </motion.div>
        )}
      </header>
    </MotionConfig>
  );
}
