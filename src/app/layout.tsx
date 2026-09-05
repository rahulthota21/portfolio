import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { BackgroundArt } from '@/components/BackgroundArt';
import { themeScript } from '@/components/ThemeToggle';
import { getContent } from '@/lib/content';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  axes: ['opsz'],
});

export async function generateMetadata(): Promise<Metadata> {
  const { meta, identity } = await getContent();
  const url = process.env.NEXT_PUBLIC_SITE_URL || meta.url;
  return {
    metadataBase: new URL(url),
    title: { default: meta.title, template: `%s - ${identity.name}` },
    description: meta.description,
    authors: [{ name: meta.author, url }],
    creator: meta.author,
    keywords: [
      'Thota Rahul',
      'AI/ML engineer',
      'backend developer',
      'FastAPI',
      'machine learning',
      'IEEE',
      'Amrita Vishwa Vidyapeetham',
      'Vijayawada',
    ],
    openGraph: {
      type: 'website',
      url,
      title: meta.title,
      description: meta.description,
      siteName: identity.name,
      images: [{ url: meta.ogImage, width: 1200, height: 630, alt: meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [meta.ogImage],
    },
    alternates: { canonical: url },
    robots: { index: true, follow: true },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0d0d0d' },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  const artOn = content.settings?.backgroundArt ?? true;

  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <BackgroundArt enabled={artOn} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-lg focus:top-lg focus:z-[60] focus:rounded-full focus:bg-ink focus:px-lg focus:py-3 focus:text-link focus:text-canvas"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
