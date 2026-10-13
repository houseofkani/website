import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { defineConfig } from "@playwright/test";

/** Load the website .env.local and the CMS .env so tests can sign webhooks and log in. */
function loadEnv(file: string): void {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
    if (match && process.env[match[1]!] === undefined) {
      process.env[match[1]!] = match[2]!;
    }
  }
}
const root = process.cwd();
loadEnv(path.join(root, ".env.local"));
loadEnv(path.join(root, "..", "cms", ".env"));

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60_000,
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium" }],
  webServer: {
    command: "PORT=3001 pnpm dev",
    url: "http://localhost:3001",
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
