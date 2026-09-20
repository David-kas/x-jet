/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx,vue,svelte}"],
  theme: {
    extend: {
      colors: {
        jet: {
          bg: "#0d0820",
          surface: "#151033",
          card: "#1d1546",
          border: "#382766",
          neon: "#9c4dff",
          cyan: "#8b7cff",
          accent: "#cf55ff",
          gold: "#f4a640",
          glow: "#6d5dfc",
        },
      },
      fontFamily: {
        display: ["'Clash Display', 'Segoe UI', system-ui, sans-serif"],
        body: ["'Inter', system-ui, sans-serif"],
      },
      boxShadow: {
        neon: "0 0 28px rgba(156, 77, 255, 0.42)",
        cyan: "0 0 22px rgba(139, 124, 255, 0.30)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #0d0820), linear-gradient(90deg, rgba(139,124,255,0.07) 1px, transparent 1px), linear-gradient(rgba(139,124,255,0.07) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
