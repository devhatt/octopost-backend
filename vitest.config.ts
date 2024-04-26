import path from 'node:path';
import url from 'node:url';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: ['tsconfig.json', 'tsconfig.build.json'],
      root: path.dirname(url.fileURLToPath(import.meta.url)),
    }),
  ],
  test: {
    coverage: {
      exclude: ['src/config', 'src/tests'],
      include: ['src'],
      provider: 'istanbul',
      reporter: ['html', 'json-summary', 'json', 'text-summary'],
      reportOnFailure: true,
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
    globals: true,
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/tests/setup-tests.ts'],
    watch: false,
  },
});
