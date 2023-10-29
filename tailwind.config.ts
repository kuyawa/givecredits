import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        slate: {
          100: '#e2e8f0',
          200: '#cbd5e1',
          250: '#94a3b8',
          300: '#545d79',
          600: '#4a5070',
          700: '#272b36',
          800: '#17191f',
          900: '#030b36'
        },
        blue: {
          700: '#3052ff'
        }
      }
    }
  },
  plugins: [],
}
export default config
