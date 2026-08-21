export type RgbColor = Readonly<{
  r: number;
  g: number;
  b: number;
}>;

const hexColorPattern = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

function expandShortHex(hex: string): string {
  if (hex.length !== 3) {
    return hex;
  }

  return hex
    .split('')
    .map((digit) => digit + digit)
    .join('');
}

export function parseHexColor(value: string): RgbColor | null {
  const match = hexColorPattern.exec(value.trim());
  if (!match) {
    return null;
  }

  const hex = expandShortHex(match[1]);
  return {
    r: parseInt(hex.slice(0, 2), 16),
    g: parseInt(hex.slice(2, 4), 16),
    b: parseInt(hex.slice(4, 6), 16),
  };
}
