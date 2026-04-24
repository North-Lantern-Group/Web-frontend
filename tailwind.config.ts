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
        // NLG v2 brand tokens — dark-first
        'nlg-astronaut': '#00455F',
        'nlg-chathams': '#115C89',
        'nlg-cerulean': '#00AEEF',
        'nlg-cyan': '#00EBF4',
        'nlg-navy': '#0A1628',
        'nlg-white': '#FFFFFF',

        // Dark surface scale
        'nlg-bg-0': '#05101F',
        'nlg-bg-1': '#0A1628',
        'nlg-bg-2': '#0E2135',
        'nlg-bg-3': '#12293F',
        'nlg-bg-tile': '#0C1E32',

        // Dark foreground scale
        'nlg-fg-1': '#F1F6F9',
        'nlg-fg-2': '#C7D2DB',
        'nlg-fg-3': '#8B98A2',
        'nlg-fg-4': '#5A6A78',
        'nlg-fg-5': '#3E4B58',

        // Semantic
        'nlg-success': '#2E8B65',
        'nlg-warning': '#C97A17',
        'nlg-danger': '#C0392B',
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SF Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
