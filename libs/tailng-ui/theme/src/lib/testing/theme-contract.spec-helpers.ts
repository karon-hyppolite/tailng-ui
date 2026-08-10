import type { ThemeDefinition } from '../contracts/theme.types';
import type {
  ThemePrimitives,
  ThemeSemanticTokens,
  TokenScale,
} from '../contracts/token.types';

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

export function isThemeContractValid(theme: ThemeDefinition): boolean {
  return listMissingRequiredThemeScales(theme).length === 0;
}
