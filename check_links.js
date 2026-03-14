const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const baseUrl = 'http://localhost:3000';
  
  await page.goto(baseUrl, { waitUntil: 'load' });
  const links = await page.$$eval('a', anchors => anchors.map(a => a.href));
  const internalLinks = [...new Set(links)].filter(link => link.startsWith(baseUrl));

  const results = {
    total: internalLinks.length,
    broken: []
  };

  for (const link of internalLinks) {
    if (link === baseUrl || link === `${baseUrl}/`) continue;
    
    try {
      const res = await page.goto(link, { waitUntil: 'load', timeout: 5000 });
      if (!res || !res.ok()) {
        results.broken.push({ link, status: res ? res.status() : 'Unknown' });
      }
    } catch (e) {
      results.broken.push({ link, error: e.message });
    }
  }

  fs.writeFileSync('link_results.json', JSON.stringify(results, null, 2));
  await browser.close();
  process.exit(0);
})();
