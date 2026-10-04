import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change `site` to your real address once you have one (Netlify subdomain now, your domain later).
export default defineConfig({
  site: 'https://hashim-khan.netlify.app',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
