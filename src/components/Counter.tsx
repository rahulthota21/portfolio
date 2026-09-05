'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts a stat up when it scrolls into view.
 * Handles "8.29", "8/80", "6" and any string with digits — non-numeric
 * values (like "8/80") animate their leading number only.
 */
export function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<string>(() => value.replace(/[\d]/g, '0'));
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const match = value.match(/^([\d.,]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, numPart, rest] = match;
    const decimals = (numPart.split('.')[1] ?? '').length;
    const target = parseFloat(numPart.replace(/,/g, ''));

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        const duration = 1100;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          const current = target * eased;
          const formatted =
            decimals > 0
              ? current.toFixed(decimals)
              : Math.round(current).toLocaleString('en-IN');
          setDisplay(formatted + rest);
          if (t < 1) requestAnimationFrame(tick);
          else setDisplay(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
