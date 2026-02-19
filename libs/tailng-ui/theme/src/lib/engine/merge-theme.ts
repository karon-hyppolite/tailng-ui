import type { ThemeDefinition, ThemeOverride } from '../contracts/theme.types';
import type {
  ThemePrimitives,
  ThemeSemanticTokens,
  TokenScale,
} from '../contracts/token.types';

function mergeScale(base: TokenScale, override?: TokenScale): TokenScale {
  return {
    ...base,
    ...(override ?? {}),
  };
}

function mergePrimitives(
  base: ThemePrimitives,
  override?: Partial<ThemePrimitives>,
): ThemePrimitives {
  return {
    color: mergeScale(base.color, override?.color),
    spacing: mergeScale(base.spacing, override?.spacing),
    radius: mergeScale(base.radius, override?.radius),
    typography: mergeScale(base.typography, override?.typography),
    motion: mergeScale(base.motion, override?.motion),
  };
}

function mergeSemantic(
  base: ThemeSemanticTokens,
  override?: Partial<ThemeSemanticTokens>,
): ThemeSemanticTokens {
  return {
    background: mergeScale(base.background, override?.background),
    foreground: mergeScale(base.foreground, override?.foreground),
    border: mergeScale(base.border, override?.border),
    accent: mergeScale(base.accent, override?.accent),
    focus: mergeScale(base.focus, override?.focus),
  };
}

export function mergeTheme(
  base: ThemeDefinition,
  override: ThemeOverride,
): ThemeDefinition {
  return {
    meta: {
      ...base.meta,
      ...(override.meta ?? {}),
    },
    tokens: {
      primitives: mergePrimitives(base.tokens.primitives, override.tokens?.primitives),
      semantic: mergeSemantic(base.tokens.semantic, override.tokens?.semantic),
    },
  };
}
