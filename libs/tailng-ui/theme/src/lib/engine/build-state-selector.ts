import type { ComponentStyleContract } from '../contracts/component-style-contract.types';

export function buildStateSelector<TSlot extends string, TState extends string>(
  contract: Readonly<ComponentStyleContract<TSlot, TState>>,
  slot: TSlot,
  state: TState,
): string | null {
  const stateSelector = contract.states[state];
  if (!stateSelector) {
    return null;
  }

  return `.${contract.slots[slot]}${stateSelector}`;
}
