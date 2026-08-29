// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://opensourcestack.ink',
  trailingSlash: 'never',
  build: { format: 'directory' },
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  compressHTML: true,
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
});
