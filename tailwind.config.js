module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        tokyo: {
          term: {
            red: '#f7768e',
            yellow: '#e0af68',
            green: '#73daca',
            cyan: '#7dcfff',
            blue: '#7aa2f7',
            magenta: '#bb9af7',
            white: '#c0caf5',
            black: '#414868',
          },
          night_BLK: '#1a1b26',
          storm_BLK: '#24283b',
          comment_PURP: '#565f89',
          parameter_WHT: '#cfc9c2',
          markdown_PURP: '#9aa5ce',
          foreground_PURP: '#a9b1d6',
          css_BLU: '#2ac3de',
          regex_BLU: '#b4f9f8',
          strings_GRN: '#9ece6a',
          number_ORNG: '#ff9e64',
        },
      },
    },
  },
  plugins: [],
};
