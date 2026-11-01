import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 示例站点独立配置：以 examples 为根目录，直接引用包源码
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      'ew-element-plus-table': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
    },
  },
  server: {
    port: 5180,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
