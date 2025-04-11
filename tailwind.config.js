/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      jlc: {
        main: "#E20414",
        sub: "#FFFFFF",
        third: "#454342",
      },
      green: {
        500: "#10b981",
        600: "#059669"
      },
      blue: "#1fb6ff",
      red: "#ff0000",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      yellow: "#ffc82c",
      black: "#000000",
      gray: {
        900: "#333333",
        800: "#666666",
        700: "#999999",
        600: "#CCCCCC",
        100: "#EEEEEE",
      },
      white: "#FFFFFF",
      red: "#ef4444"
    },
    extend: {
      animation: {
        "flip-out-hor-bottom": "flip-out-hor-bottom 0.45s cubic-bezier(0.550, 0.085, 0.680, 0.530) 1.5s  both",
        "puff-out-center": "puff-out-center 0.9s cubic-bezier(0.165, 0.840, 0.440, 1.000) 1s  both"
      },
      keyframes: {
        "flip-out-hor-bottom": {
          "0%": {
            transform: "rotateX(0)",
            opacity: "1"
          },
          to: {
            transform: "rotateX(-70deg)",
            opacity: "0"
          }
        },
        "puff-out-center": {
          "0%": {
            transform: "scale(1)",
            filter: "blur(0)",
            opacity: "1"
          },
          to: {
            transform: "scale(2)",
            filter: "blur(2px)",
            opacity: "0"
          }
        }
      }
    }
  },
  plugins: [],
}
