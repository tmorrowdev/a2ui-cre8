import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteApiPlugin } from './vite-api-plugin';

export default defineConfig({
  plugins: [react(), viteApiPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      // Redirect all @tmorrow/cre8-wc imports to the pre-bundled CDN version
      '@tmorrow/cre8-wc/cdn': path.resolve(__dirname, '../../node_modules/@tmorrow/cre8-wc/cdn/cre8-wc.esm.js'),
      '@tmorrow/cre8-wc': path.resolve(__dirname, '../../node_modules/@tmorrow/cre8-wc/cdn/cre8-wc.esm.js'),
    },
  },
  optimizeDeps: {
    // Exclude cre8-wc from optimization since we're using the pre-bundled CDN version
    exclude: ['@tmorrow/cre8-wc', '@tmorrow/cre8-wc/cdn'],
  },
});
