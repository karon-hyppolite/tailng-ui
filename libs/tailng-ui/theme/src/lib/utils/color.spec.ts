import { describe, expect, it } from 'vitest';
import { parseHexColor } from './color';

describe('parseHexColor', () => {
  it('parses short and long hex colors', () => {
    expect(parseHexColor('#fff')).toEqual({ r: 255, g: 255, b: 255 });
    expect(parseHexColor('2563eb')).toEqual({ r: 37, g: 99, b: 235 });
  });

  it('returns null for unsupported values', () => {
    expect(parseHexColor('red')).toBeNull();
    expect(parseHexColor('#12345')).toBeNull();
  });
});
