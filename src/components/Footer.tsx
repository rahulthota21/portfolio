import Link from 'next/link';
import { socialIcon } from './Icons';
import type { SiteContent } from '@/data/types';

export function Footer({ content }: { content: SiteContent }) {
  const { contact, footer, identity } = content;

  return (
    <footer className="mt-section px-lg pb-0 md:mt-section-lg">
      <div className="mx-auto max-w-content rounded-t-md bg-ink px-lg py-xl text-canvas md:px-xl">
        <div className="flex flex-col gap-lg sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <Link href="/" className="text-title text-canvas transition-opacity hover:opacity-70">
              {identity.wordmark}
            </Link>
            <p className="text-caption text-faint">{footer.line}</p>
          </div>

          <div className="flex items-center gap-xs">
            {contact.socials.map((s) => {
              const Icon = socialIcon[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer noopener"
                  aria-label={s.name}
                  title={s.name}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-canvas transition-colors hover:bg-white/10"
                >
                  {Icon ? <Icon width={17} height={17} /> : s.name.charAt(0)}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
