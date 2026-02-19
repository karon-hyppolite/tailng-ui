import type { ThemeDefinition } from '../contracts/theme.types';

function normalizeTokenPath(tokenPath: string): string[] {
  return tokenPath
    .trim()
    .replace(/[{}]/g, '')
    .split('.')
    .filter(Boolean);
}

export function resolveToken(
  theme: ThemeDefinition,
  tokenPath: string,
): string | undefined {
  const parts = normalizeTokenPath(tokenPath);

  if (parts.length < 2) {
    return undefined;
  }

  if (parts.length === 2) {
    const [collection, key] = parts;
    const primitiveCollection =
      theme.tokens.primitives[
        collection as keyof typeof theme.tokens.primitives
      ];

    if (primitiveCollection && key in primitiveCollection) {
      return primitiveCollection[key];
    }

    const semanticCollection =
      theme.tokens.semantic[collection as keyof typeof theme.tokens.semantic];

    if (semanticCollection && key in semanticCollection) {
      return semanticCollection[key];
    }

    return undefined;
  }

  const [scope, collection, key] = parts;

  if (scope === 'semantic') {
    const semanticCollection =
      theme.tokens.semantic[collection as keyof typeof theme.tokens.semantic];
    return semanticCollection?.[key];
  }

  if (scope === 'primitives') {
    const primitiveCollection =
      theme.tokens.primitives[
        collection as keyof typeof theme.tokens.primitives
      ];
    return primitiveCollection?.[key];
  }

  return undefined;
}
