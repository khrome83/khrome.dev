module.exports = {
  theme: {
    extend: {
      colors: {
        "regal-blue": "#243c5a",
        "regal-blue-accent": "#284569",
        "undraw-orange": "#e49c56"
      },
      spacing: {
        "80": "20rem",
        "82": "22rem",
        "108": "27rem"
      },
      minHeight: {
        "20": "20rem"
      },
      maxHeight: {
        none: "0",
        "25": "25rem"
      },
      inset: {
        "1/2": "25%"
      },
      listStyleType: {
        "l-roman": "lower-roman",
        "l-alpha": "lower-alpha"
      }
    },
    container: {
      padding: "1rem"
    },
    fontFamily: {
      display: ["Comfortaa", "cursive"],
      sans: [
        "Lato",
        "Roboto",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Helvetica Neue"',
        "Arial",
        '"Noto Sans"',
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
        "sans-serif"
      ],
      serif: ["Georgia", "Cambria", '"Times New Roman"', "Times", "serif"],
      mono: [
        "Menlo",
        "Monaco",
        "Consolas",
        '"Liberation Mono"',
        '"Courier New"',
        "monospace"
      ]
    }
  },
  variants: {},
  plugins: [require("tailwindcss-transitions")()]
};
