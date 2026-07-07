import { describe, expect, it } from 'vitest';
import { resolveToken } from './resolve-token';
import { defaultThemePreset } from '../presets/default.preset';

describe('resolveToken', () => {
  it('resolves primitive tokens using short notation', () => {
    expect(resolveToken(defaultThemePreset, 'color.primary500')).toBe('#2563eb');
    expect(resolveToken(defaultThemePreset, 'radius.md')).toBe('0.375rem');
  });

  it('resolves semantic tokens using full semantic path', () => {
    expect(resolveToken(defaultThemePreset, 'semantic.accent.brand')).toBe(
      '{color.primary500}',
    );
    expect(resolveToken(defaultThemePreset, '{semantic.focus.ring}')).toBe(
      '{color.primary500}',
    );
  });

  it('returns undefined for unknown or malformed token paths', () => {
    expect(resolveToken(defaultThemePreset, 'unknown.collection.token')).toBe(
      undefined,
    );
    expect(resolveToken(defaultThemePreset, 'single-segment')).toBe(undefined);
  });
});

describe('resolveToken prototype safety', () => {
  it('ignores inherited object properties', () => {
    expect(resolveToken(defaultThemePreset, 'color.toString')).toBeUndefined();
    expect(resolveToken(defaultThemePreset, 'semantic.accent.constructor')).toBeUndefined();
    expect(resolveToken(defaultThemePreset, 'primitives.radius.hasOwnProperty')).toBeUndefined();
  });
});

describe('resolveToken path length', () => {
  it('rejects paths with more than three segments', () => {
    expect(resolveToken(defaultThemePreset, 'semantic.accent.brand.extra')).toBeUndefined();
  });
});
