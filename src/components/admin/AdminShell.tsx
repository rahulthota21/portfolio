import Link from 'next/link';
import { signOutAction } from '@/app/jackal/actions';
import { ArrowUpRight, Logout } from '@/components/Icons';
import { SECTION_META } from '@/lib/sections';

/** Shared shell used by the dashboard pages (not the login screen). */
export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string | null;
}) {
  const groups = Array.from(new Set(SECTION_META.map((s) => s.group)));

  return (
    <div className="mx-auto flex min-h-screen max-w-[1400px] gap-0">
      <aside className="sticky top-0 hidden h-screen w-[264px] shrink-0 flex-col border-r border-hairline-soft bg-canvas px-md py-lg lg:flex">
        <Link href="/jackal" className="px-sm text-title text-ink">
          Console
        </Link>
        <p className="mt-1 px-sm text-caption text-faint">rahulthota.dev</p>

        <nav className="mt-lg flex-1 overflow-y-auto no-scrollbar">
          {groups.map((g) => (
            <div key={g} className="mb-md">
              <p className="px-sm pb-xs text-label text-faint">{g}</p>
              {SECTION_META.filter((s) => s.group === g).map((s) => (
                <Link
                  key={s.key}
                  href={`/jackal/edit/${s.key}`}
                  className="block rounded-sm px-sm py-2 text-body-sm text-ink transition-colors hover:bg-canvas-soft"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="mb-md">
            <p className="px-sm pb-xs text-label text-faint">Files</p>
            <Link
              href="/jackal/media"
              className="block rounded-sm px-sm py-2 text-body-sm text-ink transition-colors hover:bg-canvas-soft"
            >
              Media & resume
            </Link>
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

      <main className="min-w-0 flex-1 px-lg py-lg md:px-xl md:py-xl">{children}</main>
    </div>
  );
}
