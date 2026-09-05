import type { Artifact } from '@/data/types';

/**
 * Abstract monochrome artifacts — one per project.
 * Deliberately schematic, not fake screenshots: they suggest the shape of
 * each system without pretending to be its UI.
 */

const frame = 'h-full w-full';

function Ct() {
  const cells = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 320 200" className={frame} role="img" aria-label="CT slice grid schematic">
      {cells.map((i) => {
        const x = 16 + (i % 3) * 98;
        const y = 20 + Math.floor(i / 3) * 84;
        const active = i === 4;
        return (
          <g key={i}>
            <rect x={x} y={y} width="88" height="74" rx="12" className="fill-canvas" />
            <ellipse
              cx={x + 44}
              cy={y + 37}
              rx="30"
              ry="24"
              className="fill-none stroke-hairline"
              strokeWidth="1.5"
            />
            <ellipse
              cx={x + 44}
              cy={y + 37}
              rx="17"
              ry="13"
              className="fill-none stroke-hairline"
              strokeWidth="1.25"
            />
            {active && (
              <>
                <circle cx={x + 55} cy={y + 30} r="5.5" className="fill-ink" />
                <circle
                  cx={x + 55}
                  cy={y + 30}
                  r="13"
                  className="fill-none stroke-ink"
                  strokeWidth="1.25"
                  strokeDasharray="3 3"
                />
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Rank() {
  const bars = [
    { w: 214, on: true },
    { w: 178, on: false },
    { w: 150, on: false },
    { w: 118, on: false },
    { w: 92, on: false },
  ];
  return (
    <svg viewBox="0 0 320 200" className={frame} role="img" aria-label="Ranked candidate list schematic">
      {bars.map((b, i) => {
        const y = 22 + i * 34;
        return (
          <g key={i}>
            <rect x="16" y={y} width="24" height="24" rx="7.2" className="fill-canvas" />
            <rect
              x="48"
              y={y + 4}
              width={b.w}
              height="16"
              rx="8"
              className={b.on ? 'fill-ink' : 'fill-canvas'}
            />
            <rect x={280} y={y + 6} width="24" height="12" rx="6" className="fill-none stroke-hairline" strokeWidth="1.25" />
          </g>
        );
      })}
    </svg>
  );
}

function Chat() {
  return (
    <svg viewBox="0 0 320 200" className={frame} role="img" aria-label="Tutor conversation schematic">
      <rect x="16" y="18" width="176" height="44" rx="16" className="fill-canvas" />
      <rect x="34" y="32" width="120" height="6" rx="3" className="fill-hairline" />
      <rect x="34" y="44" width="86" height="6" rx="3" className="fill-hairline" />

      <rect x="112" y="76" width="192" height="52" rx="16" className="fill-ink" />
      <rect x="130" y="92" width="150" height="6" rx="3" className="fill-canvas" opacity="0.85" />
      <rect x="130" y="106" width="108" height="6" rx="3" className="fill-canvas" opacity="0.5" />

      <g className="stroke-ink" strokeWidth="2" strokeLinecap="round">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
          const h = [8, 18, 30, 14, 24, 38, 20, 10, 26, 16, 30, 12][i];
          return <line key={i} x1={22 + i * 13} y1={168 - h / 2} x2={22 + i * 13} y2={168 + h / 2} />;
        })}
      </g>
      <circle cx="286" cy="168" r="12" className="fill-none stroke-hairline" strokeWidth="1.5" />
      <circle cx="286" cy="168" r="4" className="fill-ink" />
    </svg>
  );
}

function MapRisk() {
  const tints = [
    0.06, 0.1, 0.22, 0.4, 0.16, 0.08, 0.12, 0.3, 0.62, 0.78, 0.34, 0.14, 0.2, 0.46, 0.86, 1, 0.5,
    0.24, 0.12, 0.28, 0.54, 0.66, 0.3, 0.1, 0.08, 0.16, 0.26, 0.34, 0.18, 0.07,
  ];
  return (
    <svg viewBox="0 0 320 200" className={frame} role="img" aria-label="Hazard risk grid schematic">
      {tints.map((t, i) => {
        const x = 16 + (i % 6) * 48;
        const y = 20 + Math.floor(i / 6) * 32;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="44"
            height="28"
            rx="8"
            className="fill-ink"
            opacity={0.06 + t * 0.72}
          />
        );
      })}
      <path
        d="M208 74c0-9 7-16 16-16s16 7 16 16c0 12-16 26-16 26s-16-14-16-26Z"
        className="fill-canvas stroke-ink"
        strokeWidth="2"
      />
      <circle cx="224" cy="74" r="5" className="fill-ink" />
    </svg>
  );
}

function Route() {
  return (
    <svg viewBox="0 0 320 200" className={frame} role="img" aria-label="Itinerary route schematic">
      <path
        d="M32 156C64 156 70 60 116 60s52 84 96 84 60-92 76-92"
        className="fill-none stroke-hairline"
        strokeWidth="2"
        strokeDasharray="5 6"
      />
      {[
        [32, 156],
        [116, 60],
        [212, 144],
        [288, 52],
      ].map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="11" className="fill-canvas stroke-ink" strokeWidth="2" />
          <circle cx={cx} cy={cy} r="4" className={i === 0 ? 'fill-ink' : 'fill-hairline'} />
        </g>
      ))}
      <rect x="126" y="16" width="76" height="20" rx="10" className="fill-canvas" />
      <rect x="138" y="24" width="52" height="5" rx="2.5" className="fill-hairline" />
    </svg>
  );
}

function Chart() {
  const bars = [38, 62, 48, 88, 72, 104, 92];
  return (
    <svg viewBox="0 0 320 200" className={frame} role="img" aria-label="Model comparison chart schematic">
      <line x1="24" y1="166" x2="300" y2="166" className="stroke-hairline" strokeWidth="1.5" />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={34 + i * 38}
          y={166 - h}
          width="24"
          height={h}
          rx="8"
          className={i === 5 ? 'fill-ink' : 'fill-canvas'}
        />
      ))}
      <path
        d="M46 122 84 100 122 112 160 74 198 86 236 54 274 66"
        className="fill-none stroke-ink"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 5"
      />
    </svg>
  );
}

const map: Record<Artifact, () => JSX.Element> = {
  ct: Ct,
  rank: Rank,
  chat: Chat,
  map: MapRisk,
  route: Route,
  chart: Chart,
};

export function ProjectArtifact({ type }: { type: Artifact }) {
  const Component = map[type] ?? Ct;
  return <Component />;
}
