import { describe, expect, it } from 'vitest';
import { toTailwindPreset } from './to-tailwind-preset';
import { createTheme } from '../../engine/create-theme';
import { defaultThemePreset } from '../../presets/default.preset';

describe('toTailwindPreset scale keys', () => {
  it('maps a token equal to the prefix to the DEFAULT key', () => {
    const theme = createTheme(defaultThemePreset, {
      tokens: { primitives: { typography: { text: '1rem' } } },
    });
    const { fontSize } = toTailwindPreset(theme).theme.extend;

    expect(fontSize['DEFAULT']).toBe('1rem');
    expect(fontSize['sm']).toBe('0.875rem');
  });
});
