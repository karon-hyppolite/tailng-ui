import type { ThemeSemanticTokens } from '../../contracts/token.types';

export const lightSemanticTokens: ThemeSemanticTokens = {
  background: {
    canvas: '{color.white}',
    surface: '{color.neutral50}',
  },
  foreground: {
    primary: '{color.neutral900}',
    secondary: '{color.neutral500}',
    inverse: '{color.white}',
  },
  border: {
    subtle: '{color.neutral100}',
    strong: '{color.neutral500}',
  },
  accent: {
    brand: '{color.primary500}',
    brandHover: '{color.primary600}',
    danger: '{color.danger500}',
    success: '{color.success500}',
  },
  focus: {
    ring: '{color.primary500}',
  },
};
