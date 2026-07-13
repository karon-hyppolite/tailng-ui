import { mergeTheme } from './merge-theme';
import type { ThemeDefinition, ThemeOverride } from '../contracts/theme.types';

export function createTheme(
  base: ThemeDefinition,
  ...overrides: readonly ThemeOverride[]
): ThemeDefinition {
  return overrides.reduce(
    (theme: ThemeDefinition, override: ThemeOverride): ThemeDefinition =>
      mergeTheme(theme, override),
    base,
  );
}
