import type { ThemeSemanticTokens } from '../../contracts/token.types';

export const darkSemanticTokens: ThemeSemanticTokens = {
  background: {
    canvas: '{color.neutral900}',
    surface: '#1e293b',
  },
  foreground: {
    primary: '{color.white}',
    secondary: '#cbd5e1',
    inverse: '{color.neutral900}',
  },
  border: {
    subtle: '#334155',
    strong: '#94a3b8',
  },
  accent: {
    brand: '#60a5fa',
    brandHover: '#3b82f6',
    danger: '#f87171',
    success: '#4ade80',
  },
  focus: {
    ring: '#60a5fa',
  },
};
