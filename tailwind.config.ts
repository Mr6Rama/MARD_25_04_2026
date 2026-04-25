import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./data/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 0 1px rgba(168, 85, 247, 0.25), 0 20px 60px rgba(8, 15, 35, 0.45)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top, rgba(99,102,241,0.25), transparent 35%), linear-gradient(180deg, rgba(8,12,24,1), rgba(3,7,18,1))",
      },
    },
  },
  plugins: [],
};

export default config;
