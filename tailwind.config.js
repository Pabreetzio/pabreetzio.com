/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(2rem)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeOut: {
          '0%, 75%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'slide-up': 'slideUp 0.35s ease-out forwards',
        'fade-out': 'fadeOut 5s ease-in forwards',
      },
      colors: {
        xbox: {
          green: '#107C10',
          'green-light': '#52B043',
        },
      },
    },
  },
  plugins: [],
}
