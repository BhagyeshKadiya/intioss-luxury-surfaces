const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const VIEWPORTS = [
  { name: 'phone-360', width: 360, height: 740 },
  { name: 'phone-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'laptop-1280', width: 1280, height: 800 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'fhd-1920', width: 1920, height: 1080 },
];

const ROUTES = [
  { path: '/', slug: 'home' },
  { path: '/products', slug: 'products' },
  { path: '/products/golden-statuario', slug: 'product-golden-statuario' },
  { path: '/services', slug: 'services' },
  { path: '/about', slug: 'about' },
  { path: '/gallery', slug: 'gallery' },
  { path: '/book-match', slug: 'book-match' },
  { path: '/contact', slug: 'contact' },
  { path: '/design/logo-options', slug: 'logo-options' },
];

const BANNED_PATTERNS = [
  'turnkey', 'Top 2%', 'unparalleled', 'zenith', 'Quarried exclusively',
  'Unlike surface retailers', 'millimeter', 'lifetime durability',
  'generational resilience', 'Direct quarrier', 'Rare Monumental',
  'In stock', '280+', '180+', '40+', '80,000', 'Hafeez', 'Macma',
  'Silvasa', 'Ahmedabad', 'Worli', 'Malabar Hill', 'BKC', 'Bodakdev',
  'Gujarat', 'South Mumbai', 'Pooja', 'Staircase', 'Bedroom',
  'Hotel & Hospitality', 'Commercial / Lobby', 'Outdoor & Landscape',
  'Atelier', 'ultra-luxury', 'ultra-premium', 'Parent Brand',
  'Lorem ipsum', 'Makrana', 'Taj Mahal', '5th-generation', '600 hours',
  'Sichuan', 'sculptors', '5-axis', '60,000 PSI', '0.1 mm', '16-head',
  '35-ton', '105 gloss', 'wind-load', 'Fischer', 'SS316', 'quarry bench',
  'private reserve', 'laser-scan', '38 slabs', 'crystallisation',
  'compressive', 'water absorption', 'Origin Source', 'Vision to Reality',
  'Compressive Strength'
];

async function runQa() {
  console.log('--- STARTING QA TEST SUITE ---');
  const results = {
    screenshotsTaken: 0,
    consoleErrors: [],
    networkFailures: [],
    bannedStringHitsInHtml: [],
    computedStyleChecks: {},
    audioChecks: {},
    carouselChecks: {},
    imageAltMissing: [],
  };

  const outputDir = path.join(process.cwd(), 'qa', 'after');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})`);
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore known benign hydration or image warnings if any
        results.consoleErrors.push({ viewport: vp.name, error: text });
      }
    });

    page.on('requestfailed', (req) => {
      // Filter out aborts
      if (req.failure()?.errorText !== 'net::ERR_ABORTED') {
        results.networkFailures.push({
          viewport: vp.name,
          url: req.url(),
          failure: req.failure()?.errorText,
        });
      }
    });

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Check 404
      if (res && res.status() >= 400) {
        results.networkFailures.push({ url, status: res.status() });
      }

      // Wait a moment for layout stabilization
      await page.waitForTimeout(600);

      // Check horizontal scroll
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });
      if (hasHorizontalScroll) {
        console.warn(`[WARN] Horizontal scroll detected on ${route.path} at ${vp.name}`);
      }

      // Check rendered HTML for banned strings (only on desktop once per route)
      if (vp.name === 'desktop-1440') {
        const html = await page.content();
        for (const pattern of BANNED_PATTERNS) {
          const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b${escaped}\\b`, 'i');
          if (regex.test(html)) {
            // Check if it's on a legitimate dev mockup or placeholder
            results.bannedStringHitsInHtml.push({ route: route.path, pattern });
          }
        }
      }

      // Check Alt text on images
      const missingAltCount = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.filter((img) => !img.hasAttribute('alt') || img.getAttribute('alt').trim() === '').length;
      });
      if (missingAltCount > 0) {
        results.imageAltMissing.push({ route: route.path, viewport: vp.name, count: missingAltCount });
      }

      // Page-specific assertions
      if (route.path === '/' && vp.name === 'desktop-1440') {
        // Tagline computed style assertions
        const taglineStyles = await page.evaluate(() => {
          const el = document.querySelector('h2.font-marcellus');
          if (!el) return null;
          const s = window.getComputedStyle(el);
          return {
            fontFamily: s.fontFamily,
            fontWeight: s.fontWeight,
            textTransform: s.textTransform,
            color: s.color,
          };
        });
        results.computedStyleChecks.tagline = taglineStyles;

        // Audio autoplay check
        const audioState = await page.evaluate(() => {
          const a = document.querySelector('audio');
          if (!a) return { found: false };
          return {
            found: true,
            paused: a.paused,
            autoplay: a.hasAttribute('autoplay'),
            currentTime: a.currentTime,
          };
        });
        results.audioChecks = audioState;
      }

      if (route.path === '/products/golden-statuario' && vp.name === 'desktop-1440') {
        // Top Carousel object-fit check
        const carouselImg = await page.evaluate(() => {
          const img = document.querySelector('img.object-contain');
          if (!img) return null;
          const s = window.getComputedStyle(img);
          return {
            objectFit: s.objectFit,
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            renderedWidth: img.clientWidth,
            renderedHeight: img.clientHeight,
          };
        });
        results.carouselChecks = carouselImg;
      }

      // Save screenshot
      const filename = `${route.slug}_${vp.name}.png`;
      await page.screenshot({
        path: path.join(outputDir, filename),
        fullPage: false,
      });
      results.screenshotsTaken++;
    }

    await page.close();
  }

  await browser.close();

  fs.writeFileSync('qa/test-results.json', JSON.stringify(results, null, 2), 'utf8');
  console.log('--- QA SUITE FINISHED ---');
  console.log(`Total screenshots taken: ${results.screenshotsTaken}`);
  console.log(`Console errors: ${results.consoleErrors.length}`);
  console.log(`Network failures: ${results.networkFailures.length}`);
  console.log(`Banned string hits in HTML: ${results.bannedStringHitsInHtml.length}`);
  console.log(`Audio state:`, results.audioChecks);
  console.log(`Tagline styles:`, results.computedStyleChecks.tagline);
  console.log(`Carousel styling:`, results.carouselChecks);
}

runQa().catch((err) => {
  console.error(err);
  process.exit(1);
});
