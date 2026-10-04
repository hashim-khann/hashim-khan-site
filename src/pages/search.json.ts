import { getCollection } from 'astro:content';

export async function GET() {
  const work = await getCollection('work');
  const log = await getCollection('log');
  const lab = await getCollection('lab');
  const items = [
    { u: '/', s: '', t: 'Hashim Khan — search, organic growth and building with AI', d: 'SEO and organic growth across e-commerce, edtech and local search.', k: 'home hashim khan' },
    { u: '/#map', s: 'skills', t: "What I know, and where it's heading", d: 'Technical SEO, content, e-commerce, local search, CRM, AI search, UX and site planning.', k: 'skills metro lines crm ux' },
    { u: '/work/', s: 'work', t: 'Field reports', d: 'Case studies and other website projects.', k: 'work case studies projects audits clients' },
    ...work.map((e) => ({ u: `/work/${e.id}/`, s: 'work', t: e.data.title, d: e.data.summary, k: `work field report ${e.data.where} ${e.data.mine} ${e.body ?? ''}`.slice(0, 1200) })),
    { u: '/log/', s: 'log', t: 'Notes and experiments', d: 'The full log.', k: 'log notes experiments' },
    ...log.map((e) => ({ u: `/log/${e.id}/`, s: 'log', t: e.data.title, d: e.data.summary, k: `log ${e.data.kind} ${e.body ?? ''}`.slice(0, 1200) })),
    { u: '/lab/', s: 'lab', t: "Things I'm building", d: 'Tools and projects in progress.', k: 'lab tools build' },
    ...lab.map((e) => ({ u: `/lab/${e.id}/`, s: 'lab', t: e.data.title, d: e.data.summary, k: `lab ${e.id.replace(/-/g, ' ')} ${e.body ?? ''}`.slice(0, 1200) })),
    { u: '/about/', s: 'about', t: 'About Hashim Khan', d: 'Officially Syed Hasheem Khan. English, then an MBA, then search.', k: 'about syed hasheem resume linkedin reading history travel' },
    { u: '/contact/', s: 'contact', t: 'Say hello', d: 'Email and LinkedIn.', k: 'contact email hello' },
  ];
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json' } });
}
