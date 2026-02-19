import type { ThemeDefinition } from '../contracts/theme.types';
import type { TokenScale } from '../contracts/token.types';

function normalizeTokenPath(tokenPath: string): string[] {
  return tokenPath
    .trim()
    .replace(/[{}]/g, '')
    .split('.')
    .filter(Boolean);
}

function getPrimitiveCollection(
  theme: ThemeDefinition,
  collection: string,
): TokenScale | undefined {
  switch (collection) {
    case 'color':
      return theme.tokens.primitives.color;
    case 'spacing':
      return theme.tokens.primitives.spacing;
    case 'radius':
      return theme.tokens.primitives.radius;
    case 'typography':
      return theme.tokens.primitives.typography;
    case 'motion':
      return theme.tokens.primitives.motion;
    default:
      return undefined;
  }
}

function getSemanticCollection(
  theme: ThemeDefinition,
  collection: string,
): TokenScale | undefined {
  switch (collection) {
    case 'background':
      return theme.tokens.semantic.background;
    case 'foreground':
      return theme.tokens.semantic.foreground;
    case 'border':
      return theme.tokens.semantic.border;
    case 'accent':
      return theme.tokens.semantic.accent;
    case 'focus':
      return theme.tokens.semantic.focus;
    default:
      return undefined;
  }
}

function resolveShortPathToken(
  theme: ThemeDefinition,
  collection: string,
  key: string,
): string | undefined {
  const primitiveCollection = getPrimitiveCollection(theme, collection);
  if (primitiveCollection && key in primitiveCollection) {
    return primitiveCollection[key];
  }

  const semanticCollection = getSemanticCollection(theme, collection);
  if (semanticCollection && key in semanticCollection) {
    return semanticCollection[key];
  }

  return undefined;
}

function resolveScopedToken(
  theme: ThemeDefinition,
  request: {
    scope: string;
    collection: string;
    key: string;
  },
): string | undefined {
  if (request.scope === 'semantic') {
    return getSemanticCollection(theme, request.collection)?.[request.key];
  }

  if (request.scope === 'primitives') {
    return getPrimitiveCollection(theme, request.collection)?.[request.key];
  }

  return undefined;
}

export function resolveToken(theme: ThemeDefinition, tokenPath: string): string | undefined {
  const parts = normalizeTokenPath(tokenPath);

  if (parts.length < 2) {
    return undefined;
  }

  if (parts.length === 2) {
    const [collection, key] = parts;
    return resolveShortPathToken(theme, collection, key);
  }

  const [scope, collection, key] = parts;
  return resolveScopedToken(theme, { scope, collection, key });
}
