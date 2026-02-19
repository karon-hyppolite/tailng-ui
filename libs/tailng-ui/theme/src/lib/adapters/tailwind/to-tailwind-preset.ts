import type { ThemeDefinition } from '../../contracts/theme.types';
import type { TokenScale } from '../../contracts/token.types';
import { resolveTokenValue } from '../../engine/resolve-token-value';

export type TailwindThemePreset = {
  theme: {
    extend: {
      colors: Record<string, string>;
      spacing: Record<string, string>;
      borderRadius: Record<string, string>;
      fontSize: Record<string, string>;
      transitionDuration: Record<string, string>;
    };
  };
};

function resolveScaleValues(
  theme: ThemeDefinition,
  scale: TokenScale,
): Record<string, string> {
  const resolved: Record<string, string> = {};

  for (const [token, value] of Object.entries(scale)) {
    resolved[token] = resolveTokenValue(theme, value);
  }

  return resolved;
}

function pickScaleValues(
  scale: TokenScale,
  prefix: string,
): Record<string, string> {
  const picked: Record<string, string> = {};

  for (const [token, value] of Object.entries(scale)) {
    if (token.startsWith(prefix)) {
      const suffix = token.slice(prefix.length);
      const normalizedKey = suffix[0].toLowerCase() + suffix.slice(1);
      picked[normalizedKey] = value;
    }
  }

  return picked;
}

export function toTailwindPreset(theme: ThemeDefinition): TailwindThemePreset {
  const resolvedPrimitiveColors = resolveScaleValues(theme, theme.tokens.primitives.color);
  const resolvedAccentColors = resolveScaleValues(theme, theme.tokens.semantic.accent);
  const resolvedSpacing = resolveScaleValues(theme, theme.tokens.primitives.spacing);
  const resolvedRadius = resolveScaleValues(theme, theme.tokens.primitives.radius);
  const resolvedTypography = resolveScaleValues(theme, theme.tokens.primitives.typography);
  const resolvedMotion = resolveScaleValues(theme, theme.tokens.primitives.motion);

  return {
    theme: {
      extend: {
        colors: {
          ...resolvedPrimitiveColors,
          ...resolvedAccentColors,
        },
        spacing: resolvedSpacing,
        borderRadius: resolvedRadius,
        fontSize: pickScaleValues(resolvedTypography, 'text'),
        transitionDuration: pickScaleValues(resolvedMotion, 'duration'),
      },
    },
  };
}
