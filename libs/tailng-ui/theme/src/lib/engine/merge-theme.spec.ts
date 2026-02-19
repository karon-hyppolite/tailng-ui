import { describe, expect, it } from 'vitest';
import type { ThemeDefinition } from '../contracts/theme.types';
import { defaultThemePreset } from '../presets/default.preset';
import { mergeTheme } from './merge-theme';

function cloneTheme(theme: ThemeDefinition): ThemeDefinition {
  return JSON.parse(JSON.stringify(theme)) as ThemeDefinition;
}

describe('mergeTheme', () => {
  it('merges nested scales without losing untouched tokens', () => {
    const merged = mergeTheme(defaultThemePreset, {
      tokens: {
        primitives: {
          spacing: {
            md: '0.875rem',
          },
        },
        semantic: {
          accent: {
            brand: '#0044ff',
          },
        },
      },
    });

    expect(merged.tokens.primitives.spacing['md']).toBe('0.875rem');
    expect(merged.tokens.primitives.spacing['lg']).toBe(
      defaultThemePreset.tokens.primitives.spacing['lg'],
    );
    expect(merged.tokens.semantic.accent['brand']).toBe('#0044ff');
    expect(merged.tokens.semantic.accent['brandHover']).toBe(
      defaultThemePreset.tokens.semantic.accent['brandHover'],
    );
  });

  it('does not mutate the base theme object', () => {
    const snapshot = cloneTheme(defaultThemePreset);

    void mergeTheme(defaultThemePreset, {
      tokens: {
        semantic: {
          foreground: {
            primary: '#111111',
          },
        },
      },
    });

    expect(defaultThemePreset).toStrictEqual(snapshot);
  });
});
