/* ---------------------------------------------------------------
   Generated placeholder artwork.

   Every product and editorial slot renders one of these until a
   real photo is dropped into the `image` field in lib/site.ts.
   Plain SVG — costs nothing, never 404s in front of a client.
   --------------------------------------------------------------- */
import type { CSSProperties } from "react";

const hash = (seed: number, n: number) =>
  Math.abs(Math.round(seed * 9301 + 49297)) % n;

const GROUNDS: [string, string][] = [
  ["#F7F4EC", "#ECE5D8"], // Raw Linen & Warm Ecru
  ["#F4F0E6", "#E8E2D2"], // Warm Sand Travertine
  ["#EFECE4", "#E1DBD0"], // Warm Oat Clay
  ["#F0F3EE", "#E1E7DF"], // Refined Sage Mist
];

const GROUNDS_DARK: [string, string][] = [
  ["#1E221D", "#131612"], // Deep Cypress Obsidian
  ["#231F1C", "#171412"], // Roasted Espresso Charcoal
  ["#1C201D", "#121512"], // Deep Forest Slate
  ["#25201A", "#191511"], // Smoked Cedar
];

function Garment({ kind, ink }: { kind: string; ink: string }) {
  const st = {
    fill: "none",
    stroke: ink,
    strokeWidth: 6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "tee":
    case "polo":
      return (
        <g {...st}>
          <path d="M150 120 108 140 88 186 118 206 140 168 138 380 262 380 260 168 282 206 312 186 292 140 250 120" />
          <path
            d={
              kind === "polo"
                ? "M172 120c8 16 20 24 28 24s20-8 28-24M188 132v40"
                : "M168 120c6 14 18 22 32 22s26-8 32-22"
            }
          />
        </g>
      );
    case "jacket":
      return (
        <g {...st}>
          <path d="M150 116 104 138 82 190 114 210 138 172 138 396 262 396 262 172 286 210 318 190 296 138 250 116" />
          <path d="M200 128v268M168 116l32 26 32-26" />
          <path d="M150 250h-26M250 250h26" strokeWidth={5} />
        </g>
      );
    case "overshirt":
      return (
        <g {...st}>
          <path d="M150 118 110 138 92 184 120 202 140 166 140 384 260 384 260 166 280 202 308 184 290 138 250 118" />
          <path d="M200 126v258" />
          <path d="M160 200h80M160 250h80M160 300h80" strokeWidth={4} opacity={0.55} />
        </g>
      );
    case "hoodie":
      return (
        <g {...st}>
          <path d="M150 138 106 158 86 204 116 222 140 186 140 388 260 388 260 186 284 222 314 204 294 158 250 138" />
          <path d="M156 138c6 22 22 34 44 34s38-12 44-34" />
          <path d="M188 172v46M212 172v46" strokeWidth={4} />
          <path d="M150 250h96" strokeWidth={10} opacity={0.25} />
        </g>
      );
    case "kamis":
    case "dress":
      return (
        <g {...st}>
          <path d="M158 120 122 138 104 176 128 192 150 160 118 400 282 400 250 160 272 192 296 176 278 138 242 120" />
          <path d="M172 120c8 14 18 22 28 22s20-8 28-22" />
          <path d="M150 250h100" strokeWidth={4} opacity={0.5} />
        </g>
      );
    case "pant":
      return (
        <g {...st}>
          <path d="M150 120h100l10 120-14 160h-40l-16-150-16 150h-40l-14-160z" />
          <path d="M150 150h100" strokeWidth={4} />
          <path d="M244 210h26M130 210h26" strokeWidth={5} />
        </g>
      );
    case "cap":
      return (
        <g {...st}>
          <path d="M120 250c0-52 36-92 80-92s80 40 80 92" />
          <path d="M116 250h84c58 0 96 12 96 30 0 8-14 12-40 12H128c-8 0-12-6-12-14z" />
          <path d="M200 158v92" strokeWidth={4} opacity={0.5} />
        </g>
      );
    case "bandana":
      return (
        <g {...st}>
          <path d="M110 150h180v180H110z" />
          <path d="M110 150 290 330M290 150 110 330" strokeWidth={4} opacity={0.4} />
          <path d="M140 180h120v120H140z" strokeWidth={4} />
          <circle cx="200" cy="240" r="26" strokeWidth={4} />
        </g>
      );
    case "tote":
      return (
        <g {...st}>
          <path d="M148 200h104l16 190H132z" />
          <path d="M168 200c0-30 14-48 32-48s32 18 32 48" strokeWidth={6} />
          <path d="M170 270h60" strokeWidth={4} opacity={0.5} />
        </g>
      );
    default:
      return <circle cx="200" cy="260" r="90" {...st} />;
  }
}

function Editorial({ kind, ink }: { kind: string; ink: string }) {
  const fig = (x: number, tone: number) => (
    <g fill={ink} opacity={tone}>
      <circle cx={x} cy="120" r="34" />
      <path
        d={`M${x - 46} 168h92l14 150c0 0 -10 210 -60 210s-60 -210 -60 -210z`}
      />
      <rect x={x - 60} y="176" width="24" height="150" rx="10" />
      <rect x={x + 36} y="176" width="24" height="150" rx="10" />
    </g>
  );
  switch (kind) {
    case "figA":
      return <>{fig(200, 0.9)}</>;
    case "figB":
      return (
        <>
          {fig(210, 0.88)}
          <path d="M150 320h120l30 220H120z" fill={ink} opacity={0.5} />
        </>
      );
    case "figC":
      return (
        <>
          {fig(150, 0.85)}
          {fig(260, 0.7)}
        </>
      );
    case "still":
      return (
        <g fill={ink}>
          <rect x="120" y="150" width="160" height="200" rx="8" opacity={0.85} />
          <rect x="150" y="120" width="100" height="40" rx="8" opacity={0.6} />
          <circle cx="200" cy="250" r="34" fill="#FAF7F2" />
        </g>
      );
    case "perfume":
      return (
        <g fill={ink}>
          <rect x="125" y="180" width="150" height="190" rx="14" opacity={0.85} />
          <rect x="140" y="200" width="120" height="150" rx="8" fill="#FAF7F2" opacity={0.35} />
          <rect x="155" y="240" width="90" height="60" rx="4" fill="#FAF7F2" opacity={0.9} />
          <rect x="175" y="155" width="50" height="28" rx="4" opacity={0.7} />
          <rect x="160" y="105" width="80" height="52" rx="6" opacity={0.9} />
          <circle cx="200" cy="85" r="8" opacity={0.4} />
          <circle cx="200" cy="85" r="16" fill="none" stroke={ink} strokeWidth="2" strokeDasharray="3 3" opacity={0.5} />
        </g>
      );
    case "household":
      return (
        <g fill={ink}>
          <path
            d="M140 220 C140 180 160 165 175 160 L175 135 L225 135 L225 160 C240 165 260 180 260 220 L270 310 C270 355 240 375 200 375 C160 375 130 355 130 310 Z"
            opacity={0.85}
          />
          <ellipse cx="200" cy="135" rx="28" ry="8" opacity={0.6} />
          <path
            d="M200 135 Q185 85 170 55 M180 90 Q160 85 155 75 M190 115 Q170 115 165 105 M190 75 Q205 60 215 50"
            fill="none"
            stroke={ink}
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity={0.75}
          />
          <rect x="110" y="385" width="180" height="8" rx="3" opacity={0.4} />
        </g>
      );
    case "hero":
      return (
        <>
          {fig(150, 0.92)}
          {fig(255, 0.8)}
        </>
      );
    case "loom":
      return (
        <g stroke={ink} strokeWidth={5} fill="none" strokeLinecap="round">
          {Array.from({ length: 9 }).map((_, i) => (
            <path key={i} d={`M90 ${130 + i * 32}h220`} opacity={0.5} />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <path key={`v${i}`} d={`M${110 + i * 30} 120v300`} opacity={0.3} />
          ))}
          <circle cx="200" cy="270" r="40" strokeWidth={7} />
        </g>
      );
    case "workshop":
      return (
        <g fill={ink}>
          <rect x="60" y="300" width="280" height="14" opacity={0.4} />
          {fig(140, 0.88)}
          {fig(260, 0.75)}
          <rect x="70" y="120" width="60" height="120" opacity={0.25} />
          <rect x="300" y="90" width="40" height="180" opacity={0.25} />
        </g>
      );
    default:
      return <>{fig(200, 0.9)}</>;
  }
}

export function Art({
  kind = "tee",
  seed = 1,
  ratio = "4 / 5",
  label = "",
  editorial = false,
  tone = "light",
  className,
}: {
  kind?: string;
  seed?: number;
  ratio?: string;
  label?: string;
  editorial?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  const palette = tone === "dark" ? GROUNDS_DARK : GROUNDS;
  const [g1, g2] = palette[hash(seed, palette.length)];
  const ink =
    tone === "dark" ? "#EDE6DC" : editorial ? "#1D1916" : "#24201C";
  const gid = `g-${kind}-${seed}`;
  const pid = `p-${kind}-${seed}`;
  const style: CSSProperties = { aspectRatio: ratio };

  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label || `${kind} placeholder`}
      style={style}
      className={className}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={g1} />
          <stop offset="1" stopColor={g2} />
        </linearGradient>
        <pattern id={pid} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0v24" fill="none" stroke="#000" strokeWidth="0.5" opacity="0.05" />
        </pattern>
      </defs>
      <rect width="400" height="500" fill={`url(#${gid})`} />
      <rect width="400" height="500" fill={`url(#${pid})`} />
      <rect x="18" y="18" width="364" height="464" fill="none" stroke="#000" strokeWidth="1" opacity="0.08" />
      {editorial ? (
        <Editorial kind={kind} ink={ink} />
      ) : (
        <g transform="translate(0 -4)">
          <Garment kind={kind} ink={ink} />
        </g>
      )}
    </svg>
  );
}

export const EditorialArt = (
  props: Omit<Parameters<typeof Art>[0], "editorial">,
) => <Art {...props} editorial />;
