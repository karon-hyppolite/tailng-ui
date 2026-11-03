import { describe, expect, it } from 'vitest';
import { tailngRegistry } from './registry';
import { validateRegistryItem } from './registry-validation';

describe('validateRegistryItem', () => {
  it('accepts every built-in registry item', () => {
    for (const item of tailngRegistry) {
      expect(validateRegistryItem(item)).toEqual([]);
    }
  });

  it('reports invalid names, unsafe paths and duplicates', () => {
    const errors = validateRegistryItem({
      dependencies: [],
      description: 'broken',
      files: [
        { content: '', path: '../outside.ts' },
        { content: '', path: '/absolute.ts' },
        { content: '', path: 'src/a.ts' },
        { content: '', path: 'src/a.ts' },
      ],
      name: 'Bad Name',
    });

    expect(errors).toEqual([
      'Invalid item name: "Bad Name"',
      'File path must not contain "..": ../outside.ts',
      'File path must be relative: /absolute.ts',
      'Duplicate file path: src/a.ts',
    ]);
  });
});
