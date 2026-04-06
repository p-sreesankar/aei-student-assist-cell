import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const publicDir = path.resolve('public');
const siteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || 'https://YOUR_USERNAME.github.io/applied-association').replace(/\/$/, '');
const basePath =
  process.env.VITE_BASE_PATH ||
  (process.env.VERCEL ? '/' : '/applied-association/');
const baseSegmentsToKeep = basePath === '/' ? 0 : basePath.split('/').filter(Boolean).length;

const siteConfigModule = await import(pathToFileURL(path.resolve('src/data/site-config.js')).href);
const { SITE_CONFIG, SECTIONS } = siteConfigModule;
const configuredSiteUrl = SITE_CONFIG.canonicalSiteUrl?.replace(/\/$/, '');
const resolvedSiteUrl = (process.env.VITE_SITE_URL || process.env.SITE_URL || configuredSiteUrl || siteUrl).replace(/\/$/, '');
const configuredDomain = SITE_CONFIG.customDomain?.trim();
const resolvedDomain = (process.env.VITE_CNAME || configuredDomain || '').trim();

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const robots = `User-agent: *
Allow: /

Sitemap: ${resolvedSiteUrl}/sitemap.xml
`;

const now = new Date().toISOString();
const staticRoutes = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/about', changefreq: 'weekly', priority: '0.9' },
  ...(SECTIONS.notices ? [{ path: '/notices', changefreq: 'daily', priority: '0.9' }] : []),
  ...(SECTIONS.events ? [{ path: '/events', changefreq: 'daily', priority: '0.9' }] : []),
  ...(SECTIONS.resources ? [{ path: '/resources', changefreq: 'weekly', priority: '0.9' }] : []),
  ...(SECTIONS.mockTests ? [{ path: '/mock-tests', changefreq: 'weekly', priority: '0.8' }] : []),
  ...(SECTIONS.grievance ? [{ path: '/grievance', changefreq: 'monthly', priority: '0.7' }] : []),
  ...(SECTIONS.contact ? [{ path: '/contact', changefreq: 'monthly', priority: '0.7' }] : []),
];

const urlsXml = staticRoutes
  .map(({ path: routePath, changefreq, priority }) => `  <url>\n    <loc>${resolvedSiteUrl}${routePath}</loc>\n    <lastmod>${now}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`)
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

const fallback404 = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Applied Association</title>
    <script>
      var pathSegmentsToKeep = ${baseSegmentsToKeep};
      var l = window.location;
      l.replace(
        l.protocol +
          '//' +
          l.hostname +
          (l.port ? ':' + l.port : '') +
          l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') +
          '/?/' +
          l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash
      );
    </script>
  </head>
  <body></body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots, 'utf8');
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
fs.writeFileSync(path.join(publicDir, '404.html'), fallback404, 'utf8');
if (resolvedDomain) {
  fs.writeFileSync(path.join(publicDir, 'CNAME'), `${resolvedDomain}\n`, 'utf8');
}

console.log(`Generated robots.txt, sitemap.xml, 404.html${resolvedDomain ? ', and CNAME' : ''} for ${resolvedSiteUrl}`);
