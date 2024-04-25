import path from 'node:path';
import url from 'node:url';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    tsconfigPaths({ root: path.dirname(url.fileURLToPath(import.meta.url)) }),
  ],
  test: {
    coverage: {
      include: ['src'],
      exclude: ['src/config'],
      provider: 'istanbul',
      reporter: ['html', 'json-summary', 'json', 'text-summary'],
      reportOnFailure: true,
      thresholds: {
        lines: 80,
      },
    },
    globals: true,
    include: ['src/**/*.test.ts'],
  },
});
