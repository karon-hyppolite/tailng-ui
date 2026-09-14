import type { ThemeDefinition } from '../contracts/theme.types';
import { darkSemanticTokens } from '../tokens/semantic/dark';
import { lightSemanticTokens } from '../tokens/semantic/light';

export function withThemeMode(
  theme: ThemeDefinition,
  mode: 'dark' | 'light',
): ThemeDefinition {
  return {
    meta: { ...theme.meta, mode },
    tokens: {
      ...theme.tokens,
      semantic: mode === 'dark' ? darkSemanticTokens : lightSemanticTokens,
    },
  };
}
