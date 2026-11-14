// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Planned domain (to request from ESTIN). Used for canonical URLs and the sitemap.
  site: 'https://insight.estin.dz',
  integrations: [
    sitemap({
      filter: (page) => {
        // Exclude utility, 404, and private password-gated/game routes from the XML sitemap
        const url = page.toLowerCase();
        return (
          !url.includes('/404') &&
          !url.endsWith('/join') &&
          !url.endsWith('/join/') &&
          !url.includes('/spark/case') &&
          !url.includes('/spark/join') &&
          !url.includes('/spark/mentor')
        );
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

