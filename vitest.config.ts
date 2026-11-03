import path from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // tsconfig keeps `jsx: preserve` for Next; tests render real components.
  oxc: {
    jsx: { runtime: "automatic" },
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    fileParallelism: false,
  },
});
