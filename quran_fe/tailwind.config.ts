import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2d7a4f',
          light: '#3a9461',
          dark: '#1f5238',
        },
        dark: {
          bg: '#0f1117',
          sidebar: '#1a1d27',
          card: '#161b22',
        },
      },
      fontFamily: {
        arabic: ['Scheherazade New', 'KFGQ', 'serif'],
        amiri: ['Amiri', 'serif'],
        kfgq: ['KFGQ', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        arabic: '30px',
        'arabic-sm': '16px',
        'arabic-lg': '48px',
      },
    },
  },
  plugins: [],
};

export default config;
