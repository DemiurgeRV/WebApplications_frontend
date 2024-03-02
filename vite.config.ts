import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: { 
    port: 3000,
    proxy: {
            '/api': ' http://192.168.226.36:8000/',
        }
  },
  base: "/WebApplications_frontend/",
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Photoshop',
        short_name: 'Photoshop',
        start_url: '/WebApplications_frontend/',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/assets/icon/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/icon/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
