import { defineConfig } from 'vite';
import { optimizeCssModules } from 'vite-plugin-optimize-css-modules';
import tsConfigPaths from 'vite-tsconfig-paths';
import preact from '@preact/preset-vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), tsConfigPaths(), optimizeCssModules()],
});
