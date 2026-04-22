import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'plex-mono': ['IBM Plex Mono', 'monospace'],
      },
      colors: {
        canvas: '#f8f8f6',
        ink: '#161a1d',
        'muted-ink': '#4f565c',
        line: '#d4d9de',
        card: '#ffffff',
        accent: '#105da8',
        'ad-bg': '#eef2f6',
      },
    },
  },
  plugins: [],
} satisfies Config;
