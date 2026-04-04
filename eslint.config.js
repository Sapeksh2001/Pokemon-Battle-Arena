import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist',
    // Legacy / pre-migration files that are not part of the React build
    'public/js/**',
    'script_original.js',
    'inject_missing_forms.js',
    'fix_final_manual.js',
    'verify_and_fix_forms.js',
    'get_unmatched.js',
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
        // CDN libraries loaded via <script> tags in index.html
        Tone: 'readonly',
        lucide: 'readonly',
        // Game data globals set by DataLoader via dynamic <script> injection
        AbilitiesData: 'readonly',
        MovesetsData: 'readonly',
        MovesData: 'readonly',
        MergedPokemonData: 'readonly',
        PokemonAbilitiesMap: 'readonly',
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
