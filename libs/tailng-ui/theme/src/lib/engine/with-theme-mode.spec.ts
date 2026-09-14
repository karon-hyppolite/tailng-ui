import { describe, expect, it } from 'vitest';
import { withThemeMode } from './with-theme-mode';
import { defaultThemePreset } from '../presets/default.preset';
import { darkSemanticTokens } from '../tokens/semantic/dark';
import { lightSemanticTokens } from '../tokens/semantic/light';

describe('withThemeMode', () => {
  it('switches semantic tokens and mode', () => {
    const dark = withThemeMode(defaultThemePreset, 'dark');

    expect(dark.meta.mode).toBe('dark');
    expect(dark.tokens.semantic).toBe(darkSemanticTokens);
    expect(dark.tokens.primitives).toBe(defaultThemePreset.tokens.primitives);
  });

  it('switches back to light', () => {
    const light = withThemeMode(withThemeMode(defaultThemePreset, 'dark'), 'light');

    expect(light.tokens.semantic).toBe(lightSemanticTokens);
    expect(light.meta.mode).toBe('light');
  });
});
