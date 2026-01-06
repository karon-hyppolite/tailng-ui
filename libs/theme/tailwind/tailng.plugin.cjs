module.exports = function tailngPlugin() {
  return function ({ addUtilities }) {
    addUtilities({
      '.tng-focus-ring': { outline: '2px solid transparent', outlineOffset: '2px' },
    });
  };
};
