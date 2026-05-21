/** @type {import('tailwindcss').Config} */
export default {
  content: [    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
],
  theme: {
    extend: {},
  },
  safelist: [
    // Dynamic gradient backgrounds used in Dashboard quickActions
    'from-blue-500', 'to-indigo-600',
    'from-green-500', 'to-emerald-600',
    'from-purple-500', 'to-pink-600',
    'from-orange-500', 'to-red-600',
    // Activity type badge backgrounds
    'bg-blue-100', 'text-blue-600',
    'bg-purple-100', 'text-purple-600',
    'bg-orange-100', 'text-orange-600',
    'bg-green-100', 'text-green-600',
  ],
  plugins: [],
}

