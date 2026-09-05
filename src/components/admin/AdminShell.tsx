'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOutAction } from '@/app/jackal/actions';
import { ArrowUpRight, Logout } from '@/components/Icons';
import { SECTION_META } from '@/lib/sections';

const groups = Array.from(new Set(SECTION_META.map((s) => s.group)));

function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`block truncate rounded-full px-sm py-2 text-body-sm transition-colors ${
        active ? 'bg-ink text-canvas' : 'text-muted hover:bg-canvas-soft hover:text-ink'
      }`}
    >
      {label}
    </Link>
  );
}

/** Shared shell used by the dashboard pages (not the login screen). */
export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string | null;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - desktop */}
      <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 flex-col border-r border-hairline-soft bg-canvas px-md py-lg lg:flex">
        <div className="px-sm">
          <Link href="/jackal" className="text-title text-ink transition-opacity hover:opacity-70">
            Console
          </Link>
          <p className="mt-0.5 text-caption text-faint">rahulthota.dev</p>
        </div>

        <nav className="no-scrollbar mt-lg flex-1 overflow-y-auto">
          {groups.map((g) => (
            <div key={g} className="mb-md">
              <p className="px-sm pb-xs text-label text-faint">{g}</p>
              <div className="flex flex-col gap-0.5">
                {SECTION_META.filter((s) => s.group === g).map((s) => (
                  <NavLink
                    key={s.key}
                    href={`/jackal/edit/${s.key}`}
                    label={s.label}
                    active={pathname === `/jackal/edit/${s.key}`}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="mb-md">
            <p className="px-sm pb-xs text-label text-faint">Files</p>
            <div className="flex flex-col gap-0.5">
              <NavLink
                href="/jackal/media"
                label="Media & resume"
                active={pathname === '/jackal/media'}
              />
            </div>
          </div>
        </nav>

        <div className="border-t border-hairline-soft pt-sm">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-sm px-sm py-2 text-body-sm text-muted transition-colors hover:text-ink"
          >
            View site <ArrowUpRight width={14} height={14} />
          </a>
          {email && <p className="truncate px-sm py-1 text-caption text-faint">{email}</p>}
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-1.5 rounded-sm px-sm py-2 text-left text-body-sm text-muted transition-colors hover:text-ink"
            >
              <Logout width={14} height={14} /> Sign out
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar - mobile */}
        <header className="sticky top-0 z-40 flex items-center justify-between gap-md border-b border-hairline-soft bg-canvas/90 px-lg py-sm backdrop-blur lg:hidden">
          <Link href="/jackal" className="text-title text-ink">
            Console
          </Link>
          <a href="/" target="_blank" rel="noreferrer" className="pill-outline h-9 px-sm text-caption">
            View site <ArrowUpRight width={13} height={13} />
          </a>
        </header>

        <main className="mx-auto w-full max-w-[1080px] flex-1 px-lg py-xl md:px-xl md:py-xl">
          {children}
        </main>
      </div>
    </div>
  );
}
