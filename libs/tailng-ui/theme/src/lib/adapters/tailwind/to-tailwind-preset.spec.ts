import { describe, expect, it } from 'vitest';
import { toTailwindPreset } from './to-tailwind-preset';
import { defaultThemePreset } from '../../presets/default.preset';

describe('toTailwindPreset', () => {
  it('resolves accent colors from semantic references', () => {
    const preset = toTailwindPreset(defaultThemePreset);

    expect(preset.theme.extend.colors['brand']).toBe('#2563eb');
    expect(preset.theme.extend.colors['brandHover']).toBe('#1d4ed8');
  });

  it('maps prefixed typography and motion scales', () => {
    const preset = toTailwindPreset(defaultThemePreset);

    expect(preset.theme.extend.fontSize['md']).toBe('1rem');
    expect(preset.theme.extend.transitionDuration['fast']).toBe('120ms');
  });
});
