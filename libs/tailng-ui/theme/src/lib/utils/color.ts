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

function toLinearChannel(channel: number): number {
  const srgb = channel / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

export function getRelativeLuminance(color: RgbColor): number {
  return (
    0.2126 * toLinearChannel(color.r) +
    0.7152 * toLinearChannel(color.g) +
    0.0722 * toLinearChannel(color.b)
  );
}

export function getContrastRatio(foreground: string, background: string): number | null {
  const foregroundColor = parseHexColor(foreground);
  const backgroundColor = parseHexColor(background);
  if (!foregroundColor || !backgroundColor) {
    return null;
  }

  const foregroundLuminance = getRelativeLuminance(foregroundColor);
  const backgroundLuminance = getRelativeLuminance(backgroundColor);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighter + 0.05) / (darker + 0.05);
}

export type TextSize = 'large' | 'normal';

export function meetsContrastAA(
  foreground: string,
  background: string,
  textSize: TextSize = 'normal',
): boolean {
  const ratio = getContrastRatio(foreground, background);
  if (ratio === null) {
    return false;
  }

  return ratio >= (textSize === 'large' ? 3 : 4.5);
}
