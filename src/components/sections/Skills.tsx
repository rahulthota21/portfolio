import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import type { SkillGroup } from '@/data/types';

export function Skills({
  heading,
  note,
  groups,
}: {
  heading: string;
  note: string;
  groups: SkillGroup[];
}) {
  const list = groups.filter((g) => g.items.length > 0);
  if (list.length === 0) return null;

  return (
    <section id="skills" className="section-pad scroll-mt-32">
      <div className="container-content">
        <SectionHeader eyebrow="Toolkit" title={heading} note={note} />

        <div className="mt-xl">
          {list.map((group, i) => (
            <Reveal key={group.name} delay={i * 60}>
              <div className="grid gap-md border-b border-hairline-soft py-lg md:grid-cols-[220px_minmax(0,1fr)] md:gap-xl">
                <h3 className="text-title text-ink">{group.name}</h3>
                <ul className="flex flex-wrap gap-xs">
                  {group.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
