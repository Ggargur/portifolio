import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 3000,
    allowedHosts: ['portifolio-xheo.onrender.com']
  }
});
