import { describe, expect, it } from 'vitest';
import { buttonRegistryItem } from './button.registry';

describe('button registry item', () => {
  it('contains expected metadata', () => {
    expect(buttonRegistryItem.name).toBe('button');
    expect(buttonRegistryItem.dependencies).toEqual([
      '@tailng-ui/components',
      '@tailng-ui/primitives',
    ]);
    expect(buttonRegistryItem.files).toHaveLength(3);
  });

  it('uses TngButton import in generated component source', () => {
    const tsFile = buttonRegistryItem.files.find((file) =>
      file.path.endsWith('button-demo.component.ts'),
    );
    expect(tsFile).toBeDefined();
    expect(tsFile?.content).toContain("import { TngButton } from '@tailng-ui/components';");
    expect(tsFile?.content).not.toContain('TngButtonComponent');
  });
});
