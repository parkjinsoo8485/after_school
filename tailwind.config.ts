import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          dark: "#a54e32",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "#ffb476",
        },
        cream: "#fdfbf7",
      },
      fontFamily: {
        display: ["Lexend", "Noto Sans KR", "sans-serif"],
        sans: ["Noto Sans KR", "Inter", "sans-serif"],
      },
      borderRadius: {
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/images/hero.png')",
      },
    },
  },
  plugins: [forms],
};
export default config;
