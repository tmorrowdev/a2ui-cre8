/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'barber': {
          'bg': '#0B0B0E',
          'card': '#16161A',
          'border': '#2A2A2E',
          'primary': '#6366F1',
          'text': '#FAFAF9',
          'muted': '#6B6B70',
          'success': '#32D583',
          'danger': '#E85A4F',
        }
      },
      fontFamily: {
        'display': ['Fraunces', 'serif'],
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
