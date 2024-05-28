import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '360px',
      md: '600px',
      lg: '900px',
      configxl: '1300px',
    },
    colors: {
      'primary-white': '#FFFFFF',
      'primary-orange': '#C75000',
      'primary-blue': '#0535FF',
      'primary-black': '#000000',
      'secondary-yellow': '#FFE700',
      'secondary-green': '#77FB4C',
      'tertiary-light-orange': '#FFF2E9',
      'tertiary-light-blue': '#EFF1FE',
      'tertiary-light-yellow': '#FFFCE8',
      'tertiary-light-green': '#F4FEEE',
      'text-primary': '#222222',
      'text-secondary': '#757575',
      'text-disabled': '#CCCCCC',
      'text-hint': '#AAAAAA',
      error: '#EB1100',
      'error-contrast-text': '#FFFFFF',
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      euclid: ['var(--font-euclid)', 'sans-serif'],
      goodsans: ['var(--font-goodsans)', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        slidesFromRight: {
          '0%': { transform: 'translateX(0.75rem)' },
          '100%': { transform: 'translateX(0)' },
        },
        slidesFromLeft: {
          '0%': { transform: 'translateX(-2rem)' },
          '100%': { transform: 'translateX(0)' },
        },
        slidesUp: {
          '0%': { transform: 'translateY(3rem)', opacity: '0%' },
          '100%': { transform: 'translate(0)', opacity: '100%' },
        },
        slidesUpInfoBar: {
          '0%': { height: '100%' },
          '100%': { height: '0%' },
        },
        fadeInLoading: {
          '0%': { opacity: '0%' },
          '100%': { opacity: '100%' },
        },
      },
      animation: {
        slidesFromRight: 'slidesFromRight .5s ease-out',
        slidesFromLeft: 'slidesFromLeft .8s ease-out',
        slidesUp: 'slidesUp .3s ease-out',
        slidesUpInfoBar: 'slidesUpInfoBar .3s ease-out',
        fadeInLoading: 'fadeInLoading .7s ease-in-out',
      },
    },
  },
  plugins: [],
};
export default config;
