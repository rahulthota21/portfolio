import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import type { SiteContent } from '@/data/types';

export function About({ content }: { content: SiteContent }) {
  const { about, identity } = content;

  return (
    <section id="about" className="section-pad scroll-mt-32">
      <div className="container-content">
        <SectionHeader title={about.heading} eyebrow="Who I am" />

        <div className="mt-xl grid gap-xl lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-section">
          <div className="space-y-lg">
            {about.body.map((para, i) => (
              <Reveal key={i} delay={i * 70}>
                <p className="max-w-prose text-body-lg pretty text-ink-soft">{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="card-soft p-lg md:p-xl">
              <p className="eyebrow">Quick facts</p>
              <dl className="mt-md">
                {about.quickFacts.map((f, i) => (
                  <div
                    key={f.label}
                    className={`py-sm ${i === 0 ? 'border-t' : ''} border-b border-hairline`}
                  >
                    <dt className="text-caption text-muted">{f.label}</dt>
                    <dd className="mt-0.5 text-body-sm text-ink">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-lg flex flex-wrap gap-xs">
                {identity.languages.map((l) => (
                  <span key={l} className="rounded-full bg-canvas px-3 py-1.5 text-caption text-muted">
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
