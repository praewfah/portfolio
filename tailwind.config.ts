import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { base: "#0B1120" },
      fontFamily: { mono: ["ui-monospace","SFMono-Regular","Menlo","Monaco","Consolas","Liberation Mono","Courier New","monospace"] },
      keyframes: {
        aurora: { "0%":{backgroundPosition:"0% 50%"}, "50%":{backgroundPosition:"100% 50%"}, "100%":{backgroundPosition:"0% 50%"} },
        drift: { "0%":{transform:"translateY(0px)"}, "50%":{transform:"translateY(10px)"}, "100%":{transform:"translateY(0px)"} },
        shine: { "0%":{transform:"translateX(-100%)"}, "100%":{transform:"translateX(200%)"} },
        hue: { "0%":{filter:"hue-rotate(0deg)"}, "100%":{filter:"hue-rotate(360deg)"} }
      },
      animation: { aurora: "aurora 12s ease-in-out infinite", drift: "drift 6s ease-in-out infinite", shine:"shine 1.2s linear infinite", hue:"hue 8s linear infinite" }
    },
  }, plugins: [],
}; export default config;
