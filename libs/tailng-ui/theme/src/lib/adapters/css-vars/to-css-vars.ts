import type { ThemeDefinition } from '../../contracts/theme.types';
import type {
  ThemePrimitives,
  ThemeSemanticTokens,
  TokenScale,
} from '../../contracts/token.types';

export type CssVarAdapterOptions = {
  prefix?: string;
  includePrimitives?: boolean;
  includeSemantic?: boolean;
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

function addScaleVariables(
  context: ScaleContext,
  scale: TokenScale,
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const token of Object.keys(scale)) {
    vars[toVariableName(context.prefix, [...context.path, token])] = scale[token];
  }

  return vars;
}

function addPrimitiveVariables(
  theme: ThemeDefinition,
  prefix: string,
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const collection of primitiveCollections) {
    Object.assign(
      vars,
      addScaleVariables(
        { prefix, path: [collection] },
        theme.tokens.primitives[collection],
      ),
    );
  }

  return vars;
}

function addSemanticVariables(
  theme: ThemeDefinition,
  prefix: string,
): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const collection of semanticCollections) {
    Object.assign(
      vars,
      addScaleVariables(
        { prefix, path: ['semantic', collection] },
        theme.tokens.semantic[collection],
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

  const vars: Record<string, string> = {};

  if (includePrimitives) {
    Object.assign(vars, addPrimitiveVariables(theme, prefix));
  }

  if (includeSemantic) {
    Object.assign(vars, addSemanticVariables(theme, prefix));
  }

  return vars;
}
