import { describe, expect, it } from 'vitest';
import { buttonRegistryItem } from './button/button.registry';
import { getRegistryItem, listRegistryItemNames, tailngRegistry } from './registry';

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
