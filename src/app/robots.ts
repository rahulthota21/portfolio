import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://rahulthota.dev';
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/jackal', '/jackal/'] }],
    sitemap: `${base}/sitemap.xml`,
  };
}
