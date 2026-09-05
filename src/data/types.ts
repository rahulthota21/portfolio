/**
 * The shape of every piece of content on the site.
 * Supabase tables mirror these exactly (see supabase/schema.sql),
 * so the seed file and the database are interchangeable.
 */

export type Cta = { label: string; href: string; style: 'primary' | 'secondary' | 'link' };
export type Row = { label: string; value: string };
export type Metric = { value: string; label: string };

export interface Meta {
  title: string;
  description: string;
  author: string;
  url: string;
  ogImage: string;
}

export interface Identity {
  name: string;
  wordmark: string;
  location: string;
  nativePlace: string;
  email: string;
  languages: string[];
  availability: { open: boolean; label: string; note: string; since: string };
  currentlyExploring: string;
}

export interface Hero {
  eyebrow: string;
  headline: string;
  body: string;
  ctas: Cta[];
  statusLine: string;
  profileCard: { heading: string; subheading: string; rows: Row[]; chips: string[] };
}

export interface About {
  heading: string;
  body: string[];
  quickFacts: Row[];
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export type Artifact = 'ct' | 'rank' | 'chat' | 'map' | 'route' | 'chart';

export interface PipelineStep {
  label: string;
  detail?: string;
}

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  role: string;
  timeline: string;
  badge: string;
  status: string;
  overview: string;
  problem: string;
  solution: string;
  highlights: string[];
  metrics: Metric[];
  stack: string[];
  pipeline: PipelineStep[];
  links: { github: string; demo: string; pdf: string };
  artifact: Artifact;
  archImage?: string | null;
  featured: boolean;
  order: number;
  published: boolean;
}

export interface Publication {
  title: string;
  short: string;
  venue: string;
  role: string;
  status: string;
  project: string | null;
  pdf: string;
  note: string;
  order: number;
}

export interface JourneyItem {
  year: string;
  title: string;
  detail: string;
  tag: string;
  order: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Names stay hidden until the person has actually approved the quote. */
  approved: boolean;
  order: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  published: boolean;
}

export interface FavouriteItem {
  title: string;
  caption?: string;
  /** Uploaded from /jackal. Falls back to a typographic tile when absent. */
  image?: string | null;
}

export interface FavouriteSection {
  id: string;
  title: string;
  icon: string;
  /** 'poster' = tall 2:3 tiles, 'portrait' = square tiles, 'pill' = text chips. */
  display: 'poster' | 'portrait' | 'pill';
  items: FavouriteItem[];
  order: number;
}

export interface Personal {
  quote: string;
  intro: string;
  sections: FavouriteSection[];
  now: Row[];
  freelance: { title: string; body: string; cta: string };
}

export interface Contact {
  heading: string;
  body: string;
  privacyNote: string;
  socials: { name: string; url: string; icon: string }[];
}

export interface SiteContent {
  meta: Meta;
  identity: Identity;
  hero: Hero;
  stats: Metric[];
  about: About;
  skills: { heading: string; note: string; groups: SkillGroup[] };
  projects: Project[];
  publications: Publication[];
  journey: JourneyItem[];
  testimonials: Testimonial[];
  blog: BlogPost[];
  personal: Personal;
  contact: Contact;
  resume: { file: string; updated: string };
  footer: { line: string };
}
