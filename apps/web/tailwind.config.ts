import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#f4ead5',
        obsidian: '#151216',
      },
    },
  },
  plugins: [],
};

export default config;
