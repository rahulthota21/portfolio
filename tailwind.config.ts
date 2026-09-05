import type { Config } from 'tailwindcss';

/**
 * Mobbin design language, tokenised.
 * Every colour is a CSS variable so the dark polarity flip is a single class swap.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        muted: 'rgb(var(--text-muted) / <alpha-value>)',
        faint: 'rgb(var(--text-faint) / <alpha-value>)',
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        'canvas-soft': 'rgb(var(--canvas-soft) / <alpha-value>)',
        field: 'rgb(var(--field) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        'hairline-soft': 'rgb(var(--hairline-soft) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'on-primary': 'rgb(var(--on-primary) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', '-apple-system', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        // token: [size, { lineHeight, fontWeight }]
        display: ['80px', { lineHeight: '1', fontWeight: '650' }],
        h1: ['56px', { lineHeight: '1', fontWeight: '650' }],
        h2: ['44px', { lineHeight: '1.13', fontWeight: '650' }],
        h3: ['32px', { lineHeight: '1.13', fontWeight: '650' }],
        h4: ['24px', { lineHeight: '1.25', fontWeight: '650' }],
        title: ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'body-lg': ['20px', { lineHeight: '1.38', fontWeight: '300' }],
        body: ['16px', { lineHeight: '1.38', fontWeight: '450' }],
        'body-sm': ['14px', { lineHeight: '1.43', fontWeight: '450' }],
        link: ['16px', { lineHeight: '1.38', fontWeight: '600' }],
        label: ['12px', { lineHeight: '1.33', fontWeight: '600' }],
        caption: ['12px', { lineHeight: '1.33', fontWeight: '450' }],
      },
      borderRadius: {
        sm: '16px',
        md: '24px',
        full: '9999px',
      },
      spacing: {
        xxs: '4px',
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
        section: '80px',
        'section-lg': '120px',
      },
      maxWidth: {
        content: '1200px',
        prose: '68ch',
      },
      keyframes: {
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseDot: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        rise: 'rise 0.6s cubic-bezier(0.22,1,0.36,1) both',
        marquee: 'marquee 40s linear infinite',
        pulseDot: 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
