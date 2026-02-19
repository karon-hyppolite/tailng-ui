import type { ThemeDefinition } from '../../contracts/theme.types';

export interface CssVarAdapterOptions {
  prefix?: string;
  includePrimitives?: boolean;
  includeSemantic?: boolean;
}

function toVariableName(prefix: string, ...parts: string[]): string {
  return `--${prefix}-${parts.join('-')}`;
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
    for (const [collection, scale] of Object.entries(theme.tokens.primitives)) {
      for (const [token, value] of Object.entries(scale) as Array<
        [string, string]
      >) {
        vars[toVariableName(prefix, collection, token)] = value;
      }
    }
  }

  if (includeSemantic) {
    for (const [collection, scale] of Object.entries(theme.tokens.semantic)) {
      for (const [token, value] of Object.entries(scale) as Array<
        [string, string]
      >) {
        vars[toVariableName(prefix, 'semantic', collection, token)] = value;
      }
    }
  }

  return vars;
}
