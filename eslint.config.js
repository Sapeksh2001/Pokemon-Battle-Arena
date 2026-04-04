import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    // Legacy / one-off utility scripts
    'script_original.js',
    'inject_missing_forms.js',
    'verify_and_fix_forms.js',
    'get_unmatched.js',
    'fix_final_manual.js',
    'build_main.mjs',
    // Legacy public JS (loaded as plain <script> tags, uses CDN globals)
    'public/js/**',
    // Separate React client sub-project
    'react-client/**',
    // Large auto-generated data file
    'src/pokemon_data.js',
  ]),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        // CDN globals loaded via <script> tags in index.html
        Tone: 'readonly',
        lucide: 'readonly',
        io: 'readonly',
        // Data globals set by dynamically-injected script tags (DataLoader.js)
        AbilitiesData: 'readonly',
        MovesetsData: 'readonly',
        MovesData: 'readonly',
        MergedPokemonData: 'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
