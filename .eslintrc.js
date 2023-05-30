module.exports = {
  env: {
    browser: true,
    es2021: true,
    amd: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'airbnb/hooks',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'import', '@typescript-eslint', 'prettier', 'react-hooks'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    semi: ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'react/no-unescaped-entities': 1, // enable it
    'react/prop-types': 'off',
    'no-empty-pattern': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    'react/jsx-key': 1, // should be error
    '@typescript-eslint/ban-types': 1,
    'react/display-name': 0,
    'object-curly-newline': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'react/jsx-filename-extension': [2, { extensions: ['js', 'ts', '.jsx', '.tsx'] }], // It should be just '.jsx', '.tsx'
    'react-hooks/rules-of-hooks': 2,
    'react-hooks/exhaustive-deps': 1,
    eqeqeq: 1,
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
  },
  settings: {
    react: {
      version: 'detect', // Detect react version
    },
  },
  globals: {
    React: true,
    JSX: true,
  },
}
