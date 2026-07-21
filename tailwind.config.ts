import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#004D40",
        canopy: "#0B6646",
        mint: "#22C55E",
        slatewash: "#EEF5F1"
      },
      boxShadow: {
        lift: "0 22px 60px rgba(0, 77, 64, 0.16)"
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-100% / 3))' },
        }
      }
    }
  },
  plugins: []
};

export default config;
