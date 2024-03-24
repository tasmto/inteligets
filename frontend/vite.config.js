import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  server: {
    proxy: {
      /* '/api': 'http://localhost:6000',*/

      '/api': {
        target: 'http://localhost:6000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/uploads': {
        target: 'http://localhost:6000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
