import type { ThemeDefinition } from '../contracts/theme.types';
import type { TokenScale } from '../contracts/token.types';

function hasEntries(scale: TokenScale): boolean {
  return Object.keys(scale).length > 0;
}

export function listMissingRequiredThemeScales(
  theme: ThemeDefinition,
): string[] {
  const missing: string[] = [];

  if (!hasEntries(theme.tokens.primitives.color)) {
    missing.push('primitives.color');
  }

  if (!hasEntries(theme.tokens.primitives.spacing)) {
    missing.push('primitives.spacing');
  }

  if (!hasEntries(theme.tokens.primitives.radius)) {
    missing.push('primitives.radius');
  }

  if (!hasEntries(theme.tokens.semantic.background)) {
    missing.push('semantic.background');
  }

  if (!hasEntries(theme.tokens.semantic.foreground)) {
    missing.push('semantic.foreground');
  }

  return missing;
}

export function isThemeContractValid(theme: ThemeDefinition): boolean {
  return listMissingRequiredThemeScales(theme).length === 0;
}
