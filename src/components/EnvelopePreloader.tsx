import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

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
  willChange: "transform",
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
              <pattern
                id="paperTex"
                patternUnits="userSpaceOnUse"
                width="650"
                height="900"
              >
                <image
                  href="/paper-texture.webp"
                  x="0"
                  y="0"
                  width="650"
                  height="900"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>

            <motion.g
              animate={opened ? { opacity: 0 } : undefined}
              transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
            >
              <rect width="650" height="900" rx="14" fill="url(#paperTex)" />
              <rect
                width="650"
                height="900"
                rx="14"
                fill="url(#gPocket)"
                opacity="0.5"
              />
            </motion.g>

            {/* flaps */}
            <motion.g
              style={flapStyle}
              variants={flap.left}
              animate={opened ? "open" : undefined}
            >
              <g>
                <path d="M0,0 L293,418 Q327,450 293,482 L0,900 Z" fill="url(#paperTex)" />
                <path
                  d="M0,0 L293,418 Q327,450 293,482 L0,900 Z"
                  fill="url(#gPaperSide)"
                  opacity="0.5"
                />
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
              <g>
                <path d="M650,0 L357,418 Q323,450 357,482 L650,900 Z" fill="url(#paperTex)" />
                <path
                  d="M650,0 L357,418 Q323,450 357,482 L650,900 Z"
                  fill="url(#gPaperSide)"
                  opacity="0.5"
                />
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
              <g>
                <path d="M0,900 H650 L359,469 Q325,435 291,469 Z" fill="url(#paperTex)" />
                <path
                  d="M0,900 H650 L359,469 Q325,435 291,469 Z"
                  fill="url(#gPaper)"
                  opacity="0.5"
                />
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
              <g>
                <path d="M0,0 H650 L359,431 Q325,465 291,431 Z" fill="url(#paperTex)" />
                <path
                  d="M0,0 H650 L359,431 Q325,465 291,431 Z"
                  fill="url(#gPaper)"
                  opacity="0.5"
                />
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
                animate={opened ? { scale: 0, opacity: 0 } : undefined}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <image
                  href="/wax-seal.webp"
                  x="237"
                  y="362"
                  width="176"
                  height="176"
                  preserveAspectRatio="xMidYMid meet"
                />
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
