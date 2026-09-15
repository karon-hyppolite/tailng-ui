import { resolveTokenValue } from './resolve-token-value';
import type { ComponentStyleContract } from '../contracts/component-style-contract.types';
import type { ThemeDefinition } from '../contracts/theme.types';

export function resolveComponentCssVars(
  contract: Readonly<ComponentStyleContract>,
  theme: ThemeDefinition,
): Record<string, string> {
  const resolved: Record<string, string> = {};

  for (const [name, value] of Object.entries(contract.cssVars ?? {})) {
    resolved[name] = resolveTokenValue(theme, value);
  }

  return resolved;
}
