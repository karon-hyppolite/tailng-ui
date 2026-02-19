/// <reference types="vitest" />
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: projectRoot,
  resolve: {
    alias: {
      '@tailng-ui/primitives': resolve(projectRoot, '../primitives/src/index.ts'),
    },
  },
  test: {
    name: 'components',
    include: ['src/**/*.spec.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../../coverage/libs/tailng-ui/components',
      reporter: ['text', 'lcov'],
    },
  },
});
