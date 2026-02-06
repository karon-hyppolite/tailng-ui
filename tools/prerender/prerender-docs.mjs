import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import serveHandler from 'serve-handler';
import puppeteer from 'puppeteer';

const DIST_DIR = 'dist/apps/docs';
const ROUTES_FILE = 'apps/docs/prerender-routes.txt';
const PORT = 4173;

const indexHtmlPath = path.join(DIST_DIR, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  throw new Error(`index.html not found at ${indexHtmlPath}. Run "nx build docs" first.`);
}
const indexHtml = fs.readFileSync(indexHtmlPath);

const routes = fs
  .readFileSync(ROUTES_FILE, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((r) => (r.startsWith('/') ? r : `/${r}`));

const isAssetRequest = (url) =>
  url === '/favicon.ico' ||
  url.startsWith('/assets/') ||
  url.endsWith('.js') ||
  url.endsWith('.css') ||
  url.endsWith('.map') ||
  url.endsWith('.png') ||
  url.endsWith('.jpg') ||
  url.endsWith('.jpeg') ||
  url.endsWith('.svg') ||
  url.endsWith('.webp') ||
  url.endsWith('.woff') ||
  url.endsWith('.woff2') ||
  url.endsWith('.ttf') ||
  url.endsWith('.json') ||
  url.endsWith('.txt') ||
  url.endsWith('.xml');

const server = http.createServer((req, res) => {
  const url = req.url ?? '/';

  // Serve built assets from dist
  if (isAssetRequest(url)) {
    return serveHandler(req, res, { public: DIST_DIR });
  }

  // SPA fallback
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.end(indexHtml);
});

await new Promise((resolve) => server.listen(PORT, resolve));

const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});
const page = await browser.newPage();

/* ---------------------------------------------
 * PATCH: absolutize known build assets
 * ------------------------------------------- */
const absolutizeAssets = (html) =>
  html
    // stylesheet
    .replace(/href=["'](styles\.css(?:\?[^"']*)?)["']/g, 'href="/$1"')

    // main entry
    .replace(/src=["'](main\.js(?:\?[^"']*)?)["']/g, 'src="/$1"')

    // Vite / Rollup chunks (modulepreload + script)
    .replace(/href=["'](chunk-[^"']+\.js(?:\?[^"']*)?)["']/g, 'href="/$1"')
    .replace(/src=["'](chunk-[^"']+\.js(?:\?[^"']*)?)["']/g, 'src="/$1"')

    // other root-level build assets (fonts, maps, images, etc.)
    .replace(
      /href=["']([^"']+\.(?:css|js|map|woff2?|ttf|svg|png|jpe?g|webp)(?:\?[^"']*)?)["']/g,
      (m, v) =>
        v.startsWith('/') || v.startsWith('http') || v.startsWith('//')
          ? m
          : `href="/${v}"`
    );

for (const route of routes) {
  const url = `http://localhost:${PORT}${route}`;
  await page.goto(url, { waitUntil: 'networkidle0' });

  let html = await page.content();

  html = absolutizeAssets(html);

  const dir = path.join(DIST_DIR, route === '/' ? '' : route);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);

  console.log(`prerendered ${route}`);
}

await browser.close();
server.close();

console.log('prerender complete');