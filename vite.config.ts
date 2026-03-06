import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-ignore
import { chromeExtension } from './build/chromeExtension';
// const { resolve } = require('path')
// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'primary-color': '#DB4C3F',
        },
        javascriptEnabled: true,
      },
    },
  },
  plugins: [react(), process.env.BUILD_CRX && chromeExtension()].filter(
    Boolean,
  ),
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
      {
        find: '@/types',
        replacement: resolve(__dirname, 'src/types'),
      },
      {
        find: '@/utils',
        replacement: resolve(__dirname, 'src/utils'),
      },
      {
        find: '@/hooks',
        replacement: resolve(__dirname, 'src/hooks'),
      },
      {
        find: '@/stores',
        replacement: resolve(__dirname, 'src/stores'),
      },
      {
        find: '@/core',
        replacement: resolve(__dirname, 'src/core'),
      },
      {
        find: '@/components',
        replacement: resolve(__dirname, 'src/components'),
      },
      {
        find: '@/config',
        replacement: resolve(__dirname, 'src/config'),
      },
      {
        find: '@/api',
        replacement: resolve(__dirname, 'src/api'),
      },
      {
        find: '@/pages',
        replacement: resolve(__dirname, 'src/pages'),
      },
      {
        find: '@/assets',
        replacement: resolve(__dirname, 'src/assets'),
      },
    ],
  },
  server: {
    port: 8081,
  },
  build: {
    sourcemap: false, //打包后是否包含source-map
  },
});
