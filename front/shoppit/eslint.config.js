import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { config } from '@feature-sliced/eslint-config';

export default [
  { ignores: ['dist'] },
  ...config,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: 'src/pages',
              from: 'src',
              except: ['src/pages', 'src/modules', 'src/components', 'src/ui'],
              message:
                'Pages могут импортировать только через алиасы @modules/*, @components/*, @ui/*',
            },
            {
              target: 'src/modules',
              from: 'src',
              except: ['src/modules', 'src/components', 'src/ui', 'src/shared'],
              message:
                'Modules могут импортировать только через алиасы @components/*, @ui/*',
            },
          ],
        },
      ],

      'no-restricted-imports': [
        'error',
        {
          patterns: [
            // Запрещаем импорты между слоями без алиасов
            '../pages/*',
            '../modules/*',
            '../components/*',
            '../ui/*',
            '../shared/*',
          ],
        },
      ],

      'no-console': 'warn',
      'prefer-const': 'warn',
      indent: ['warn', 2],
      'max-len': ['warn', { code: 120 }],
      'comma-dangle': ['error', 'always-multiline'],
      semi: ['warn', 'always'],
    },
  },
];
