import js from '@eslint/js';
import globals from 'globals';
import vitest from '@vitest/eslint-plugin';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
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
    files: ["test/*.js"],
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
