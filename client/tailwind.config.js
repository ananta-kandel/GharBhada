/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f3f4f6',  // Light gray background
        primary: '#3b82f6',     // Blue
        'primary-dark': '#2563eb',  // Darker blue for hover states
        secondary: '#1f2937',   // Dark gray for footer
        accent: '#10b981',      // Green for accents or success states
      }
    },
  },
  plugins: [],
}

