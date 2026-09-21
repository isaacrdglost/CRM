/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#141311',
        paper: '#FFFFFF',
        line: '#DEDAD2',
        muted: '#6B6759',
        faint: '#948F80',
        accent: '#7A2E2E',
        'accent-soft': '#F4E9E9',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        sm: '2px',
        md: '4px',
      },
    },
  },
  plugins: [],
};
