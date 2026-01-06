const tailngPreset = require('./libs/theme/tailwind/tailng.preset.cjs');
const tailngPlugin = require('./libs/theme/tailwind/tailng.plugin.cjs');

module.exports = {
  presets: [tailngPreset],
  content: [
    './apps/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],
  theme: { extend: {} },
  plugins: [tailngPlugin()],
};
