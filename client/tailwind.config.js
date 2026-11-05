/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#FFFFFF",
        surface: {
          1: "#FFFFFF",
          2: "#F8FAFC",
          3: "#F1F5F9",
        },
        border: {
          subtle: "#E2E8F0",
          strong: "#CBD5E1",
          gold: "rgba(14, 165, 233, 0.4)",
        },
        gold: {
          DEFAULT: "#0284C7",
          hover: "#0369A1",
          light: "#E0F2FE",
          dark: "#075985",
        },
        accent: {
          blue: "#0284C7",
          cyan: "#0EA5E9",
          indigo: "#4F46E5",
        },
        status: {
          success: "#16A34A",
          warning: "#D97706",
          danger: "#DC2626",
          info: "#0284C7",
        },
        asset: {
          bonds: "#0284C7",
          moneyMarket: "#16A34A",
          unlisted: "#7C3AED",
          cash: "#D97706",
        },
        text: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        heading: ["'Plus Jakarta Sans'", "sans-serif"],
        sans: ["'Inter'", "sans-serif"],
      },
      borderRadius: {
        button: "10px",
        card: "14px",
        panel: "20px",
        pill: "9999px",
      },
      boxShadow: {
        'card-glow': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(14, 165, 233, 0.15)',
        'gold-glow': '0 4px 14px rgba(2, 132, 199, 0.35)',
        'blue-glow': '0 4px 18px rgba(14, 165, 233, 0.3)',
        'inner-light': 'inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      },
      backgroundImage: {
        'page-gradient': 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
        'gold-linear': 'linear-gradient(135deg, #0284C7 0%, #2563EB 100%)',
        'gold-text': 'linear-gradient(135deg, #0284C7 0%, #0EA5E9 50%, #2563EB 100%)',
        'blue-linear': 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
        'danger-banner': 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
      },
    },
  },
  plugins: [],
}
