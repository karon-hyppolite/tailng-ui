const tailngPreset = require('./libs/theme/tailwind/tailng.preset.cjs');
const tailngPlugin = require('./libs/theme/tailwind/tailng.plugin.cjs');

module.exports = {
  presets: [tailngPreset],
  content: [
    './apps/**/*.{html,ts}',
    './libs/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        'alternate-background': 'var(--alternate-background-color)',
        text: 'var(--text-color)',
        primary: 'var(--primary-color)',
        'primary-hover': 'var(--primary-color-hover)',
        'on-primary': 'var(--on-primary-color)',
        danger: 'var(--danger-color)',
        'danger-hover': 'var(--danger-color-hover)',
        'on-danger': 'var(--on-danger-color)',
        warning: 'var(--warning-color)',
        'warning-hover': 'var(--warning-color-hover)',
        'on-warning': 'var(--on-warning-color)',
        success: 'var(--success-color)',
        'success-hover': 'var(--success-color-hover)',
        'on-success': 'var(--on-success-color)',
        info: 'var(--info-color)',
        'info-hover': 'var(--info-color-hover)',
        'on-info': 'var(--on-info-color)',
        border: 'var(--border-color)',
        'border-hover': 'var(--border-color-hover)',
        disable: 'var(--disable-color)',
      },
    },
  },
  
  plugins: [tailngPlugin()],
};
