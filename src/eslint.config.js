import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default tseslint.config(
  {
    // 1. Tell ESLint which files to look at
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],

    // 2. Setup the environment (Browser, Node, etc.)
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node, // Helpful if you use process.env
      },
    },

    // 3. Apply the rules
    rules: {
      ...js.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
    },
  },
  // 4. Load the TypeScript recommended settings
  ...tseslint.configs.recommended,
);
