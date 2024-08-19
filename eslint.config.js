import js from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  prettier,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      'no-unused-vars': 'off'
    }
  },
  // Enable parsing of JSX syntax
  {
    files: ['**/*.jsx'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  {
    files: ['test/*.js'],
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals
      }
    }
  },
  {
    ignores: [
      '.DS_Store',
      'node_modules',
      'build',
      'dist',
      'coverage',
      '.vercel',
      '.env',
      '.env.*',
      '!.env.example',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock'
    ]
  }
];
