import { describe, expect, it } from 'vitest';
import {
  coerceTngButtonAriaHasPopup,
  coerceTngButtonNullableBoolean,
} from './tng-button';

describe('tng-button primitive coercion', () => {
  it('coerces nullable boolean input consistently', () => {
    expect(coerceTngButtonNullableBoolean(undefined)).toBeNull();
    expect(coerceTngButtonNullableBoolean('')).toBe(true);
    expect(coerceTngButtonNullableBoolean('true')).toBe(true);
    expect(coerceTngButtonNullableBoolean('false')).toBe(false);
    expect(coerceTngButtonNullableBoolean('invalid')).toBeNull();
  });

  it('coerces aria-haspopup values with normalization', () => {
    expect(coerceTngButtonAriaHasPopup(undefined)).toBeNull();
    expect(coerceTngButtonAriaHasPopup(true)).toBe('true');
    expect(coerceTngButtonAriaHasPopup(false)).toBe('false');
    expect(coerceTngButtonAriaHasPopup(' Menu ')).toBe('menu');
    expect(coerceTngButtonAriaHasPopup('something-else')).toBeNull();
  });
});
