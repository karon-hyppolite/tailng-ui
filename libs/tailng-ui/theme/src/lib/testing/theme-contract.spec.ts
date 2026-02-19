import { describe, expect, it } from 'vitest';
import {
  isThemeContractValid,
  listMissingRequiredThemeScales,
} from './theme-contract.spec-helpers';
import type { ThemeDefinition } from '../contracts/theme.types';
import { defaultThemePreset } from '../presets/default.preset';

describe('theme contract helpers', () => {
  it('marks default preset as valid', () => {
    expect(isThemeContractValid(defaultThemePreset)).toBe(true);
    expect(listMissingRequiredThemeScales(defaultThemePreset)).toEqual([]);
  });

  it('returns missing required scales for an invalid theme', () => {
    const invalidTheme: ThemeDefinition = {
      meta: {
        name: 'invalid-theme',
        mode: 'light',
      },
      tokens: {
        primitives: {
          color: {},
          spacing: {},
          radius: {},
          typography: {},
          motion: {},
        },
        semantic: {
          background: {},
          foreground: {},
          border: {},
          accent: {},
          focus: {},
        },
      },
    };

    expect(isThemeContractValid(invalidTheme)).toBe(false);
    expect(listMissingRequiredThemeScales(invalidTheme)).toEqual([
      'primitives.color',
      'primitives.spacing',
      'primitives.radius',
      'semantic.background',
      'semantic.foreground',
    ]);
  });
});
