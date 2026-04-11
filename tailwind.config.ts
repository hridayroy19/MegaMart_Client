import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx,css}", "./src/styles/utilities.css"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        grade: {
          A: "#10b981",
          B: "#3b82f6",
          C: "#f59e0b",
          D: "#f97316",
          F: "#ef4444",
        },
        status: {
          present: "#10b981",
          absent: "#ef4444",
          late: "#f59e0b",
          halfday: "#3b82f6",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        heading: ["var(--font-heading)"], 
        body: ["var(--font-body)"],
      },
      boxShadow: {
        school:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      spacing: {
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
      },
      zIndex: {
        dropdown: "1000",
        modal: "2000",
        tooltip: "3000",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;