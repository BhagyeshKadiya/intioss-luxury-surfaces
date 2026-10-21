const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const targetDirName = process.argv[2] || 'before';
const outDir = path.join(process.cwd(), 'qa', targetDirName);

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const viewports = [
  { width: 390, height: 844, name: '390x844' },
  { width: 768, height: 1024, name: '768x1024' },
  { width: 1280, height: 800, name: '1280x800' },
  { width: 1440, height: 900, name: '1440x900' },
];

const routes = [
  { path: '/', name: 'home' },
  { path: '/products', name: 'products' },
  { path: '/products/golden-statuario', name: 'product-detail' },
  { path: '/services', name: 'services' },
  { path: '/about', name: 'about' },
  { path: '/contact', name: 'contact' },
  { path: '/gallery', name: 'gallery' },
  { path: '/book-match', name: 'book-match' },
];

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function run() {
  const browser = await chromium.launch();
  console.log(`Starting screenshots for ${targetDirName} from ${BASE_URL}...`);

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const page = await context.newPage();

    for (const r of routes) {
      try {
        const url = `${BASE_URL}${r.path}`;
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(1000); // let animations settle
        const filename = `${r.name}-${vp.name}.png`;
        const filepath = path.join(outDir, filename);
        await page.screenshot({ path: filepath, fullPage: true });
        console.log(`Saved: ${filename}`);
      } catch (err) {
        console.error(`Failed ${r.path} @ ${vp.name}:`, err.message);
      }
    }
    await context.close();
  }

  await browser.close();
  console.log(`All screenshots saved to qa/${targetDirName}`);
}

run().catch(console.error);
