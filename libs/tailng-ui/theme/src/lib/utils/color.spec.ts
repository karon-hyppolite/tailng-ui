import { describe, expect, it } from 'vitest';
import {
  getContrastRatio,
  getRelativeLuminance,
  meetsContrastAA,
  parseHexColor,
} from './color';

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

describe('getRelativeLuminance', () => {
  it('returns 1 for white and 0 for black', () => {
    expect(getRelativeLuminance({ r: 255, g: 255, b: 255 })).toBeCloseTo(1);
    expect(getRelativeLuminance({ r: 0, g: 0, b: 0 })).toBeCloseTo(0);
  });
});

describe('getContrastRatio', () => {
  it('returns 21 for black on white', () => {
    expect(getContrastRatio('#000000', '#ffffff')).toBeCloseTo(21);
  });

  it('returns null when a color cannot be parsed', () => {
    expect(getContrastRatio('nope', '#ffffff')).toBeNull();
  });
});

describe('meetsContrastAA', () => {
  it('uses 4.5:1 for normal text', () => {
    expect(meetsContrastAA('#767676', '#ffffff')).toBe(true);
    expect(meetsContrastAA('#777777', '#ffffff')).toBe(false);
  });

  it('uses 3:1 for large text', () => {
    expect(meetsContrastAA('#949494', '#ffffff', 'large')).toBe(true);
    expect(meetsContrastAA('#949494', '#ffffff')).toBe(false);
  });
});
