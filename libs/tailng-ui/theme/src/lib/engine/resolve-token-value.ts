import { resolveToken } from './resolve-token';
import type { ThemeDefinition } from '../contracts/theme.types';

export type ResolveTokenValueOptions = {
  maxDepth?: number;
};

const defaultMaxDepth = 10;
const embeddedReferencePattern = /\{([^{}]+)\}/g;

function normalizeMaxDepth(maxDepth: number | undefined): number {
  if (maxDepth === undefined || !Number.isFinite(maxDepth) || maxDepth < 1) {
    return defaultMaxDepth;
  }

  return Math.floor(maxDepth);
}

function toTokenPath(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed.startsWith('{') || !trimmed.endsWith('}')) {
    return undefined;
  }

  const tokenPath = trimmed.slice(1, -1).trim();
  if (tokenPath.length === 0 || /[{}]/.test(tokenPath)) {
    return undefined;
  }

  return tokenPath;
}

function resolveEmbeddedReferences(
  theme: ThemeDefinition,
  value: string,
  depthLeft: number,
): string {
  if (depthLeft <= 0 || !value.includes('{')) {
    return value;
  }

  return value.replace(embeddedReferencePattern, (match: string): string =>
    resolveWithDepth(theme, match, depthLeft - 1),
  );
}

function resolveWithDepth(theme: ThemeDefinition, value: string, maxDepth: number): string {
  let currentValue = value;
  const visited = new Set<string>();

  for (let depth = 0; depth < maxDepth; depth += 1) {
    const tokenPath = toTokenPath(currentValue);
    if (!tokenPath) {
      return resolveEmbeddedReferences(theme, currentValue, maxDepth - depth);
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

export function resolveTokenValue(
  theme: ThemeDefinition,
  value: string,
  options: Readonly<ResolveTokenValueOptions> = {},
): string {
  return resolveWithDepth(theme, value, normalizeMaxDepth(options.maxDepth));
}
