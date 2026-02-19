import { resolveToken } from './resolve-token';
import type { ThemeDefinition } from '../contracts/theme.types';

export type ResolveTokenValueOptions = {
  maxDepth?: number;
};

function toTokenPath(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
    return undefined;
  }

  const tokenPath = trimmed.slice(1, -1).trim();
  if (tokenPath.length === 0) {
    return undefined;
  }

  return tokenPath;
}

export function resolveTokenValue(
  theme: ThemeDefinition,
  value: string,
  options: Readonly<ResolveTokenValueOptions> = {},
): string {
  const maxDepth = options.maxDepth ?? 10;
  let currentValue = value;
  const visited = new Set<string>();

  for (let depth = 0; depth < maxDepth; depth += 1) {
    const tokenPath = toTokenPath(currentValue);
    if (!tokenPath) {
      return currentValue;
    }

    if (visited.has(tokenPath)) {
      return currentValue;
    }
    visited.add(tokenPath);

    const nextValue = resolveToken(theme, tokenPath);
    if (!nextValue) {
      return currentValue;
    }

    currentValue = nextValue;
  }

  return currentValue;
}
