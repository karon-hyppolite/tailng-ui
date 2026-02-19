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

function toVariableName(prefix: string, ...parts: string[]): string {
  return `--${prefix}-${parts.join('-')}`;
}

type ScaleContext = {
  vars: Record<string, string>;
  prefix: string;
  path: readonly string[];
};

function addScaleVariables(
  context: ScaleContext,
  scale: TokenScale,
): void {
  for (const token of Object.keys(scale)) {
    context.vars[toVariableName(context.prefix, ...context.path, token)] =
      scale[token];
  }
}

function addPrimitiveVariables(
  vars: Record<string, string>,
  theme: ThemeDefinition,
  prefix: string,
): void {
  for (const collection of primitiveCollections) {
    addScaleVariables(
      { vars, prefix, path: [collection] },
      theme.tokens.primitives[collection],
    );
  }
}

function addSemanticVariables(
  vars: Record<string, string>,
  theme: ThemeDefinition,
  prefix: string,
): void {
  for (const collection of semanticCollections) {
    addScaleVariables(
      { vars, prefix, path: ['semantic', collection] },
      theme.tokens.semantic[collection],
    );
  }
}

export function toCssVars(
  theme: ThemeDefinition,
  options: CssVarAdapterOptions = {},
): Record<string, string> {
  const prefix = options.prefix ?? 'tng';
  const includePrimitives = options.includePrimitives ?? true;
  const includeSemantic = options.includeSemantic ?? true;

  const vars: Record<string, string> = {};

  if (includePrimitives) {
    addPrimitiveVariables(vars, theme, prefix);
  }

  if (includeSemantic) {
    addSemanticVariables(vars, theme, prefix);
  }

  return vars;
}
