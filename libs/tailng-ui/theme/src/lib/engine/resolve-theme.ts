import { resolveTokenValue } from './resolve-token-value';
import type { ThemeDefinition } from '../contracts/theme.types';
import type { TokenScale } from '../contracts/token.types';

function resolveScale(theme: ThemeDefinition, scale: TokenScale): TokenScale {
  const resolved: Record<string, string> = {};

  for (const [key, value] of Object.entries(scale)) {
    resolved[key] = resolveTokenValue(theme, value);
  }

  return resolved;
}

export function resolveTheme(theme: ThemeDefinition): ThemeDefinition {
  const { primitives, semantic } = theme.tokens;

  return {
    meta: theme.meta,
    tokens: {
      primitives: {
        color: resolveScale(theme, primitives.color),
        spacing: resolveScale(theme, primitives.spacing),
        radius: resolveScale(theme, primitives.radius),
        typography: resolveScale(theme, primitives.typography),
        motion: resolveScale(theme, primitives.motion),
      },
      semantic: {
        background: resolveScale(theme, semantic.background),
        foreground: resolveScale(theme, semantic.foreground),
        border: resolveScale(theme, semantic.border),
        accent: resolveScale(theme, semantic.accent),
        focus: resolveScale(theme, semantic.focus),
      },
    },
  };
}
