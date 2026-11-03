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

describe('resolveTokenValue maxDepth handling', () => {
  it('falls back to the default depth for invalid values', () => {
    expect(
      resolveTokenValue(defaultThemePreset, '{semantic.accent.brand}', { maxDepth: Number.NaN }),
    ).toBe('#2563eb');
    expect(
      resolveTokenValue(defaultThemePreset, '{semantic.accent.brand}', { maxDepth: -1 }),
    ).toBe('#2563eb');
  });

  it('respects a small explicit depth', () => {
    expect(
      resolveTokenValue(defaultThemePreset, '{semantic.accent.brand}', { maxDepth: 1 }),
    ).toBe('{color.primary500}');
  });
});

describe('resolveTokenValue embedded references', () => {
  it('resolves references embedded in a larger value', () => {
    expect(resolveTokenValue(defaultThemePreset, '0 0 0 3px {semantic.focus.ring}')).toBe(
      '0 0 0 3px #2563eb',
    );
  });

  it('resolves multiple references and keeps unknown ones', () => {
    expect(resolveTokenValue(defaultThemePreset, '{spacing.none} {color.unknown}')).toBe(
      '0 {color.unknown}',
    );
  });
});
