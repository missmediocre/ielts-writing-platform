/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ielts-blue': '#1e40af',
        'ielts-green': '#059669',
        'ielts-orange': '#ea580c',
        'ielts-purple': '#7c3aed',
        'border': 'hsl(var(--border))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  safelist: [
    'bg-red-50',
    'text-red-700',
    'border-red-200',
    'bg-green-50',
    'text-green-700',
    'border-green-200',
    'border-border',
    'bg-background',
    'text-foreground',
  ]
}