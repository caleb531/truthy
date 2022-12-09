import { defineConfig } from 'vite';
import peggy from 'rollup-plugin-peggy';

// https://vitejs.dev/config/
export default defineConfig({
  // By default, Vite will assume we are serving from the root of the domain
  // (i.e. /); however, because we are serving Truthy from a subdirectory of my
  // projects domain (e.g. https://projects.calebevans.me/truthy/), we must
  // specify . as the base directory to serve from
  base: './',
  plugins: [
    peggy({ cache: true })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['lcov', 'html']
    }
  }
});
