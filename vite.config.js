import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/mundial-2026/',
  server: {
    host: '127.0.0.1',
    port: 3000
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.svg'],
      manifest: {
        name: 'Mundial FIFA 2026',
        short_name: 'Mundial2026',
        description: 'Toda la información del Mundial FIFA 2026',
        theme_color: '#1a365d',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/mundial-2026/',
        scope: '/mundial-2026/',
        icons: [
          { src: '/mundial-2026/icons/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/mundial-2026/icons/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,json,svg,png,jpg}']
      }
    })
  ]
})
