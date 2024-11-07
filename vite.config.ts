import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://8c6ee9a2-143e-4341-bfb4-5778d3cc0ccf.westus2.azurecontainer.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/cash': {
        target: 'http://5dcf1698-a42d-47b8-8fc2-b6611fbe7953.westus2.azurecontainer.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cash/, ''),
      },
      '/produnethora': {
        target: 'https://mlproduccionpbo-uktln.westus2.inference.ml.azure.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/produnethora/, ''),
      },
    },
  },
})
