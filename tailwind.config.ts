import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lima: {
          green: "#8CC400",
          dark: "#004225",
          graphite: "#2B2F33",
          light: "#F4FAEA",
          black: "#07130D"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 45px rgba(17, 24, 39, 0.10)"
      }
    }
  },
  plugins: [forms]
};

export default config;
