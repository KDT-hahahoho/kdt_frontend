import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // PWA가 자동으로 업데이트되도록 설정
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'], // 포함할 파일들
      manifest: {
        name: 'Wish', // 앱의 전체 이름
        short_name: '위시', // 홈 화면에 표시될 짧은 이름
        description: 'wish 난임부부를 위한 ai 심리상담 웹앱', // 앱 설명
        theme_color: '#ffffff', // 테마 색상
        icons: [
          {
            src: '/icons/icon-192x192.png', // 아이콘 경로
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png', // 큰 아이콘 경로
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
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
