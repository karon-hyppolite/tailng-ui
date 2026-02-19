import type { ThemeDefinition } from '../contracts/theme.types';
import { createThemeTokens } from '../tokens';

export const minimalThemePreset: ThemeDefinition = {
  meta: {
    name: 'tailng-minimal',
    mode: 'light',
  },
  tokens: createThemeTokens({
    background: {
      canvas: '{color.white}',
      surface: '{color.white}',
    },
    foreground: {
      primary: '{color.black}',
      secondary: '{color.neutral500}',
      inverse: '{color.white}',
    },
    border: {
      subtle: '{color.neutral100}',
      strong: '{color.neutral500}',
    },
    accent: {
      brand: '{color.black}',
      brandHover: '{color.neutral900}',
      danger: '{color.danger500}',
      success: '{color.success500}',
    },
    focus: {
      ring: '{color.black}',
    },
  }),
};
