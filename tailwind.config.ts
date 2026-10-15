import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: "var(--maroon)",
          deep: "var(--maroon-deep)",
          light: "#6D2539",
        },
        wine: {
          DEFAULT: "var(--wine, #4B1330)",
          deep: "var(--wine-deep, #38091F)",
        },
        paper: {
          DEFAULT: "var(--paper, #FAF7F2)",
          warm: "var(--paper-warm, #F8F6F2)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          light: "#E5C557",
          dark: "#B89218",
        },
        grey: {
          DEFAULT: "var(--grey)",
          light: "#858585",
          dark: "#3B3B3B",
        },
        ivory: {
          DEFAULT: "var(--ivory)",
          pure: "#FFFFFF",
          muted: "#F3EDE4",
        },
        ink: "#1A1712",
        "stone-gray": "#6E6E6E",
      },
      fontFamily: {
        forum: ["var(--font-forum)", "serif"],
        marcellus: ["var(--font-marcellus)", "serif"],
        castoro: ["var(--font-castoro)", "serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        raleway: ["var(--font-castoro)", "sans-serif"],
        garamond: ["var(--font-marcellus)", "serif"],
        bebas: ["var(--font-castoro)", "sans-serif"],
        jost: ["var(--font-jost)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "2px",
      },
      letterSpacing: {
        widest: "0.2em",
        luxury: "0.3em",
      },
      animation: {
        "pulse-slow": "pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-gentle": "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
