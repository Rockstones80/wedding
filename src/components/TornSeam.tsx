// Torn-paper transition between bands. The tear shape comes from
// /public/torn-edge.png used as an alpha mask, painted in the upper band's
// color so one asset works for every color pairing. `variant` mirrors the
// tear horizontally so consecutive seams don't repeat.

// Legacy SVG tear profiles — still used by the Modal's torn top edge.
export const TORN_VIEWBOX = "0 0 1440 34";

export const TORN_PATHS = [
  "M0 0 H1440 V13 L1414 8 L1382 15 L1358 9 L1326 23 L1302 11 L1270 19 L1246 7 L1214 14 L1190 8 L1158 22 L1136 12 L1104 18 L1080 6 L1048 16 L1022 10 L1000 24 L968 13 L940 19 L916 7 L884 15 L862 9 L838 25 L808 12 L776 16 L752 8 L724 23 L700 11 L668 18 L648 6 L614 15 L590 9 L568 24 L538 12 L512 20 L488 7 L458 17 L438 10 L410 26 L378 13 L352 18 L330 8 L304 22 L270 10 L252 16 L230 6 L196 20 L170 14 L148 24 L110 12 L96 18 L78 7 L44 15 L28 9 L0 12 Z",
  "M0 0 H1440 V16 L1408 9 L1376 21 L1352 12 L1318 25 L1290 10 L1262 17 L1228 7 L1200 19 L1174 13 L1142 26 L1116 11 L1086 16 L1052 6 L1024 20 L996 12 L962 24 L934 9 L904 15 L872 7 L846 18 L812 11 L786 23 L756 8 L724 14 L692 6 L664 19 L634 12 L602 25 L574 10 L544 16 L510 7 L482 21 L452 13 L420 24 L392 9 L362 15 L330 6 L300 18 L272 12 L240 22 L210 8 L182 14 L152 7 L122 19 L94 12 L64 23 L36 10 L0 15 Z",
] as const;

const MASK = {
  maskImage: "url(/torn-edge.png)",
  maskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskImage: "url(/torn-edge.png)",
  WebkitMaskSize: "100% 100%",
  WebkitMaskRepeat: "no-repeat",
} as const;

// Default: the upper band tears downward into the lower one. `flip`: the
// lower band rises upward into the upper one with the ragged edge on top.
export function TornSeam({
  upper,
  lower,
  variant = 0,
  flip = false,
}: {
  upper: string;
  lower: string;
  variant?: 0 | 1;
  flip?: boolean;
}) {
  const mirror = variant === 1 ? " scaleX(-1)" : "";
  return (
    <div
      aria-hidden="true"
      className="relative"
      style={{ backgroundColor: flip ? upper : lower }}
    >
      <div className="h-12 sm:h-16" />
      <div
        className="absolute left-1/2 w-[min(40rem,94vw)]"
        style={{
          ...(flip ? { bottom: "-80%" } : { top: "-80%" }),
          height: "167%",
          backgroundColor: flip ? lower : upper,
          ...MASK,
          transform: `translateX(-50%)${mirror}${flip ? " scaleY(-1)" : ""}`,
        }}
      />
    </div>
  );
}
