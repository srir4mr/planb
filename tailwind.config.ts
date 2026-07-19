import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#0A0908",
        surface: {
          DEFAULT: "#151517",
          elevated: "#1C1D20",
        },
        foreground: {
          DEFAULT: "#F1EEE6",
          muted: "#9C9A97",
        },
        border: {
          DEFAULT: "#2B2A28",
          hair: "rgba(241,238,230,0.08)",
        },
        accent: {
          DEFAULT: "#C96A2E",
          light: "#E08B4F",
          dark: "#A6551F",
        },
        gold: {
          DEFAULT: "#C6A15B",
          light: "#DFC383",
        },
        racing: {
          DEFAULT: "#9C1F27",
          light: "#C22A34",
          dark: "#701319",
        },
        success: "#1E8A5F",
        warning: "#C08A2E",
        danger: "#9C1F27",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.25em",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
