/// <reference types="vitest" />
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const projectRoot = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: projectRoot,
  resolve: {
    alias: {
      '@tailng-ui/registry': resolve(projectRoot, '../registry/src/index.ts'),
    },
  },
  test: {
    name: 'tailng-cli',
    include: ['src/**/*.spec.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../../coverage/libs/tailng-ui/cli',
      reporter: ['text', 'lcov'],
    },
  },
});
