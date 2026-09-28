import { describe, expect, it } from 'vitest';
import { buttonRegistryItem } from './button/button.registry';
import {
  getRegistryItem,
  hasRegistryItem,
  listRegistryItemNames,
  resolveRegistryItems,
  tailngRegistry,
} from './registry';

describe('registry helpers', () => {
  it('returns all registered component names', () => {
    expect(listRegistryItemNames()).toEqual(['button']);
    expect(tailngRegistry).toContain(buttonRegistryItem);
  });

  it('resolves known item and returns undefined for unknown', () => {
    expect(getRegistryItem('button')).toEqual(buttonRegistryItem);
    expect(getRegistryItem('unknown')).toBeUndefined();
  });
});

describe('registry name normalization', () => {
  it('ignores case and surrounding whitespace', () => {
    expect(getRegistryItem(' Button ')).toBe(buttonRegistryItem);
  });
});

describe('hasRegistryItem', () => {
  it('reports whether an item exists', () => {
    expect(hasRegistryItem('button')).toBe(true);
    expect(hasRegistryItem('missing')).toBe(false);
  });
});

describe('listRegistryItemNames ordering', () => {
  it('returns names sorted alphabetically', () => {
    const names = listRegistryItemNames();

    expect(names).toEqual([...names].sort((left, right) => left.localeCompare(right)));
  });
});

describe('resolveRegistryItems', () => {
  it('deduplicates items and collects unknown names', () => {
    const resolved = resolveRegistryItems(['button', 'Button', 'nope']);

    expect(resolved.items).toEqual([buttonRegistryItem]);
    expect(resolved.unknownNames).toEqual(['nope']);
  });
});
