import type { ThemeDefinition } from '../../contracts/theme.types';
import type {
  ThemePrimitives,
  ThemeSemanticTokens,
  TokenScale,
} from '../../contracts/token.types';
import { resolveTokenValue } from '../../engine/resolve-token-value';

export type CssVarAdapterOptions = {
  prefix?: string;
  includePrimitives?: boolean;
  includeSemantic?: boolean;
  resolveReferences?: boolean;
  maxResolveDepth?: number;
};

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

function toVariableName(prefix: string, parts: readonly string[]): string {
  return `--${prefix}-${parts.join('-')}`;
}

type ScaleContext = Readonly<{
  prefix: string;
  path: readonly string[];
}>;

type TokenValueResolver = (value: string) => string;

function getTokenValueResolver(
  theme: ThemeDefinition,
  options: Readonly<CssVarAdapterOptions>,
): TokenValueResolver {
  if (options.resolveReferences === false) {
    return (value: string): string => value;
  }

  return (value: string): string =>
    resolveTokenValue(theme, value, { maxDepth: options.maxResolveDepth });
}

function addScaleVariables(
  context: ScaleContext,
  scale: TokenScale,
  resolveValue: TokenValueResolver,
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const token of Object.keys(scale)) {
    vars[toVariableName(context.prefix, [...context.path, token])] = resolveValue(
      scale[token],
    );
  }

  return vars;
}

function addPrimitiveVariables(
  theme: ThemeDefinition,
  prefix: string,
  resolveValue: TokenValueResolver,
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const collection of primitiveCollections) {
    Object.assign(
      vars,
      addScaleVariables(
        { prefix, path: [collection] },
        theme.tokens.primitives[collection],
        resolveValue,
      ),
    );
  }

  return vars;
}

function addSemanticVariables(
  theme: ThemeDefinition,
  prefix: string,
  resolveValue: TokenValueResolver,
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const collection of semanticCollections) {
    Object.assign(
      vars,
      addScaleVariables(
        { prefix, path: ['semantic', collection] },
        theme.tokens.semantic[collection],
        resolveValue,
      ),
    );
  }

  return vars;
}

export function toCssVars(
  theme: ThemeDefinition,
  options: Readonly<CssVarAdapterOptions> = {},
): Record<string, string> {
  const prefix = options.prefix ?? 'tng';
  const includePrimitives = options.includePrimitives ?? true;
  const includeSemantic = options.includeSemantic ?? true;
  const resolveValue = getTokenValueResolver(theme, options);

  const vars: Record<string, string> = {};

  if (includePrimitives) {
    Object.assign(vars, addPrimitiveVariables(theme, prefix, resolveValue));
  }

  if (includeSemantic) {
    Object.assign(vars, addSemanticVariables(theme, prefix, resolveValue));
  }

  return vars;
}
