/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,ts,jsx,tsx,vue,svelte}"],
  theme: {
    extend: {
      colors: {
        jet: {
          bg: "#0a0612",
          surface: "#120c1f",
          card: "#1a1229",
          border: "#2d1f45",
          neon: "#a855f7",
          cyan: "#22d3ee",
          glow: "#6366f1",
        },
      },
      fontFamily: {
        display: ["'Clash Display', 'Segoe UI', system-ui, sans-serif"],
        body: ["'Inter', system-ui, sans-serif"],
      },
      boxShadow: {
        neon: "0 0 24px rgba(168, 85, 247, 0.35)",
        cyan: "0 0 20px rgba(34, 211, 238, 0.25)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #0a0612), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
