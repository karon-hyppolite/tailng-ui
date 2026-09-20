import { buttonRegistryItem } from './button/button.registry';
import type { RegistryItem } from './registry.types';

export const tailngRegistry: readonly RegistryItem[] = [buttonRegistryItem];

function normalizeItemName(name: string): string {
  return name.trim().toLowerCase();
}

export function getRegistryItem(name: string): RegistryItem | undefined {
  const normalizedName = normalizeItemName(name);
  return tailngRegistry.find((item) => item.name === normalizedName);
}

export function listRegistryItemNames(): readonly string[] {
  return tailngRegistry.map((item) => item.name);
}

export function hasRegistryItem(name: string): boolean {
  return getRegistryItem(name) !== undefined;
}
