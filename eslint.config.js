import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules'], // 빌드 파일과 의존성 폴더 무시
  },
  {
    files: ['**/*.{ts,tsx}'], // TypeScript 파일 검사
    languageOptions: {
      ecmaVersion: 2020, // 최신 ECMAScript 문법 지원
      parser: '@typescript-eslint/parser', // TypeScript 파서 설정
      parserOptions: {
        project: './tsconfig.json', // TypeScript 설정 파일 연결
        sourceType: 'module', // ES 모듈 사용
      },
      globals: globals.browser, // 브라우저 글로벌 변수 설정
    },
    plugins: {
      react, // React 플러그인
      'react-hooks': reactHooks, // React Hooks 규칙
      'react-refresh': reactRefresh, // React Fast Refresh 규칙
    },
    rules: {
      ...react.configs.recommended.rules, // React 권장 규칙
      ...reactHooks.configs.recommended.rules, // React Hooks 권장 규칙
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true } // Fast Refresh 설정
      ],
    },
  }
);