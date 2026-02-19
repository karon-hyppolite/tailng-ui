import { describe, expect, it } from 'vitest';
import { createTheme } from './create-theme';
import { resolveTokenValue } from './resolve-token-value';
import { defaultThemePreset } from '../presets/default.preset';

describe('resolveTokenValue', () => {
  it('resolves token references recursively to a concrete value', () => {
    expect(resolveTokenValue(defaultThemePreset, '{semantic.accent.brand}')).toBe(
      '#2563eb',
    );
  });

  it('returns plain values unchanged', () => {
    expect(resolveTokenValue(defaultThemePreset, '#ffffff')).toBe('#ffffff');
  });

  it('returns the original value when the token path is unknown', () => {
    expect(resolveTokenValue(defaultThemePreset, '{semantic.accent.unknown}')).toBe(
      '{semantic.accent.unknown}',
    );
  });

  it('stops on circular references', () => {
    const circularTheme = createTheme(defaultThemePreset, {
      tokens: {
        semantic: {
          accent: {
            brand: '{semantic.accent.brand}',
          },
        },
      },
    });

    expect(resolveTokenValue(circularTheme, '{semantic.accent.brand}')).toBe(
      '{semantic.accent.brand}',
    );
  });
});
