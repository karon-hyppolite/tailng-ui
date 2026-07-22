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

describe('toCssVars exclude', () => {
  it('omits variables under excluded token paths', () => {
    const vars = toCssVars(defaultThemePreset, { exclude: ['color', 'semantic.accent'] });
    const names = Object.keys(vars);

    expect(names.some((name) => name.startsWith('--tng-color-'))).toBe(false);
    expect(names.some((name) => name.startsWith('--tng-semantic-accent-'))).toBe(false);
    expect(vars['--tng-spacing-md']).toBeDefined();
    expect(vars['--tng-semantic-focus-ring']).toBeDefined();
  });
});
