import { describe, expect, it } from 'vitest';
import { toCssVars } from './to-css-vars';
import { defaultThemePreset } from '../../presets/default.preset';

describe('toCssVars', () => {
  it('creates primitive and semantic variables with default prefix', () => {
    const cssVars = toCssVars(defaultThemePreset);

    expect(cssVars['--tng-color-primary500']).toBe('#2563eb');
    expect(cssVars['--tng-semantic-accent-brand']).toBe('{color.primary500}');
  });

  it('supports custom prefix and selective scale inclusion', () => {
    const cssVars = toCssVars(defaultThemePreset, {
      prefix: 'tailng',
      includePrimitives: false,
      includeSemantic: true,
    });

    expect(cssVars['--tailng-semantic-accent-brand']).toBe('{color.primary500}');
    expect(cssVars['--tailng-color-primary500']).toBeUndefined();
  });
});
