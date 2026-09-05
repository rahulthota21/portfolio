import Link from 'next/link';
import { ArrowUpRight } from '@/components/Icons';
import { Reveal } from '@/components/Reveal';
import { SectionHeader } from '@/components/SectionHeader';
import type { BlogPost } from '@/data/types';

/** Hidden entirely until a real post is published from /jackal. */
export function Blog({ posts }: { posts: BlogPost[] }) {
  const list = posts.filter((p) => p.published);
  if (list.length === 0) return null;

  return (
    <section id="writing" className="section-pad scroll-mt-32">
      <div className="container-content">
        <SectionHeader eyebrow="Writing" title="Notes from what I'm building." />
        <div className="mt-xl grid gap-lg md:grid-cols-2">
          {list.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 2) * 80} as="article">
              <Link href={`/writing/${post.slug}`} className="card group block h-full p-lg md:p-xl">
                <p className="text-caption text-muted">{post.date}</p>
                <h3 className="mt-sm text-h4 pretty text-ink">{post.title}</h3>
                <p className="mt-sm text-body pretty text-muted">{post.excerpt}</p>
                <span className="mt-lg inline-flex items-center gap-1.5 text-link text-ink">
                  Read
                  <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
