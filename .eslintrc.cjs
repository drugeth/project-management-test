module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "react-refresh"],
  settings: {
    react: { version: "18.2" },
    "import/resolver": {
      alias: {
        map: [
          ["@/components", "./src/components"],
          ["@/hooks", "./src/hooks"],
          ["@/services", "./src/services"],
          ["@/atoms", "./src/atoms"],
          ["@/interfaces", "./src/interfaces"],
          ["@/constants", "./src/constants"],
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
  },
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/button-has-type": "off",
    "import/prefer-default-export": "off",
    "linebreak-style": "off",
    "react/function-component-definition": "off",
    semi: "off",
    "arrow-body-style": "off",
    "import/no-extraneous-dependencies": "off",
  },
};
