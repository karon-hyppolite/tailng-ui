import { describe, expect, it } from 'vitest';
import { resolveComponentCssVars } from './resolve-component-css-vars';
import { buttonStyleContract } from '../component-contracts/button.contract';
import { defaultThemePreset } from '../presets/default.preset';

describe('resolveComponentCssVars', () => {
  it('resolves contract css variables to concrete values', () => {
    const vars = resolveComponentCssVars(buttonStyleContract, defaultThemePreset);

    expect(vars['--tng-button-bg']).toBe('#2563eb');
    expect(vars['--tng-button-radius']).toBe('0.375rem');
  });

  it('returns an empty map when the contract has no css variables', () => {
    expect(resolveComponentCssVars({ slots: {}, states: {} }, defaultThemePreset)).toEqual({});
  });
});
