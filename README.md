# Hashim Khan — personal site

Built with [Astro](https://astro.build). Static output, no database.

## Where to change things

| What | File |
| --- | --- |
| Name, email, LinkedIn, resume link, "Now", last updated, indexing on/off | `src/data/site.ts` |
| Other projects list on /work | `src/data/site.ts` (`OTHER_PROJECTS`) |
| Field reports | `src/content/work/*.md` |
| Log entries | `src/content/log/*.md` |
| Lab projects | `src/content/lab/*.md` |
| Home hero card (the search / AI answer) | `src/components/Hero.astro` |
| Metro map | `src/components/Metro.astro` and `public/js/metro.js` |
| Colours, fonts, spacing | `src/styles/global.css` (variables at the top) |
| Site address (for canonical URLs and sitemap) | `astro.config.mjs` → `site` |

To add a log entry, copy any file in `src/content/log/`, rename it (the file name becomes the URL), and edit the top block and text.

Lines starting with `>` in Markdown show as dashed "to add" boxes. Replace them with real content.

## Run it on your computer (optional)

```
npm install
npm run dev      # preview at http://localhost:4321
npm run build    # output goes to /dist
```

## Before Google sees it

- Replace `you@example.com`, the LinkedIn link and every "To add" box
- In `src/data/site.ts`, set `indexable: true`
- Set `site` in `astro.config.mjs` to your real address
