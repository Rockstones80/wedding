export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`mx-auto block ${className}`}
      width="170"
      height="14"
      viewBox="0 0 170 14"
      aria-hidden="true"
    >
      <line
        x1="6"
        y1="7"
        x2="70"
        y2="7"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <rect
        x="81"
        y="3"
        width="8"
        height="8"
        transform="rotate(45 85 7)"
        fill="currentColor"
      />
      <line
        x1="100"
        y1="7"
        x2="164"
        y2="7"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}
