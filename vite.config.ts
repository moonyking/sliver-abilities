import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'pwa-192x192.png',
        'pwa-512x512.png',
        'maskable-icon-512x512.png',
      ],
      manifest: {
        name: 'Sliver Abilities',
        short_name: 'Slivers',
        description: 'EDH用：場のスリヴァー能力を集計して一覧表示',
        start_url: '/sliver-abilities/',
        scope: '/sliver-abilities/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#0f172a',
        icons: [
          { src: '/sliver-abilities/pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/sliver-abilities/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/sliver-abilities/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallbackDenylist: [/^\/api\//],
      },
    }),
  ],

  base: '/sliver-abilities/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
