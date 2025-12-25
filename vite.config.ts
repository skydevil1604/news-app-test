import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import checkerPlugin from 'vite-plugin-checker';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint';
import stylelint from 'vite-plugin-stylelint';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isTest = mode === 'test';
  const isDev = command === 'serve';

  // For unit tests & production build we keep Vite config minimal and fast.
  // Lint/checker plugins are useful during local development.
  const plugins = (isTest || !isDev)
    ? [vue()]
    : [
      vue(),
      eslintPlugin({ failOnWarning: true }),
      checkerPlugin({
        typescript: true,
        vueTsc: { tsconfigPath: 'tsconfig.app.json' },
      }),
      stylelint({
        emitError: true,
        fix: true,
        cache: true,
        include: 'src/**/*.{vue,css,scss}',
        lintInWorker: true,
      }),
    ];

  return {
    build: {
      minify: 'esbuild',
    },
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});
