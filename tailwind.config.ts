import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#11100E',
        paper: '#F7F3EC',
        champagne: '#B78A45',
        walnut: '#5A3C27',
        sand: '#D9C8B2',
      },
      boxShadow: {
        luxe: '0 24px 70px rgba(17,16,14,0.12)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config
