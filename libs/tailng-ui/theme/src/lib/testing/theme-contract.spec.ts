import { describe, expect, it } from 'vitest';
import {
  isThemeContractValid,
  listMissingRequiredThemeScales,
  listUnresolvedTokenReferences,
} from './theme-contract.spec-helpers';
import type { ThemeDefinition } from '../contracts/theme.types';
import { createTheme } from '../engine/create-theme';
import { defaultThemePreset } from '../presets/default.preset';

const allRequiredScales = [
  'primitives.color',
  'primitives.spacing',
  'primitives.radius',
  'primitives.typography',
  'primitives.motion',
  'semantic.background',
  'semantic.foreground',
  'semantic.border',
  'semantic.accent',
  'semantic.focus',
];

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
    expect(listMissingRequiredThemeScales(invalidTheme)).toEqual(allRequiredScales);
  });
});

describe('listUnresolvedTokenReferences', () => {
  it('returns no paths for the default preset', () => {
    expect(listUnresolvedTokenReferences(defaultThemePreset)).toEqual([]);
  });

  it('reports tokens that reference unknown tokens', () => {
    const brokenTheme = createTheme(defaultThemePreset, {
      tokens: { semantic: { accent: { brand: '{color.missing}' } } },
    });

    expect(listUnresolvedTokenReferences(brokenTheme)).toEqual(['semantic.accent.brand']);
  });
});
