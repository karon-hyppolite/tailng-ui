import { mergeTheme } from './merge-theme';
import type { ThemeDefinition, ThemeOverride } from '../contracts/theme.types';

export function createTheme(
  base: ThemeDefinition,
  ...overrides: readonly (ThemeOverride | undefined)[]
): ThemeDefinition {
  return overrides.reduce(
    (theme: ThemeDefinition, override: ThemeOverride | undefined): ThemeDefinition =>
      override ? mergeTheme(theme, override) : theme,
    base,
  );
}
