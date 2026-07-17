import { describe, expect, it } from 'vitest';
import { toCssVars } from './to-css-vars';
import { defaultThemePreset } from '../../presets/default.preset';

describe('toCssVars prefix', () => {
  it('normalizes dashes around a custom prefix', () => {
    const vars = toCssVars(defaultThemePreset, { prefix: '--app-' });

    expect(vars['--app-color-white']).toBe('#ffffff');
  });
});
