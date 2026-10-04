import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(), summary: z.string(), where: z.string(),
    figure: z.enum(['redirects', 'listings', 'tree']),
    shiftWas: z.string(), shiftNow: z.string(), mine: z.string(), others: z.string(), order: z.number(),
  }),
});
const log = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/log' }),
  schema: z.object({
    title: z.string(), summary: z.string(), date: z.coerce.date(),
    kind: z.enum(['note', 'experiment']),
    status: z.enum(['draft', 'planned', 'running', 'published']),
  }),
});
const lab = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lab' }),
  schema: z.object({
    title: z.string(), summary: z.string(),
    stage: z.number().min(0).max(3), // 0 idea, 1 testing, 2 building, 3 shipped
    next: z.string(), featured: z.boolean().default(false), order: z.number(),
  }),
});
export const collections = { work, log, lab };
