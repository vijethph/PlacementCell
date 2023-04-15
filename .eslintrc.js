module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  ignorePatterns: [".eslintrc.js"],
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "airbnb-base", "airbnb-typescript/base", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": [
      "off",
      {
        endOfLine: "auto",
      },
    ],
    quotes: "off",
    "import/prefer-default-export": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "return-await": "off",
    "@typescript-eslint/return-await": "warn",
    "no-nonoctal-decimal-escape": "off",
    "no-unsafe-optional-chaining": "off",
    "consistent-return": "warn",
  },
};
