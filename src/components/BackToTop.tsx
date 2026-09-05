'use client';

import { Up } from './Icons';

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }}
      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-caption text-canvas transition-colors hover:bg-white/10"
    >
      Back to top
      <Up width={13} height={13} />
    </button>
  );
}
