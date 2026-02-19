import { describe, expect, it } from 'vitest';
import {
  coerceTngButtonAriaHasPopup,
  coerceTngButtonNullableBoolean,
  TngButton,
} from './tng-button.component';

describe('tng-button component', () => {
  it('exports the public TngButton symbol', () => {
    expect(typeof TngButton).toBe('function');
  });

  it('coerces nullable boolean inputs', () => {
    expect(coerceTngButtonNullableBoolean(undefined)).toBeNull();
    expect(coerceTngButtonNullableBoolean('')).toBe(true);
    expect(coerceTngButtonNullableBoolean('true')).toBe(true);
    expect(coerceTngButtonNullableBoolean('false')).toBe(false);
    expect(coerceTngButtonNullableBoolean('x')).toBeNull();
  });

  it('coerces aria-haspopup inputs', () => {
    expect(coerceTngButtonAriaHasPopup(undefined)).toBeNull();
    expect(coerceTngButtonAriaHasPopup(true)).toBe('true');
    expect(coerceTngButtonAriaHasPopup(false)).toBe('false');
    expect(coerceTngButtonAriaHasPopup(' listbox ')).toBe('listbox');
    expect(coerceTngButtonAriaHasPopup('noop')).toBeNull();
  });
});
