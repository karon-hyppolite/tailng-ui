import type { ThemeDefinition } from '../contracts/theme.types';
import { createThemeTokens } from '../tokens';

export const defaultThemePreset: ThemeDefinition = {
  meta: {
    name: 'tailng-default',
    mode: 'light',
  },
  tokens: createThemeTokens(),
};
