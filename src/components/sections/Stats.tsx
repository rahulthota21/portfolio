import { Counter } from '@/components/Counter';
import { Reveal } from '@/components/Reveal';
import type { Metric } from '@/data/types';

export function Stats({ stats }: { stats: Metric[] }) {
  return (
    <section className="mt-section md:mt-section-lg">
      <div className="container-content">
        <Reveal>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-hairline-soft md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-canvas px-lg py-xl">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block text-h2 leading-none text-ink">
                    <Counter value={s.value} />
                  </span>
                  <span className="mt-sm block text-body-sm text-muted">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
