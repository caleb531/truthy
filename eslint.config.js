import js from '@eslint/js';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
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
