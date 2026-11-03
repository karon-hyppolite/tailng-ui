import type { ThemeDefinition } from '../../contracts/theme.types';
import type { TokenScale } from '../../contracts/token.types';
import { resolveTokenValue } from '../../engine/resolve-token-value';

export type SemanticColorUtilities = {
  backgroundColor: Record<string, string>;
  borderColor: Record<string, string>;
  ringColor: Record<string, string>;
  textColor: Record<string, string>;
};

export type TailwindThemePreset = {
  theme: {
    extend: SemanticColorUtilities & {
      colors: Record<string, string>;
      spacing: Record<string, string>;
      borderRadius: Record<string, string>;
      fontFamily: Record<string, string>;
      fontSize: Record<string, string>;
      transitionDuration: Record<string, string>;
      transitionTimingFunction: Record<string, string>;
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

function toScaleKey(suffix: string): string {
  if (suffix.length === 0) {
    return 'DEFAULT';
  }

  return suffix[0].toLowerCase() + suffix.slice(1);
}

function pickScaleValues(
  scale: TokenScale,
  prefix: string,
): Record<string, string> {
  const picked: Record<string, string> = {};

  for (const [token, value] of Object.entries(scale)) {
    if (token.startsWith(prefix)) {
      picked[toScaleKey(token.slice(prefix.length))] = value;
    }
  }

  return picked;
}

function toSemanticColorUtilities(theme: ThemeDefinition): SemanticColorUtilities {
  return {
    backgroundColor: resolveScaleValues(theme, theme.tokens.semantic.background),
    borderColor: resolveScaleValues(theme, theme.tokens.semantic.border),
    ringColor: resolveScaleValues(theme, theme.tokens.semantic.focus),
    textColor: resolveScaleValues(theme, theme.tokens.semantic.foreground),
  };
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
        ...toSemanticColorUtilities(theme),
        colors: {
          ...resolvedPrimitiveColors,
          ...resolvedAccentColors,
        },
        spacing: resolvedSpacing,
        borderRadius: resolvedRadius,
        fontFamily: pickScaleValues(resolvedTypography, 'font'),
        fontSize: pickScaleValues(resolvedTypography, 'text'),
        transitionDuration: pickScaleValues(resolvedMotion, 'duration'),
        transitionTimingFunction: pickScaleValues(resolvedMotion, 'easing'),
      },
    },
  };
}
