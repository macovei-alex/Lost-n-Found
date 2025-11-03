// @ts-check

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
// @ts-expect-error: No types available
import expo from "eslint-config-expo/flat";
import prettier from "eslint-config-prettier/flat";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error: No types available
import reactNative from "eslint-plugin-react-native";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

export default defineConfig([
  js.configs.recommended,
  expo,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["dist/**", "node_modules/**", "android/**", "ios/**"],

    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
          tsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-native": reactNative,
      import: importPlugin,
      "unused-imports": unusedImports,
      prettier: (await import("eslint-plugin-prettier")).default,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "react/prop-types": "error",
      ...reactHooks.configs.recommended.rules,
      ...reactNative.configs.all?.rules,
      "prettier/prettier": [
        "warn",
        {
          printWidth: 110,
          endOfLine: "lf",
          trailingComma: "es5",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  prettier,
]);
