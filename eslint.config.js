import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import vitestEslintPlugin from '@vitest/eslint-plugin';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginCypress from 'eslint-plugin-cypress/flat';
import eslintPluginPromise from 'eslint-plugin-promise';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginVue from 'eslint-plugin-vue';
import globals from 'globals';

export default defineConfigWithVueTs(
  {
    ignores: [
      'node_modules/',
      '.vscode/',
      'dist/',
      'public/',
      'eslint.config.*',
      '.stylelintrc.cjs',
    ],
  },

  ...eslintPluginVue.configs['flat/recommended'],
  pluginCypress.configs.globals,
  pluginCypress.configs.recommended,
  vueTsConfigs.recommendedTypeChecked,

  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort,
      'promise': eslintPluginPromise,
      '@stylistic': stylistic,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        defineProps: 'readonly',
        defineEmits: 'readonly',
        withDefaults: 'readonly',
      },

      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        projectService: true,
        parser: '@typescript-eslint/parser',
      },
    },

    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-expressions': ['error', { 'allowTernary': true }],
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-enum-comparison': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error', {
          args: 'none',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error', {
          selector: 'property',
          format: null,
        },
      ],

      'no-console': process.env.NODE_ENV === 'production' ? ['warn', { allow: ['error'] }] : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'symbol-description': 'off',
      camelcase: [
        'error', { allow: ['((.*?)_([a-zA-Z]{0,}[0-9]{0,}[a-zA-Z]{0,})){0,}'] },
      ],
      curly: 'error',
      'no-unused-vars': 'off',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      'prefer-promise-reject-errors': 'warn',
      'no-extra-boolean-cast': 'off',
      quotes: ['error', 'single'],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Side effect imports.
            ['^\\u0000'],
            // Packages. Things that start with a letter (or digit or underscore), or `@` followed by a letter.
            ['^@?\\w'],
            // from nuxt directory
            ['^#?\\w'],
            // types
            ['^(@/application)(/.*|$)'],
            // plugins + composables + store
            ['^(@/plugins|@/composables||@/store)(/.*|$)'],
            // components
            ['^(@|components)(/.*|$)'],
            ['^(@/public)(/.*|$)'],
            // Absolute imports and other imports such as Vue-style '@/foo`. Anything not matched in another group.
            ['^'],
            // Relative imports.
            // Anything that starts with a dot.
            ['^\\.'],
          ],
        },
      ],

      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/indent': [
        'error', 2, { SwitchCase: 1 },
      ],
      '@stylistic/semi-style': ['error', 'last'],
      '@stylistic/semi': 'error',
      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
      '@stylistic/object-curly-newline': [
        'error',
        {
          ObjectExpression: {
            multiline: true,
            consistent: true,
          },
          ObjectPattern: {
            multiline: true,
            consistent: true,
          },
          ExportDeclaration: {
            multiline: true,
            consistent: true,
          },
          ImportDeclaration: {
            multiline: false,
            consistent: true,
          },
        },
      ],
      '@stylistic/object-curly-spacing': [
        'error',
        'always',
        { objectsInObjects: true },
      ],
      '@stylistic/array-bracket-spacing': ['error', 'never'],
      '@stylistic/no-multiple-empty-lines': [
        'error',
        {
          max: 1,
          maxEOF: 1,
        },
      ],
      '@stylistic/space-before-function-paren': [
        'error',
        {
          anonymous: 'always',
          named: 'never',
          asyncArrow: 'always',
        },
      ],

      'vue/no-unused-vars': [
        'error', {
          'ignorePattern': '^_',
        },
      ],
      'vue/html-self-closing': [
        'warn', {
          html: {
            void: 'never',
            normal: 'never',
            component: 'always',
          },

          svg: 'never',
          math: 'never',
        },
      ],
      'vue/attribute-hyphenation': [
        'warn', 'always', { ignore: ['viewBox', 'gradientUnits', 'modelValue'] },
      ],
      'vue/no-unused-properties': [
        'error', { groups: ['props', 'data', 'computed', 'methods'] },
      ],
      'vue/v-slot-style': [
        'error', {
          atComponent: 'shorthand',
          default: 'shorthand',
          named: 'shorthand',
        },
      ],
      'vue/no-mutating-props': ['error'],
      'vue/multi-word-component-names': ['error'],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/v-on-event-hyphenation': ['error', 'always'],
      'vue/first-attribute-linebreak': [
        'error', {
          singleline: 'ignore',
          multiline: 'below',
        },
      ],
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: { max: 1 },

          multiline: { max: 1 },
        },
      ],
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'always',
        },
      ],
      'vue/no-multiple-template-root': 'off',
      'vue/no-required-prop-with-default': 'error',
      'vue/require-default-prop': 'error',
    },
  },

  {
    files: ['src/tests/**/*'],

    plugins: { vitest: vitestEslintPlugin },

    rules: {
      ...vitestEslintPlugin.configs.recommended.rules,
    },
  },
);
