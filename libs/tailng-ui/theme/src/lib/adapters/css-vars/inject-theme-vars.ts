import type { ThemeDefinition } from '../../contracts/theme.types';
import { type CssVarAdapterOptions, toCssVars } from './to-css-vars';

export function injectThemeVars(
  target: HTMLElement,
  theme: ThemeDefinition,
  options?: CssVarAdapterOptions,
): void {
  const cssVars = toCssVars(theme, options);

  for (const [name, value] of Object.entries(cssVars)) {
    target.style.setProperty(name, value);
  }
}
