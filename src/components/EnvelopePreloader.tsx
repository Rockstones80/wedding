import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { site } from "@/lib/content";

const EASE: [number, number, number, number] = [0.7, 0, 0.25, 1];

const flap = {
  top: {
    open: {
      y: "-130%",
      rotate: -5,
      transition: { duration: 1.25, ease: EASE, delay: 0.3 },
    },
  },
  left: {
    open: {
      x: "-130%",
      rotate: 4,
      transition: { duration: 1.25, ease: EASE, delay: 0.52 },
    },
  },
  right: {
    open: {
      x: "130%",
      rotate: -4,
      transition: { duration: 1.25, ease: EASE, delay: 0.52 },
    },
  },
  bottom: {
    open: {
      y: "130%",
      rotate: 3,
      transition: { duration: 1.25, ease: EASE, delay: 0.6 },
    },
  },
};

const flapStyle = {
  transformBox: "fill-box",
  transformOrigin: "center",
} as const;

export default function EnvelopePreloader({
  onOpen,
  onComplete,
}: {
  onOpen?: () => void;
  onComplete?: () => void;
}) {
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = gone ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [gone]);

  const open = useCallback(() => {
    if (opened) return;
    setOpened(true);
    onOpen?.();
    setTimeout(() => {
      setGone(true);
      onComplete?.();
    }, 1900);
  }, [opened, onOpen, onComplete]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className={`fixed inset-0 z-50 flex items-center justify-center ${
            opened ? "pointer-events-none" : ""
          }`}
          initial={{ backgroundColor: "#5e1325" }}
          animate={{
            backgroundColor: opened ? "rgba(94, 19, 37, 0)" : "#5e1325",
          }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
        >
          <svg
            viewBox="0 0 650 900"
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full sm:h-[min(86svh,620px)] sm:w-auto"
          >
            <defs>
              <linearGradient id="gPaper" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#f7efe6" />
                <stop offset="1" stopColor="#ecdfd2" />
              </linearGradient>
              <linearGradient id="gPaperSide" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#f2e7da" />
                <stop offset="1" stopColor="#e7d8c8" />
              </linearGradient>
              <linearGradient id="gPocket" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#e9dccd" />
                <stop offset="1" stopColor="#dfcfbc" />
              </linearGradient>
              <radialGradient id="gWax" cx="0.38" cy="0.32" r="0.85">
                <stop offset="0" stopColor="#9c2444" />
                <stop offset="0.55" stopColor="#7a0f2e" />
                <stop offset="1" stopColor="#570a21" />
              </radialGradient>
              <filter id="fTop" x="-20%" y="-20%" width="140%" height="160%">
                <feDropShadow
                  dx="0"
                  dy="10"
                  stdDeviation="10"
                  floodColor="#2a000d"
                  floodOpacity="0.38"
                />
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.9"
                  numOctaves="1"
                  result="n"
                />
                <feColorMatrix
                  in="n"
                  type="matrix"
                  values="0 0 0 0 .42  0 0 0 0 .33  0 0 0 0 .27  0 0 0 .05 0"
                  result="tint"
                />
                <feComposite
                  in="tint"
                  in2="SourceAlpha"
                  operator="in"
                  result="grain"
                />
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="grain" />
                </feMerge>
              </filter>
              <filter id="fSide" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="5"
                  stdDeviation="7"
                  floodColor="#2a000d"
                  floodOpacity="0.25"
                />
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.9"
                  numOctaves="1"
                  result="n"
                />
                <feColorMatrix
                  in="n"
                  type="matrix"
                  values="0 0 0 0 .42  0 0 0 0 .33  0 0 0 0 .27  0 0 0 .05 0"
                  result="tint"
                />
                <feComposite
                  in="tint"
                  in2="SourceAlpha"
                  operator="in"
                  result="grain"
                />
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="grain" />
                </feMerge>
              </filter>
              <filter id="fSeal" x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="9"
                  floodColor="#1c0008"
                  floodOpacity="0.5"
                />
              </filter>
            </defs>

            <motion.rect
              width="650"
              height="900"
              rx="14"
              fill="url(#gPocket)"
              animate={opened ? { opacity: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            />

            {/* flaps */}
            <motion.g
              style={flapStyle}
              variants={flap.left}
              animate={opened ? "open" : undefined}
            >
              <g filter="url(#fSide)">
                <path d="M0,0 L293,418 Q327,450 293,482 L0,900 Z" fill="url(#gPaperSide)" />
                <path
                  d="M0,0 L293,418 Q327,450 293,482 L0,900"
                  fill="none"
                  stroke="#d8c5b1"
                  strokeWidth="2"
                />
              </g>
            </motion.g>
            <motion.g
              style={flapStyle}
              variants={flap.right}
              animate={opened ? "open" : undefined}
            >
              <g filter="url(#fSide)">
                <path d="M650,0 L357,418 Q323,450 357,482 L650,900 Z" fill="url(#gPaperSide)" />
                <path
                  d="M650,0 L357,418 Q323,450 357,482 L650,900"
                  fill="none"
                  stroke="#d8c5b1"
                  strokeWidth="2"
                />
              </g>
            </motion.g>
            <motion.g
              style={flapStyle}
              variants={flap.bottom}
              animate={opened ? "open" : undefined}
            >
              <g filter="url(#fSide)">
                <path d="M0,900 H650 L359,469 Q325,435 291,469 Z" fill="url(#gPaper)" />
                <path
                  d="M0,900 L291,469 M359,469 L650,900"
                  fill="none"
                  stroke="#d8c5b1"
                  strokeWidth="2"
                />
              </g>
            </motion.g>
            <motion.g
              style={flapStyle}
              variants={flap.top}
              animate={opened ? "open" : undefined}
            >
              <g filter="url(#fTop)">
                <path d="M0,0 H650 L359,431 Q325,465 291,431 Z" fill="url(#gPaper)" />
                <path
                  d="M0,0 L291,431 M359,431 L650,0"
                  fill="none"
                  stroke="#cdb8a2"
                  strokeWidth="2"
                />
              </g>
            </motion.g>

            {/* wax seal */}
            <g
              transform="translate(-175 133)"
              className="cursor-pointer"
              onClick={open}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") open();
              }}
              tabIndex={0}
              role="button"
              aria-label="Open wedding invitation"
            >
              <motion.g
                style={flapStyle}
                animate={
                  opened
                    ? { scale: 0.25, opacity: 0 }
                    : { scale: [1, 1.045, 1] }
                }
                transition={
                  opened
                    ? { duration: 0.45, ease: "easeOut" }
                    : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <g filter="url(#fSeal)">
                  <path
                    d="M500,243 C541,240 568,254 578,283 C590,310 583,342 562,362 C543,382 521,392 497,389 C468,387 441,373 429,346 C417,318 423,286 444,265 C459,249 478,244 500,243 Z"
                    fill="url(#gWax)"
                  />
                  <circle
                    cx="500"
                    cy="317"
                    r="52"
                    fill="none"
                    stroke="#fad9c0"
                    strokeWidth="2"
                    opacity="0.55"
                  />
                  <text
                    x="500"
                    y="338"
                    textAnchor="middle"
                    fontSize="56"
                    fill="#f6d9c4"
                    fontFamily="var(--font-great-vibes), cursive"
                    opacity="0.9"
                  >
                    {site.couple.monogram}
                  </text>
                </g>
              </motion.g>
            </g>

            {!opened && (
              <text
                x="325"
                y="868"
                textAnchor="middle"
                fontSize="24"
                fontStyle="italic"
                fill="#7a5c46"
                fontFamily="var(--font-cormorant), Georgia"
              >
                Click the seal to open
              </text>
            )}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
