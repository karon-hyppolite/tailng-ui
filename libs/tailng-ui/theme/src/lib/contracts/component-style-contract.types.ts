export type ComponentSlotMap<TSlot extends string> = Record<TSlot, string>;

export type ComponentStateMap<TState extends string> = Partial<
  Record<TState, string>
>;

export type ComponentStyleContract<
  TSlot extends string = string,
  TState extends string = string,
> = {
  slots: ComponentSlotMap<TSlot>;
  states: ComponentStateMap<TState>;
  cssVars?: Record<string, string>;
}
