import { describe, expect, it } from 'vitest';
import { toCssVars } from './to-css-vars';
import { defaultThemePreset } from '../../presets/default.preset';

describe('toCssVars prefix', () => {
  it('normalizes dashes around a custom prefix', () => {
    const vars = toCssVars(defaultThemePreset, { prefix: '--app-' });

    expect(vars['--app-color-white']).toBe('#ffffff');
  });
});

describe('toCssVars empty prefix', () => {
  it('omits the prefix segment when the prefix is empty', () => {
    const vars = toCssVars(defaultThemePreset, { prefix: '' });

    expect(vars['--color-white']).toBe('#ffffff');
    expect(vars['---color-white']).toBeUndefined();
  });
});

describe('toCssVars case style', () => {
  it('converts camelCase token names to kebab-case', () => {
    const preserved = toCssVars(defaultThemePreset);
    const kebab = toCssVars(defaultThemePreset, { caseStyle: 'kebab' });

    expect(kebab['--tng-semantic-accent-brand-hover']).toBe(
      preserved['--tng-semantic-accent-brandHover'],
    );
    expect(kebab['--tng-semantic-accent-brandHover']).toBeUndefined();
  });
});
