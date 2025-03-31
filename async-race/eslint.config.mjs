import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import eslintPluginUnicorn from "eslint-plugin-unicorn";

export default [
  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tsparser,
      sourceType: "module",
    },
    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
      unicorn: eslintPluginUnicorn,
    },

    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "prettier/prettier": "error",
      "unicorn/better-regex": "error",
      "unicorn/error-message": "error",
      "unicorn/no-empty-file": "warn",
      "unicorn/filename-case": "warn",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { accessibility: "explicit", overrides: { constructors: "off" } },
      ],
      "@typescript-eslint/member-ordering": "error",
      "class-methods-use-this": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-for-each": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/number-literal-case": "off",
      "unicorn/numeric-separators-style": "off",
      "unicorn/filename-case": [
        "error",
        {
          case: "camelCase",
        },
      ],
      "unicorn/prevent-abbreviations": [
        "error",
        {
          allowList: {
            acc: true,
            env: true,
            i: true,
            j: true,
            props: true,
            Props: true,
          },
        },
      ],
    },
  },
];
