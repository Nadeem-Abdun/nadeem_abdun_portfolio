import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import type { ViteUserConfig } from 'vitest/config';

export default defineConfig(
  ({ command }) =>
    ({
      base: command === 'build' ? '/nadeem_abdun_portfolio/' : '/',
      plugins: [react(), tailwindcss()],
      server: {
        port: 3000,
        open: true,
      },
      build: {
        outDir: 'dist',
        minify: 'terser',
        sourcemap: true,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
        },
      },
      test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './src/test/setup.ts',
      },
    }) as ViteUserConfig
);
