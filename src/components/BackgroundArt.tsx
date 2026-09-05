'use client';

import { usePathname } from 'next/navigation';

/**
 * Decorative monochrome line art behind the public pages.
 * Toggled from /jackal -> Appearance; never rendered inside the console.
 */
export function BackgroundArt({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  if (!enabled || pathname?.startsWith('/jackal')) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden">
      {/* faint dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgb(var(--ink) / 0.08) 1px, transparent 1.4px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* flowing contour lines + orbits */}
      <svg
        className="absolute inset-0 h-full w-full text-ink opacity-[0.1]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <path d="M-120 690 C 300 500, 520 880, 820 640 S 1320 420, 1620 560" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-120 750 C 320 560, 540 940, 840 700 S 1340 480, 1620 620" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-120 630 C 280 440, 500 820, 800 580 S 1300 360, 1620 500" stroke="currentColor" strokeWidth="1.5" />
        <path d="M-120 130 C 220 60, 420 210, 720 140 S 1200 40, 1620 120" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 10" />
        <circle cx="1190" cy="170" r="150" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="1190" cy="170" r="95" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 9" />
        <circle cx="1190" cy="170" r="4" fill="currentColor" />
        <circle cx="200" cy="760" r="70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 9" />
        <circle cx="200" cy="760" r="4" fill="currentColor" />
        <path d="M60 320 C 180 280, 260 360, 400 330" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
