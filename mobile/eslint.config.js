const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  ...expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
    rules: {
      // Disable ESLint rules that conflict with Prettier
      "prettier/prettier": "error",
    },
  },
]);
