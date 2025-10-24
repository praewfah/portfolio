import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { ink: "#1A1A1A", muted: "#6B7280", light: "#E5E7EB" },
      keyframes: { 
        fadeup: { 
          "0%": { opacity: "0", transform: "translateY(8px)" }, 
          "100%": { opacity: "1", transform: "translateY(0)" } 
        } 
      },
      animation: { fadeup: "fadeup .45s ease-out both" }
    },
  },
  plugins: [],
};
export default config;
