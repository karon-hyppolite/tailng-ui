export type {
  ThemeDefinition,
  ThemeMeta,
  ThemeMode,
  ThemeOverride,
} from './lib/contracts/theme.types';

export type {
  ThemePrimitives,
  ThemeSemanticTokens,
  ThemeTokenOverrides,
  ThemeTokens,
  TokenScale,
} from './lib/contracts/token.types';

export type {
  ComponentSlotMap,
  ComponentStateMap,
  ComponentStyleContract,
} from './lib/contracts/component-style-contract.types';

export { defaultThemePreset } from './lib/presets/default.preset';
export { minimalThemePreset } from './lib/presets/minimal.preset';

export { createTheme } from './lib/engine/create-theme';
export { mergeTheme } from './lib/engine/merge-theme';
export { resolveToken } from './lib/engine/resolve-token';

export { createThemeTokens, primitiveTokens } from './lib/tokens';

export { lightSemanticTokens } from './lib/tokens/semantic/light';
export { darkSemanticTokens } from './lib/tokens/semantic/dark';

export type { CssVarAdapterOptions } from './lib/adapters/css-vars/to-css-vars';
export { toCssVars } from './lib/adapters/css-vars/to-css-vars';
export { injectThemeVars } from './lib/adapters/css-vars/inject-theme-vars';

export type { TailwindThemePreset } from './lib/adapters/tailwind/to-tailwind-preset';
export { toTailwindPreset } from './lib/adapters/tailwind/to-tailwind-preset';

export type { ButtonSlot, ButtonState } from './lib/component-contracts/button.contract';
export { buttonStyleContract } from './lib/component-contracts/button.contract';

export type { InputSlot, InputState } from './lib/component-contracts/input.contract';
export { inputStyleContract } from './lib/component-contracts/input.contract';

export {
  isThemeContractValid,
  listMissingRequiredThemeScales,
} from './lib/testing/theme-contract.spec-helpers';
