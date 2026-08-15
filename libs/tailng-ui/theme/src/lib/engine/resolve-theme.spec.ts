import { describe, expect, it } from 'vitest';
import { resolveTheme } from './resolve-theme';
import { defaultThemePreset } from '../presets/default.preset';

describe('resolveTheme', () => {
  it('replaces token references with concrete values', () => {
    const resolved = resolveTheme(defaultThemePreset);

    expect(resolved.tokens.semantic.accent['brand']).toBe('#2563eb');
    expect(resolved.meta).toBe(defaultThemePreset.meta);
  });

  it('is idempotent', () => {
    const resolved = resolveTheme(defaultThemePreset);

    expect(resolveTheme(resolved)).toStrictEqual(resolved);
  });
});
