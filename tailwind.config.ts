import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors (60% usage)
        'nlg-navy': '#1B2838',
        'nlg-cyan': '#00D4FF',
        'nlg-white': '#FFFFFF',

        // Secondary Colors (30% usage)
        'nlg-hunter-green': '#355E3B',
        'nlg-teal': '#00A8A8',
        'nlg-light-gray': '#E5E9ED',
        'nlg-charcoal': '#3C4852',

        // Tertiary Colors (10% usage)
        'nlg-deep-navy': '#0F1922',
        'nlg-pine-green': '#01796F',
        'nlg-emerald': '#50C878',
        'nlg-coral': '#FF7043',
        'nlg-mid-gray': '#A0A0B5',
        'nlg-forest-green': '#2C5A32',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
