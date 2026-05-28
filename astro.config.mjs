import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://peizheng224.github.io',
  base: '/peizheng-guqin/',
  build: {
    format: 'directory',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
