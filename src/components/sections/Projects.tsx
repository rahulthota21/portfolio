import Link from 'next/link';
import { ArrowUpRight, Github } from '@/components/Icons';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import type { Project } from '@/data/types';

/**
 * Premium monochrome cards: a quiet grey slab that lifts off the page with a
 * hairline border and a soft shadow on hover. Compact by design - every field
 * is kept, the air around it is not. Polarity flips in dark mode.
 */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const stackShown = project.stack.slice(0, 5);
  const extra = project.stack.length - stackShown.length;

  return (
    <Reveal delay={(index % 2) * 80} as="article">
      <div className="group relative flex h-full flex-col rounded-md border border-hairline-soft bg-canvas-soft p-md transition-all duration-300 hover:-translate-y-0.5 hover:border-hairline hover:shadow-[0_16px_40px_rgb(0_0_0/0.08)] md:p-lg">
        <div className="flex flex-wrap items-center justify-between gap-sm">
          <span className="flex flex-wrap items-center gap-xs">
            <span className="rounded-full border border-hairline-soft bg-canvas px-3 py-1 text-label text-muted">
              {project.category}
            </span>
            {project.badge && (
              <span className="rounded-full bg-ink px-3 py-1 text-label text-canvas">
                {project.badge}
              </span>
            )}
          </span>
          <p className="text-caption text-faint">
            {project.timeline} · {project.role}
          </p>
        </div>

        <h3 className="mt-md text-h4 text-ink">
          <Link href={`/work/${project.slug}`} className="outline-none after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>
        <p className="mt-0.5 text-body-sm text-muted">{project.subtitle}</p>

        <p className="mt-sm text-body-sm text-ink-soft">{project.overview}</p>

        {project.metrics.length > 0 && (
          <dl className="mt-md grid grid-cols-2 gap-x-md gap-y-sm border-t border-hairline-soft pt-md sm:grid-cols-4">
            {project.metrics.slice(0, 4).map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="block text-link text-ink">{m.value}</span>
                  <span className="mt-0.5 block text-caption text-faint">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-md flex flex-wrap gap-xs">
          {stackShown.map((s) => (
            <span
              key={s}
              className="rounded-full border border-hairline-soft bg-canvas px-2.5 py-1 text-caption text-muted"
            >
              {s}
            </span>
          ))}
          {extra > 0 && (
            <span className="rounded-full border border-hairline-soft bg-canvas px-2.5 py-1 text-caption text-faint">
              +{extra}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-md border-t border-hairline-soft pt-md">
          <span className="mt-md inline-flex items-center gap-1.5 text-body-sm font-semibold text-ink">
            Read the case study
            <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
          <span className="relative z-10 mt-md flex items-center gap-xs">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-hairline-soft bg-canvas px-3 py-1 text-caption text-ink transition-colors hover:border-hairline"
              >
                Live demo
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.name} on GitHub`}
                className="grid h-7 w-7 place-items-center rounded-full border border-hairline-soft bg-canvas text-ink transition-colors hover:border-hairline"
              >
                <Github width={14} height={14} />
              </a>
            )}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const list = projects.filter((p) => p.published).sort((a, b) => a.order - b.order);
  if (list.length === 0) return null;

  return (
    <section id="projects" className="section-pad scroll-mt-32">
      <div className="container-content">
        <SectionHeader
          eyebrow="Selected work"
          title="Six systems, built end to end."
          note="Model, backend and interface - each one shipped, measured and written up."
        />
        <div className="mt-xl grid gap-md lg:grid-cols-2 lg:gap-lg">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
