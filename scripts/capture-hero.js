const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'qa/after/hero_nobox_light.png' });
  console.log('Saved qa/after/hero_nobox_light.png');

  // Swipe or wait for next slide
  await page.evaluate(() => {
    const bars = document.querySelectorAll('.absolute.top-20 button');
    if (bars && bars[1]) {
      bars[1].click();
    }
  });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: 'qa/after/hero_nobox_slide2.png' });
  console.log('Saved qa/after/hero_nobox_slide2.png');

  await browser.close();
})();
