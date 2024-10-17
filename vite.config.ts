import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@store', replacement: '/src/zustand' },
      { find: '@styles', replacement: '/src/styles' },
      { find: '@features', replacement: '/src/features' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@router', replacement: '/src/router' },
    ],
  },
});
