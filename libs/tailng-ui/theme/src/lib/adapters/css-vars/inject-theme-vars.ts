import { type CssVarAdapterOptions, toCssVars } from './to-css-vars';
import type { ThemeDefinition } from '../../contracts/theme.types';

type CssVarWriter = Readonly<{
  setProperty: CSSStyleDeclaration['setProperty'];
}>;

type CssVarTarget = Readonly<{
  style: CssVarWriter;
}>;

export function injectThemeVars(
  target: CssVarTarget,
  theme: ThemeDefinition,
  options?: Readonly<CssVarAdapterOptions>,
): void {
  const cssVars = toCssVars(theme, options);

  for (const [name, value] of Object.entries(cssVars)) {
    target.style.setProperty(name, value);
  }
}
