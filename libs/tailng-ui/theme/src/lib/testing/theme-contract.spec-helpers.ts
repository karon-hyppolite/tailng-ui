import type { ThemeDefinition } from '../contracts/theme.types';
import type {
  ThemePrimitives,
  ThemeSemanticTokens,
  TokenScale,
} from '../contracts/token.types';
import { flattenTokens } from '../engine/flatten-tokens';
import { resolveTokenValue } from '../engine/resolve-token-value';

const requiredPrimitiveScales: readonly (keyof ThemePrimitives)[] = [
  'color',
  'spacing',
  'radius',
  'typography',
  'motion',
];

const requiredSemanticScales: readonly (keyof ThemeSemanticTokens)[] = [
  'background',
  'foreground',
  'border',
  'accent',
  'focus',
];

function hasEntries(scale: TokenScale): boolean {
  return Object.keys(scale).length > 0;
}

export function listMissingRequiredThemeScales(
  theme: ThemeDefinition,
): string[] {
  const missingPrimitives = requiredPrimitiveScales
    .filter((scale) => !hasEntries(theme.tokens.primitives[scale]))
    .map((scale) => `primitives.${scale}`);
  const missingSemantic = requiredSemanticScales
    .filter((scale) => !hasEntries(theme.tokens.semantic[scale]))
    .map((scale) => `semantic.${scale}`);

  return [...missingPrimitives, ...missingSemantic];
}

const unresolvedReferencePattern = /\{[^{}]+\}/;

export function listUnresolvedTokenReferences(theme: ThemeDefinition): string[] {
  return Object.entries(flattenTokens(theme))
    .filter(([, value]) => unresolvedReferencePattern.test(resolveTokenValue(theme, value)))
    .map(([tokenPath]) => tokenPath);
}

export function isThemeContractValid(theme: ThemeDefinition): boolean {
  return listMissingRequiredThemeScales(theme).length === 0;
}
