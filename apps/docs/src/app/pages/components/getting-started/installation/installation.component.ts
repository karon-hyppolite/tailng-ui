import { Component } from '@angular/core';
import { TngTab, TngTabPanel, TngTabs, TngCard } from '@tociva/tailng-ui/layout';
import { TngCodeBlock } from '@tociva/tailng-ui/utilities';

@Component({
  standalone: true,
  selector: 'docs-installation',
  templateUrl: './installation.component.html',
  imports: [TngCard, TngTabs, TngTab, TngTabPanel, TngCodeBlock],
})
export class InstallationComponent {

  // Angular app creation
  readonly createApp = `npx -p @angular/cli@21 ng new tailng-starter --standalone --routing --style=css
cd tailng-starter`;

  // Angular packages
  readonly yarnCdk = `yarn add @angular/cdk`;
  readonly npmCdk = `npm i @angular/cdk`;

  // Tailng packages
  readonly yarnTailng = `yarn add @tociva/tailng-cdk @tociva/tailng-theme @tociva/tailng-icons @tociva/tailng-ui`;
  readonly npmTailng = `npm i @tociva/tailng-cdk @tociva/tailng-theme @tociva/tailng-icons @tociva/tailng-ui`;

  // Tailwind install
  readonly yarnTailwind = `yarn add -D tailwindcss@^3.4 postcss autoprefixer
npx tailwindcss init`;

  readonly npmTailwind = `npm i -D tailwindcss@^3.4 postcss autoprefixer
npx tailwindcss init`;

  // PostCSS config
  readonly postcssConfig = `// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;

  // Tailwind config
  readonly tailwindConfig = `// tailwind.config.js
const tailngPreset = require("@tociva/tailng-theme/tailwind/tailng.preset.cjs");

module.exports = {
  presets: [tailngPreset],
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@tociva/tailng-ui/**/*.{mjs,js}",
    "./node_modules/@tociva/tailng-icons/**/*.{mjs,js}",
  ],
};`;

  // Global styles
  readonly globalStyles = `/* src/styles.css */
@import "@tociva/tailng-theme/tokens/index.css";

@tailwind base;
@tailwind components;
@tailwind utilities;
`;

  // Run
  readonly yarnStart = `yarn start`;
  readonly npmStart = `npm run start`;

  // Theme example
  readonly themeExample = `<body class="mode-dark theme-emerald">`;
}
