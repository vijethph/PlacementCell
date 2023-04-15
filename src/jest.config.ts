/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  transform: {
    "^.+\\.ts?$": "esbuild-jest",
  },
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["app.ts", "!**/node_modules/**"],
  coverageDirectory: "coverage",
  coverageProvider: "babel", // babel or v8 ?
  coverageReporters: ["html", "text", "text-summary", "cobertura"],
  rootDir: "./",
  reporters: ["default", "jest-junit"],
  testMatch: ["**/tests/unit/*.test.ts"],
  setupFiles: ["dotenv/config"],
};
