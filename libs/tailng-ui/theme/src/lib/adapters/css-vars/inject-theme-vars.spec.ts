import { describe, expect, it } from 'vitest';
import { injectThemeVars } from './inject-theme-vars';
import { defaultThemePreset } from '../../presets/default.preset';

type FakeTarget = Readonly<{
  style: Readonly<{
    removeProperty: (name: string) => string;
    setProperty: (name: string, value: string | null) => void;
  }>;
  values: Map<string, string>;
}>;

function createFakeTarget(): FakeTarget {
  const values = new Map<string, string>();

  return {
    style: {
      removeProperty: (name: string): string => {
        const previous = values.get(name) ?? '';
        values.delete(name);
        return previous;
      },
      setProperty: (name: string, value: string | null): void => {
        values.set(name, value ?? '');
      },
    },
    values,
  };
}

describe('injectThemeVars', () => {
  it('writes css variables and returns a cleanup function', () => {
    const target = createFakeTarget();
    const cleanup = injectThemeVars(target, defaultThemePreset);

    expect(target.values.get('--tng-color-white')).toBe('#ffffff');

    cleanup();

    expect(target.values.size).toBe(0);
  });
});
