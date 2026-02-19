import type { ThemeDefinition } from '../../contracts/theme.types';

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
}

function pickScaleValues(
  scale: Record<string, string>,
  prefix: string,
): Record<string, string> {
  const picked: Record<string, string> = {};

  for (const [token, value] of Object.entries(scale)) {
    if (token.startsWith(prefix)) {
      picked[token.slice(prefix.length)] = value;
    }
  }

  return picked;
}

export function toTailwindPreset(theme: ThemeDefinition): TailwindThemePreset {
  return {
    theme: {
      extend: {
        colors: {
          ...theme.tokens.primitives.color,
          ...theme.tokens.semantic.accent,
        },
        spacing: theme.tokens.primitives.spacing,
        borderRadius: theme.tokens.primitives.radius,
        fontSize: pickScaleValues(theme.tokens.primitives.typography, 'text'),
        transitionDuration: pickScaleValues(
          theme.tokens.primitives.motion,
          'duration',
        ),
      },
    },
  };
}
