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
      '/apicash': {
        target: 'http://5dcf1698-a42d-47b8-8fc2-b6611fbe7953.westus2.azurecontainer.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apicash/, ''),
      },
      '/produnet': {
        target: 'http://e795f5d6-3414-4512-985f-c70bc1db2eb7.westus2.azurecontainer.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/produnet/, ''),
      },
    },
  },
})
