/**
 * SevenBands — Ownable 7Band brand motif.
 * Seven horizontal protection bands/arcs used as a recurring visual device
 * across cards, section accents, and dividers.
 */
export function SevenBandsAccent({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {[0, 3, 6, 9, 12, 15, 18].map((y, i) => (
        <rect
          key={i}
          x="0"
          y={y}
          width={120 - i * 12}
          height="1.5"
          rx="0.75"
          fill="currentColor"
          opacity={1 - i * 0.1}
        />
      ))}
    </svg>
  );
}

export function SevenBandsShield({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Shield outline */}
      <path
        d="M40 4 L72 16 L72 48 C72 66 56 80 40 86 C24 80 8 66 8 48 L8 16 Z"
        fill="#0d1f2d"
        stroke="#22c55e"
        strokeWidth="2"
      />
      {/* Seven protection bands inside shield */}
      {[22, 28, 34, 40, 46, 52, 58].map((y, i) => {
        const w = 36 - Math.abs(i - 3) * 4;
        const x = 40 - w / 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={w}
            height="2"
            rx="1"
            fill="#22c55e"
            opacity={0.9 - i * 0.05}
          />
        );
      })}
      {/* Bold 7 */}
      <text
        x="40"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#22c55e"
        fontSize="28"
        fontWeight="800"
        fontFamily="'Playfair Display', serif"
      >
        7
      </text>
    </svg>
  );
}
