/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "ui-sans-serif", "system-ui"]
      },
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",   // warm orange
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12"
        },
        grape: {
          500: "#7c3aed",   // purple accent
          600: "#6d28d9"
        }
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem'
      },
      boxShadow: {
        soft: "0 10px 25px -10px rgba(16,24,40,.1), 0 6px 12px -6px rgba(16,24,40,.06)"
      },
      backgroundImage: {
        'grain': "radial-gradient(60% 60% at 0% 0%, rgba(249,115,22,.08) 0%, rgba(124,58,237,.08) 100%), radial-gradient(60% 60% at 100% 0%, rgba(124,58,237,.08) 0%, rgba(249,115,22,.08) 100%)"
      }
    },
  },
  plugins: [],
}
