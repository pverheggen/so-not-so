import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), tsConfigPaths()],
});
