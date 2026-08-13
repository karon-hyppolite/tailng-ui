import type { ThemeDefinition } from '../contracts/theme.types';
import type {
  ThemePrimitives,
  ThemeSemanticTokens,
  TokenScale,
} from '../contracts/token.types';

const primitiveCollections: readonly (keyof ThemePrimitives)[] = [
  'color',
  'spacing',
  'radius',
  'typography',
  'motion',
];

const semanticCollections: readonly (keyof ThemeSemanticTokens)[] = [
  'background',
  'foreground',
  'border',
  'accent',
  'focus',
];

function addScale(target: Record<string, string>, path: string, scale: TokenScale): void {
  for (const [key, value] of Object.entries(scale)) {
    target[`${path}.${key}`] = value;
  }
}

export function flattenTokens(theme: ThemeDefinition): Record<string, string> {
  const flat: Record<string, string> = {};

  for (const collection of primitiveCollections) {
    addScale(flat, `primitives.${collection}`, theme.tokens.primitives[collection]);
  }

  for (const collection of semanticCollections) {
    addScale(flat, `semantic.${collection}`, theme.tokens.semantic[collection]);
  }

  return flat;
}
