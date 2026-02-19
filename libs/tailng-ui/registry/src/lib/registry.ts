import { buttonRegistryItem } from './button/button.registry';
import type { RegistryItem } from './registry.types';

export const tailngRegistry: readonly RegistryItem[] = [buttonRegistryItem];

export function getRegistryItem(name: string): RegistryItem | undefined {
  return tailngRegistry.find((item) => item.name === name);
}

export function listRegistryItemNames(): readonly string[] {
  return tailngRegistry.map((item) => item.name);
}
