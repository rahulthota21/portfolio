import { ContactForm } from '@/components/ContactForm';
import { socialIcon } from '@/components/Icons';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import type { SiteContent } from '@/data/types';

export function Contact({ content }: { content: SiteContent }) {
  const { contact, identity } = content;
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? '';

  return (
    <section id="contact" className="section-pad scroll-mt-32">
      <div className="container-content">
        <SectionHeader eyebrow="Contact" title={contact.heading} />

        <div className="mt-xl grid gap-xl lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-section">
          <div>
            <Reveal>
              <p className="max-w-prose text-body-lg pretty text-ink-soft">{contact.body}</p>
            </Reveal>

            <Reveal delay={80}>
              <div className="mt-lg flex flex-col gap-sm">
                <a
                  href={`mailto:${identity.email}`}
                  className="text-h4 text-ink underline decoration-hairline underline-offset-[6px] transition-colors hover:decoration-ink"
                >
                  {identity.email}
                </a>
                <p className="text-body-sm text-muted">
                  {identity.location} · {identity.availability.note}
                </p>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="mt-lg flex flex-wrap gap-xs">
                {contact.socials.map((s) => {
                  const Icon = socialIcon[s.icon];
                  return (
                    <a
                      key={s.name}
                      href={s.url}
                      target={s.url.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer noopener"
                      className="pill-soft"
                    >
                      {Icon && <Icon width={16} height={16} />}
                      {s.name}
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="card-soft p-lg md:p-xl">
              <ContactForm
                endpoint={endpoint}
                subject="Portfolio — hiring / general enquiry"
                privacyNote={contact.privacyNote}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
