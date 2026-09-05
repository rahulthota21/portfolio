'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from './Icons';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Light' : 'Dark'}
      className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-canvas active:scale-95 dark:hover:bg-canvas"
    >
      {mounted && dark ? <Moon width={17} height={17} /> : <Sun width={17} height={17} />}
      <span className={className} />
    </button>
  );
}

/** Runs before paint so the correct theme is applied with no flash. */
export const themeScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&false&&m)){document.documentElement.classList.add('dark')}}catch(e){}})();`;
