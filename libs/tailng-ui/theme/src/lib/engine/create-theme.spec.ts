import { describe, expect, it } from 'vitest';
import { defaultThemePreset } from '../presets/default.preset';
import { createTheme } from './create-theme';

describe('createTheme', () => {
  it('returns base theme when override is not provided', () => {
    const theme = createTheme(defaultThemePreset);

    expect(theme).toBe(defaultThemePreset);
  });

  it('applies override when provided', () => {
    const theme = createTheme(defaultThemePreset, {
      meta: {
        name: 'custom-theme',
      },
      tokens: {
        semantic: {
          accent: {
            brand: '#0055ff',
          },
        },
      },
    });

    expect(theme.meta.name).toBe('custom-theme');
    expect(theme.tokens.semantic.accent['brand']).toBe('#0055ff');
    expect(theme.tokens.primitives.spacing['md']).toBe(
      defaultThemePreset.tokens.primitives.spacing['md'],
    );
  });
});
