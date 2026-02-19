import { mergeTheme } from './merge-theme';
import type { ThemeDefinition, ThemeOverride } from '../contracts/theme.types';

export function createTheme(
  base: ThemeDefinition,
  override?: ThemeOverride,
): ThemeDefinition {
  if (!override) {
    return base;
  }

  return mergeTheme(base, override);
}
