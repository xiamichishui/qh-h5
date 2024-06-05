import { resolve } from 'path';

import { defineConfig, loadEnv, UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

export const r = (...args: any[]) => resolve(__dirname, '.', ...args);

// https://vitejs.dev/config/
export default defineConfig(env => {
  const root = process.cwd();
  const envConfig = loadEnv(env.mode, root, 'YYX_');

  return {
    base: envConfig.YYX_PUBLIC_PATH,
    envPrefix: 'YYX_',
    root,
    server: {
      port: +envConfig.YYX_PORT,
      proxy: {
        '/api': {
          target: envConfig.YYX_API_BASEURL,
          ws: false,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    },
    build: {
      target: 'es2015',
      outDir: 'dist/qh-h5',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router'],
        dts: r('src/auto-imports.d.ts')
      }),
      Components({
        resolvers: [VantResolver({ importStyle: true, module: 'esm' })]
      })
    ],
    resolve: {
      alias: {
        '@/': `${resolve(__dirname, 'src')}/`
      }
    }
  } as UserConfig;
});
