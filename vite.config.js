import { defineConfig } from 'vite';
import peggy from 'rollup-plugin-peggy';

// https://vitejs.dev/config/
export default defineConfig({
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
