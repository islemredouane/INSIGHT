// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Planned domain (to request from ESTIN). Used for canonical URLs and the sitemap.
  site: 'https://insight.estin.dz',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
