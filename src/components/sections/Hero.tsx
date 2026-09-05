import Link from 'next/link';
import { ArrowRight, Download, Mail } from '@/components/Icons';
import { Reveal } from '@/components/Reveal';
import type { SiteContent } from '@/data/types';

export function Hero({ content }: { content: SiteContent }) {
  const { hero, identity } = content;
  const card = hero.profileCard;

  return (
    <section className="relative pt-[132px] md:pt-[176px]">
      <div className="container-content">
        <div className="grid items-start gap-xl lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-section">
          {/* ── Left: the statement ─────────────────────────────── */}
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-xs">
                <span className="chip">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-pulseDot rounded-full bg-ink" />
                  </span>
                  {hero.eyebrow}
                </span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="type-display mt-lg balance text-ink">{hero.headline}</h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-lg max-w-prose text-body-lg pretty text-muted">{hero.body}</p>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-xl flex flex-wrap items-center gap-sm">
                {hero.ctas.map((cta) => {
                  if (cta.style === 'primary')
                    return (
                      <Link key={cta.label} href={cta.href} className="pill-primary group">
                        {cta.label}
                        <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </Link>
                    );
                  if (cta.style === 'secondary')
                    return (
                      <Link key={cta.label} href={cta.href} className="pill-outline">
                        <Download width={15} height={15} />
                        {cta.label}
                      </Link>
                    );
                  return (
                    <Link
                      key={cta.label}
                      href={cta.href}
                      className="inline-flex h-11 items-center gap-1 rounded-full px-2 text-link text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-ink"
                    >
                      {cta.label}
                    </Link>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={240}>
              <p className="mt-xl flex items-center gap-sm text-body-sm text-faint">
                <span className="h-px w-8 bg-hairline" aria-hidden />
                {hero.statusLine}
              </p>
            </Reveal>
          </div>

          {/* ── Right: the profile card ─────────────────────────── */}
          <Reveal delay={140}>
            <aside className="card-soft w-full p-lg md:p-xl">
              <p className="eyebrow">Education</p>
              <h2 className="mt-sm text-h4 leading-tight text-ink">{card.heading}</h2>
              <p className="mt-1 text-body-sm text-muted">{card.subheading}</p>

              <dl className="mt-lg">
                {card.rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`flex items-baseline justify-between gap-md py-sm ${
                      i === 0 ? 'border-t' : ''
                    } border-b border-hairline`}
                  >
                    <dt className="shrink-0 text-body-sm text-muted">{row.label}</dt>
                    <dd className="text-right text-body-sm text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-lg flex flex-wrap gap-xs">
                {card.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full bg-canvas px-3 py-1.5 text-caption text-muted"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <a
                href={`mailto:${identity.email}`}
                className="mt-lg inline-flex items-center gap-2 text-body-sm font-semibold text-ink underline decoration-hairline underline-offset-4 transition-colors hover:decoration-ink"
              >
                <Mail width={15} height={15} />
                Email me
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
