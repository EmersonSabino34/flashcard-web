import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./store/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef5ff",
          100: "#d6e7ff",
          200: "#adcfff",
          300: "#7ab3ff",
          400: "#4f96ff",
          500: "#216eff",
          600: "#0f4de0",
          700: "#0b3bb1",
          800: "#0b2f8a",
          900: "#0b276e"
        },
        accent: {
          100: "#fef6e7",
          200: "#fbe0b8",
          300: "#f9c989",
          400: "#f5a94f",
          500: "#f18a1f",
          600: "#d66f0d"
        },
        success: "#22c55e",
        warning: "#facc15",
        danger: "#ef4444"
      },
      fontFamily: {
        display: ["var(--font-rubik)", "sans-serif"],
        sans: ["var(--font-inter)", "sans-serif"]
      },
      boxShadow: {
        card: "0 12px 24px -12px rgba(33, 110, 255, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
