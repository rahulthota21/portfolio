import Link from 'next/link';
import { ArrowUpRight, Github } from '@/components/Icons';
import { ProjectArtifact } from '@/components/ProjectArtifact';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import type { Project } from '@/data/types';

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const stackShown = project.stack.slice(0, 5);
  const extra = project.stack.length - stackShown.length;

  return (
    <Reveal delay={(index % 2) * 80} as="article">
      <div className="card group relative flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-hairline">
        {/* Artifact */}
        <div className="relative m-lg mb-0 aspect-[16/9] overflow-hidden rounded-sm bg-canvas-soft">
          <div className="absolute inset-0 p-md transition-transform duration-500 group-hover:scale-[1.02]">
            <ProjectArtifact type={project.artifact} />
          </div>
          <span className="absolute left-md top-md rounded-full bg-canvas/90 px-3 py-1.5 text-label text-ink backdrop-blur">
            {project.category}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-lg">
          <div className="flex items-center justify-between gap-md">
            <p className="text-caption text-muted">{project.timeline}</p>
            <p className="text-caption text-muted">{project.role}</p>
          </div>

          <h3 className="mt-sm text-h4 text-ink">
            <Link href={`/work/${project.slug}`} className="outline-none after:absolute after:inset-0">
              {project.name}
            </Link>
          </h3>
          <p className="mt-1 text-body pretty text-muted">{project.subtitle}</p>

          <p className="mt-md text-body-sm pretty text-ink-soft">{project.overview}</p>

          {project.metrics.length > 0 && (
            <dl
              className={`mt-lg grid gap-x-md gap-y-md border-t border-hairline-soft pt-lg ${
                project.metrics.length <= 2 ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-4'
              }`}
            >
              {project.metrics.slice(0, 4).map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-title text-ink">{m.value}</span>
                    <span className="mt-0.5 block text-caption text-muted">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-lg flex flex-wrap gap-xs">
            {stackShown.map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
            {extra > 0 && <span className="chip-outline">+{extra}</span>}
          </div>

          <div className="mt-lg flex items-center justify-between gap-md border-t border-hairline-soft pt-lg">
            <span className="inline-flex items-center gap-1.5 text-link text-ink">
              Read the case study
              <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            <span className="relative z-10 flex items-center gap-xs">
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full bg-canvas-soft px-3 py-1.5 text-caption text-ink transition-opacity hover:opacity-70"
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
                  className="grid h-8 w-8 place-items-center rounded-full bg-canvas-soft text-ink transition-opacity hover:opacity-70"
                >
                  <Github width={15} height={15} />
                </a>
              )}
            </span>
          </div>
        </div>

        {project.badge && (
          <span className="absolute right-lg top-lg rounded-full bg-ink px-3 py-1.5 text-label text-canvas">
            {project.badge}
          </span>
        )}
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
          note="Model, backend and interface — each one shipped, measured and written up."
        />
        <div className="mt-xl grid gap-lg lg:grid-cols-2">
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
