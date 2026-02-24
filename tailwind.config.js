/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        border: 'var(--color-border)',
        error: 'var(--color-error)',
        inverted: 'var(--color-inverted)',
        warning: 'var(--color-warning)',
        info: 'var(--color-info)',
      },
      fontFamily: {
        sans: [
          '"Noto Sans"',          // Latin/English
          '"Noto Sans JP"',       // Japanese
          '"Noto Sans Myanmar"',  // Burmese
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
};