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
            src: '/assets/icon/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  base: "/WebApplications_frontend/"
})
