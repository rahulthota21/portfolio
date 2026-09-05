import type { SiteContent } from '@/data/types';

export const SECTION_META: {
  key: keyof SiteContent;
  label: string;
  description: string;
  group: 'Home page' | 'Beyond code' | 'Site';
}[] = [
  { key: 'hero', label: 'Hero', description: 'Headline, intro, buttons, education card', group: 'Home page' },
  { key: 'stats', label: 'Stats strip', description: 'The four numbers under the hero', group: 'Home page' },
  { key: 'about', label: 'About', description: 'Paragraphs and quick facts', group: 'Home page' },
  { key: 'projects', label: 'Projects', description: 'Case studies, metrics, stacks, links', group: 'Home page' },
  { key: 'publications', label: 'Publications', description: 'Papers, venues, statuses, PDFs', group: 'Home page' },
  { key: 'skills', label: 'Skills', description: 'Groups and the tools inside them', group: 'Home page' },
  { key: 'journey', label: 'Journey', description: 'Timeline entries', group: 'Home page' },
  { key: 'testimonials', label: 'Testimonials', description: 'Quotes and their approval state', group: 'Home page' },
  { key: 'blog', label: 'Writing', description: 'Posts — hidden until one is published', group: 'Home page' },
  { key: 'contact', label: 'Contact', description: 'Copy and social links', group: 'Home page' },
  { key: 'personal', label: 'Beyond code', description: 'Quote, Now, favourites, freelance card', group: 'Beyond code' },
  { key: 'identity', label: 'Identity', description: 'Name, email, availability, languages', group: 'Site' },
  { key: 'meta', label: 'SEO & metadata', description: 'Title, description, OG image', group: 'Site' },
  { key: 'resume', label: 'Resume file', description: 'The PDF served at /resume', group: 'Site' },
  { key: 'footer', label: 'Footer', description: 'The copyright line', group: 'Site' },
];

export function sectionLabel(key: string) {
  return SECTION_META.find((s) => s.key === key)?.label ?? key;
}

export function countOf(key: keyof SiteContent, content: SiteContent): string {
  const v = content[key] as unknown;
  if (Array.isArray(v)) return `${v.length} items`;
  if (key === 'personal') {
    const sections = content.personal.sections;
    const filled = sections.filter((s) => s.items.length > 0).length;
    return `${filled}/${sections.length} sections filled`;
  }
  if (key === 'skills') return `${content.skills.groups.length} groups`;
  return 'Edit';
}
