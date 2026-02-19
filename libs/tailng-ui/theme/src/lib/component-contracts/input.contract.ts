import type { ComponentStyleContract } from '../contracts/component-style-contract.types';

export type InputSlot = 'root' | 'label' | 'field' | 'hint' | 'error';

export type InputState =
  | 'default'
  | 'focus'
  | 'disabled'
  | 'invalid'
  | 'readonly';

export const inputStyleContract: ComponentStyleContract<InputSlot, InputState> = {
  slots: {
    root: 'tng-input',
    label: 'tng-input__label',
    field: 'tng-input__field',
    hint: 'tng-input__hint',
    error: 'tng-input__error',
  },
  states: {
    default: '[data-state="default"]',
    focus: '[data-focused="true"]',
    disabled: '[data-disabled="true"]',
    invalid: '[data-invalid="true"]',
    readonly: '[readonly]',
  },
  cssVars: {
    '--tng-input-bg': '{semantic.background.surface}',
    '--tng-input-fg': '{semantic.foreground.primary}',
    '--tng-input-border': '{semantic.border.subtle}',
    '--tng-input-border-focus': '{semantic.focus.ring}',
    '--tng-input-radius': '{radius.md}',
    '--tng-input-px': '{spacing.md}',
    '--tng-input-py': '{spacing.sm}',
  },
};
