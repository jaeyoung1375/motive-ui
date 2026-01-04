module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // JSX 마지막 콤마 허용하지 않음
    'comma-dangle': ['error', 'never'],
    // 필요 없으면 경고
    'react/react-in-jsx-scope': 'off', // React 17+ JSX Transform
    '@typescript-eslint/no-unused-vars': ['warn'],
    '@typescript-eslint/no-empty-function': 'off', // 🚀 이 줄 추가
  },
};
