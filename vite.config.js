import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // Enables source maps
  },
  server: {
    historyApiFallback: {
      // Don't redirect /darkpulse-lp/* requests to index.html
      rewrites: [
        {
          from: /^\/darkpulse-lp\/.*$/,
          to: (context) => context.parsedUrl.pathname
        }
      ]
    },
    // Serve static files from public directory
    fs: {
      strict: false
    }
  }
})