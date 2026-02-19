/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'theme',
    include: ['libs/tailng-ui/theme/src/**/*.spec.ts'],
    environment: 'node',
    coverage: {
      provider: 'v8',
      reportsDirectory: '../../../coverage/libs/tailng-ui/theme',
      reporter: ['text', 'lcov'],
    },
  },
});
