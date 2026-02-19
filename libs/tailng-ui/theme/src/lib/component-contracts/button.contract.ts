import type { ComponentStyleContract } from '../contracts/component-style-contract.types';

export type ButtonSlot = 'root' | 'iconLeading' | 'label' | 'iconTrailing';

export type ButtonState =
  | 'default'
  | 'hover'
  | 'active'
  | 'disabled'
  | 'loading';

export const buttonStyleContract: ComponentStyleContract<ButtonSlot, ButtonState> =
  {
    slots: {
      root: 'tng-button',
      iconLeading: 'tng-button__icon-leading',
      label: 'tng-button__label',
      iconTrailing: 'tng-button__icon-trailing',
    },
    states: {
      default: '[data-state="default"]',
      hover: '[data-state="hover"]',
      active: '[data-state="active"]',
      disabled: '[data-disabled="true"]',
      loading: '[data-loading="true"]',
    },
    cssVars: {
      '--tng-button-bg': '{semantic.accent.brand}',
      '--tng-button-fg': '{semantic.foreground.inverse}',
      '--tng-button-bg-hover': '{semantic.accent.brandHover}',
      '--tng-button-radius': '{radius.md}',
      '--tng-button-px': '{spacing.lg}',
      '--tng-button-py': '{spacing.md}',
    },
  };
