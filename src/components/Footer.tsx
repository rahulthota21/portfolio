import { Mail, socialIcon } from './Icons';
import { BackToTop } from './BackToTop';
import type { SiteContent } from '@/data/types';

/**
 * Ink footer: a big wordmark statement, an email call to action, the social
 * pills, and the legal line with a smooth back-to-top. Same content, more
 * presence - it closes the page the way the hero opens it.
 */
export function Footer({ content }: { content: SiteContent }) {
  const { contact, footer, identity } = content;

  return (
    <footer className="mt-section px-lg md:mt-section-lg">
      <div className="mx-auto max-w-content rounded-t-md bg-ink text-canvas">
        <div className="flex flex-col px-lg pb-lg pt-section md:px-xl">
          {/* Statement + call to action */}
          <div className="flex flex-wrap items-end justify-between gap-lg border-b border-white/10 pb-xl">
            <div className="min-w-0">
              <p className="text-label text-canvas/50">{identity.location}</p>
              <p className="type-h1 mt-sm text-canvas">{identity.wordmark}</p>
              <p className="mt-sm max-w-prose text-body text-canvas/60">
                {identity.availability.note}
              </p>
            </div>
            <a
              href={`mailto:${identity.email}`}
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-canvas px-lg text-link text-ink transition-opacity hover:opacity-90"
            >
              <Mail width={16} height={16} />
              Email me
            </a>
          </div>

          {/* Socials */}
          <div className="flex flex-wrap items-center gap-sm py-lg">
            <p className="mr-sm text-label text-canvas/50">Connect</p>
            {contact.socials.map((s) => {
              const Icon = socialIcon[s.icon];
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer noopener"
                  aria-label={s.name}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-body-sm text-canvas transition-colors hover:bg-white/10"
                >
                  {Icon ? <Icon width={15} height={15} /> : null}
                  {s.name}
                </a>
              );
            })}
          </div>

          {/* Legal + back to top */}
          <div className="flex flex-wrap items-center justify-between gap-md border-t border-white/10 pt-lg">
            <p className="text-caption text-canvas/50">{footer.line}</p>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}
