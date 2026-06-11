export function Rose({ className = "" }: { className?: string }) {
  const outer = [0, 45, 90, 135, 180, 225, 270, 315];
  const middle = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <g fill="#fdfaf3" stroke="#d8cbb4" strokeWidth="0.8">
        {outer.map((deg) => (
          <ellipse
            key={`o${deg}`}
            cx="24"
            cy="11"
            rx="6.5"
            ry="8.5"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
      </g>
      <g fill="#fcf8ee" stroke="#d8cbb4" strokeWidth="0.8">
        {middle.map((deg) => (
          <ellipse
            key={`m${deg}`}
            cx="24"
            cy="15"
            rx="5"
            ry="6.5"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
      </g>
      <circle
        cx="24"
        cy="24"
        r="7"
        fill="#fbf6ea"
        stroke="#d8cbb4"
        strokeWidth="0.8"
      />
      <g fill="none" stroke="#c8a96f" strokeWidth="0.9" strokeLinecap="round">
        <path d="M27.5 24a3.5 3.5 0 1 1-3.5-3.5" />
        <path d="M22.2 24a1.8 1.8 0 1 0 1.8-1.8" />
      </g>
    </svg>
  );
}
