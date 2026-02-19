import baseConfig from '../../../eslint.config.mjs';
import nxPlugin from '@nx/eslint-plugin';
import tseslint from 'typescript-eslint';

export default [
  ...baseConfig,
  {
    files: ['**/*.json'],
    ...tseslint.configs.disableTypeChecked,
    plugins: {
      '@nx': nxPlugin,
    },
    rules: {
      ...tseslint.configs.disableTypeChecked.rules,
      '@nx/dependency-checks': [
        'error',
        {
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'],
        },
      ],
    },
    languageOptions: {
      ...tseslint.configs.disableTypeChecked.languageOptions,
      parser: await import('jsonc-eslint-parser'),
    },
  },
];
