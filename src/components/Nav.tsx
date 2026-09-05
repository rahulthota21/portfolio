'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function Nav({
  wordmark,
  open,
  availabilityLabel,
}: {
  wordmark: string;
  open: boolean;
  availabilityLabel: string;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onPersonal = pathname?.startsWith('/beyond-code');

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-lg pt-lg md:pt-xl">
      <nav
        className={`pointer-events-auto flex w-full max-w-content items-center gap-xs rounded-full bg-canvas-soft py-2 pl-3 pr-2 transition-[box-shadow,background-color] duration-300 sm:pl-lg ${
          scrolled ? 'shadow-[0_1px_0_0_rgb(var(--hairline))]' : ''
        }`}
      >
        <Link
          href="/"
          className="shrink-0 whitespace-nowrap rounded-full px-1 text-body font-semibold tracking-tight text-ink transition-opacity hover:opacity-70 sm:text-title"
        >
          {wordmark}
        </Link>

        {open && (
          <span
            className="ml-1 hidden items-center gap-2 rounded-full bg-canvas px-3 py-1.5 text-caption text-muted md:inline-flex"
            title={availabilityLabel}
          >
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute h-2 w-2 animate-pulseDot rounded-full bg-ink" />
            </span>
            {availabilityLabel}
          </span>
        )}

        <div className="ml-auto flex items-center gap-1 sm:gap-xs">
          <Link
            href={onPersonal ? '/' : '/beyond-code'}
            className="whitespace-nowrap rounded-full px-2 py-2 text-body-sm font-semibold text-ink transition-opacity hover:opacity-60 sm:px-3 sm:text-link"
          >
            {onPersonal ? 'Work' : (
              <>
                <span className="sm:hidden">Beyond</span>
                <span className="hidden sm:inline">Beyond code</span>
              </>
            )}
          </Link>
          <ThemeToggle />
          <Link
            href="/resume"
            className="inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full bg-ink px-3.5 text-body-sm font-semibold text-canvas sm:px-4 sm:text-link transition-opacity hover:opacity-90 active:scale-[0.98]"
          >
            Resume
          </Link>
        </div>
      </nav>
    </header>
  );
}
