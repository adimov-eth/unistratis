/* eslint-env node */

require('@uniswap/eslint-config/load')

module.exports = {
  extends: ['@uniswap/eslint-config/react', 'prettier'],
  plugins: ['prettier'],
  overrides: [
    {
      files: ['**/*.config.*', '**/*.d.ts'],
      rules: {
        'import/no-unused-modules': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'import/no-restricted-paths': [
          'error',
          {
            zones: [
              {
                target: ['src/**/*[!.test].ts', 'src/**/*[!.test].tsx'],
                from: 'src/test-utils',
              },
            ],
          },
        ],
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'moment',
                message: 'moment is not configured for tree-shaking. If you use it, update the Webpack configuration.',
              },
              {
                name: 'zustand',
                importNames: ['default'],
                message: 'Default import from zustand is deprecated. Import `{ create }` instead.',
              },
            ],
          },
        ],
        'prettier/prettier': 'error',
      },
    },
  ],
  rules: {
    'prettier/prettier': 'error',
  },
}
