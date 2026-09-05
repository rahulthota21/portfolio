import { Reveal } from '@/components/Reveal';
import type { ReactNode } from 'react';

export function SectionHeader({
  id,
  eyebrow,
  title,
  note,
  action,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  note?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal>
      <div
        id={id}
        className="flex flex-col gap-md border-b border-hairline-soft pb-lg md:flex-row md:items-end md:justify-between"
      >
        <div>
          {eyebrow && <p className="eyebrow mb-sm">{eyebrow}</p>}
          <h2 className="type-h2 balance text-ink">{title}</h2>
          {note && <p className="mt-sm max-w-prose text-body pretty text-muted">{note}</p>}
        </div>
        {action}
      </div>
    </Reveal>
  );
}
