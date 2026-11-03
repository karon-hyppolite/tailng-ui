import { type CssVarAdapterOptions, toCssVars } from './to-css-vars';
import type { ThemeDefinition } from '../../contracts/theme.types';

type CssVarWriter = Readonly<{
  getPropertyValue?: CSSStyleDeclaration['getPropertyValue'];
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
  const written: string[] = [];

  for (const [name, value] of Object.entries(cssVars)) {
    if (target.style.getPropertyValue?.(name) !== value) {
      target.style.setProperty(name, value);
      written.push(name);
    }
  }

  return (): void => {
    for (const name of written) {
      target.style.removeProperty(name);
    }
  };
}
