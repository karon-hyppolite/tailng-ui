import { type CssVarAdapterOptions, toCssVars } from './to-css-vars';
import type { ThemeDefinition } from '../../contracts/theme.types';

type CssVarWriter = Readonly<{
  setProperty: CSSStyleDeclaration['setProperty'];
  removeProperty: CSSStyleDeclaration['removeProperty'];
}>;

type CssVarTarget = Readonly<{
  style: CssVarWriter;
}>;

export function injectThemeVars(
  target: CssVarTarget,
  theme: ThemeDefinition,
  options?: Readonly<CssVarAdapterOptions>,
): () => void {
  const cssVars = toCssVars(theme, options);
  const names = Object.keys(cssVars);

  for (const name of names) {
    target.style.setProperty(name, cssVars[name]);
  }

  return (): void => {
    for (const name of names) {
      target.style.removeProperty(name);
    }
  };
}
