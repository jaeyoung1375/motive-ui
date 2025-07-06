import { fileURLToPath, URL } from 'node:url'

import { loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue(), vueJsx(), vueDevTools()],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./src', import.meta.url)),
        '~api': fileURLToPath(new URL('./src/api', import.meta.url)),
        '~assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        '~components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '~router': fileURLToPath(new URL('./src/router', import.meta.url)),
        '~stores': fileURLToPath(new URL('./src/stores', import.meta.url)),
        '~types': fileURLToPath(new URL('./src/types', import.meta.url)),
        '~utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '~views': fileURLToPath(new URL('./src/views', import.meta.url)),
      },
    },
    envDir: './src/env',
    server: {
      port: 8008,
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
}
