import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineFlatConfig } from 'eslint-define-config';
import tsEslint from 'typescript-eslint';
import arrayFuncPlugin from 'eslint-plugin-array-func';
import importPlugin from 'eslint-plugin-import';
import perfectionistPlugin from 'eslint-plugin-perfectionist';
import unicornPlugin, { configs as unicornConfig } from 'eslint-plugin-unicorn';
import vitestPlugin from 'eslint-plugin-vitest';
import globals from 'globals';

import 'eslint-plugin-only-warn';

export default defineFlatConfig([
  // global ignores
  {
    ignores: ['node_modules', 'coverage', 'dist', 'pnpm-lock.yaml'],
  },

  // override default eslint rules
  {
    ...js.configs.recommended,
    rules: {
      'arrow-body-style': ['warn', 'as-needed'],
      'class-methods-use-this': 'off',
      'dot-notation': 'off',
      'max-params': 'off',
      'no-loop-func': 'off',
      'no-loss-of-precision': 'off',
      'no-magic-numbers': 'off',
      'no-unused-vars': 'off',
    },
  },

  {
    files: ['**/*.(js|ts)'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      'array-func': arrayFuncPlugin,
      import: importPlugin,
      perfectionist: perfectionistPlugin,
      unicorn: unicornPlugin,
    },
    rules: {
      'import/consistent-type-specifier-style': ['warn', 'prefer-top-level'],
      'import/default': 'warn',
      'import/export': 'warn',
      'import/namespace': 'warn',
      'import/newline-after-import': 'warn',
      'import/no-absolute-path': 'warn',
      'import/no-duplicates': 'warn',
      'import/no-extraneous-dependencies': 'warn',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/no-unused-modules': 'warn',
      'import/order': 'warn',
      'import/no-default-export': 'warn',

      'perfectionist/sort-array-includes': 'warn',
      'perfectionist/sort-classes': 'warn',
      'perfectionist/sort-enums': 'warn',
      'perfectionist/sort-exports': 'warn',
      'perfectionist/sort-interfaces': 'warn',
      'perfectionist/sort-jsx-props': 'warn',
      'perfectionist/sort-maps': 'warn',
      'perfectionist/sort-named-exports': 'warn',
      'perfectionist/sort-named-imports': 'warn',
      'perfectionist/sort-object-types': 'warn',
      'perfectionist/sort-objects': 'warn',
      'perfectionist/sort-union-types': 'warn',

      ...unicornConfig.recommended.rules,
      'unicorn/prevent-abbreviations': 'off',

      ...arrayFuncPlugin.configs.recommended.rules,
    },
    settings: {
      'import/parsers': {
        espree: ['.js', '.cjs', '.mjs', '.jsx'],
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.ts'],
        },
        typescript: true,
      },
    },
  },

  {
    // https://typescript-eslint.io/
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint.plugin,
    },
    rules: {
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/ban-types': 'warn',
      '@typescript-eslint/no-array-constructor': 'warn',
      '@typescript-eslint/no-base-to-string': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'warn',
      '@typescript-eslint/no-duplicate-type-constituents': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-extra-non-null-assertion': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-for-in-array': 'warn',
      '@typescript-eslint/no-implied-eval': 'warn',
      '@typescript-eslint/no-loss-of-precision': 'warn',
      '@typescript-eslint/no-misused-new': 'warn',
      '@typescript-eslint/no-misused-promises': 'warn',
      '@typescript-eslint/no-namespace': 'warn',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'warn',
      '@typescript-eslint/no-redundant-type-constituents': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/consistent-type-exports': 'warn',
      '@typescript-eslint/no-this-alias': 'warn',
      '@typescript-eslint/no-unnecessary-type-assertion': 'warn',
      '@typescript-eslint/no-unnecessary-type-constraint': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-var-requires': 'warn',
      '@typescript-eslint/prefer-as-const': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/restrict-plus-operands': 'warn',
      '@typescript-eslint/restrict-template-expressions': 'warn',
      '@typescript-eslint/triple-slash-reference': 'warn',
      '@typescript-eslint/unbound-method': 'warn',
    },
  },

  // testing with vitest
  {
    files: ['**/*.test.ts', '**/*.test.tsx'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      'vitest/expect-expect': 'warn',
      'vitest/no-commented-out-tests': 'warn',
      'vitest/no-identical-title': 'warn',
      'vitest/no-import-node-test': 'warn',
      'vitest/require-local-test-context-for-concurrent-snapshots': 'warn',
      'vitest/valid-describe-callback': 'warn',
      'vitest/valid-expect': 'warn',
      'vitest/valid-title': 'warn',
    },
  },

  eslintConfigPrettier,
]);
