import { describe, expect, it } from 'vitest';
import { flattenTokens } from './flatten-tokens';
import { resolveToken } from './resolve-token';
import { defaultThemePreset } from '../presets/default.preset';

describe('flattenTokens', () => {
  it('flattens all scales into full token paths', () => {
    const flat = flattenTokens(defaultThemePreset);

    expect(flat['primitives.color.white']).toBe('#ffffff');
    expect(flat['semantic.accent.brand']).toBe('{color.primary500}');
  });

  it('produces paths that resolveToken understands', () => {
    for (const [tokenPath, value] of Object.entries(flattenTokens(defaultThemePreset))) {
      expect(resolveToken(defaultThemePreset, tokenPath)).toBe(value);
    }
  });
});
