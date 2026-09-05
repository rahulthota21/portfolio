import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import type { JourneyItem } from '@/data/types';

export function Journey({ items }: { items: JourneyItem[] }) {
  const list = [...items].sort((a, b) => a.order - b.order);
  if (list.length === 0) return null;

  return (
    <section id="journey" className="section-pad scroll-mt-32">
      <div className="container-content">
        <SectionHeader eyebrow="Timeline" title="How I got here." />

        <ol className="mt-xl">
          {list.map((item, i) => (
            <Reveal key={`${item.year}-${item.title}`} delay={i * 40} as="li">
              <div className="group grid gap-sm border-b border-hairline-soft py-lg md:grid-cols-[160px_minmax(0,1fr)_140px] md:items-baseline md:gap-xl">
                <p className="text-body-sm tabular-nums text-muted">{item.year}</p>
                <div>
                  <h3 className="text-title text-ink">{item.title}</h3>
                  <p className="mt-1 text-body-sm pretty text-muted">{item.detail}</p>
                </div>
                <p className="md:text-right">
                  <span className="chip-outline">{item.tag}</span>
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
