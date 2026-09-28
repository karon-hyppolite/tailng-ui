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
  return tailngRegistry
    .map((item) => item.name)
    .sort((left, right) => left.localeCompare(right));
}

export function hasRegistryItem(name: string): boolean {
  return getRegistryItem(name) !== undefined;
}

export type ResolvedRegistryItems = Readonly<{
  items: readonly RegistryItem[];
  unknownNames: readonly string[];
}>;

export function resolveRegistryItems(names: readonly string[]): ResolvedRegistryItems {
  const items: RegistryItem[] = [];
  const unknownNames: string[] = [];

  for (const name of names) {
    const item = getRegistryItem(name);
    if (!item) {
      unknownNames.push(name);
    } else if (!items.includes(item)) {
      items.push(item);
    }
  }

  return { items, unknownNames };
}
