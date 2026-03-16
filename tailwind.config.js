/** @type {import('tailwindcss').Config} */

// Learning Note: Tailwind CSS is a "utility-first" CSS framework.
// Instead of writing custom CSS classes, you use small utility classes
// like "bg-red-600" or "text-white" directly in your HTML/JSX.
// This config file customizes Tailwind with our UGA-inspired color palette.

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // These are our custom colors inspired by Georgia football.
      // We reference them as "bg-dawg-red", "text-dawg-black", etc.
      colors: {
        dawg: {
          red: '#BA0C2F',        // Georgia red - primary brand color
          darkred: '#9B0A28',    // Darker red for hover states
          black: '#1A1A1A',      // Rich black for backgrounds
          charcoal: '#2D2D2D',   // Slightly lighter black for cards
          slate: '#3A3A3A',      // Medium gray for borders/accents
          silver: '#C4C4C4',     // Light gray for muted text
          white: '#FAFAFA',      // Off-white for text
          gold: '#D4A843',       // Accent gold for stars/highlights
        }
      },
      fontFamily: {
        // These fonts give the app a sporty, modern feel
        display: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
