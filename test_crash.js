import puppeteer from 'puppeteer';

(async () => {
  console.log('Starting browser...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on('pageerror', (error) => {
    console.error('Page Error:', error.message);
  });
  page.on('console', (msg) => console.log('PAGE LOG:', msg.text()));

  console.log('Navigating to localhost:5173...');
  await page.goto('http://localhost:5173');

  console.log('Typing text...');
  await page.type(
    '#data',
    'https://example.com/very/long/url/to/test/if/it/crashes/when/pasting/text',
  );

  await new Promise((r) => setTimeout(r, 1000));

  console.log('Pasting long text...');
  // Simulate paste
  await page.evaluate(() => {
    const input = document.querySelector('#data');
    input.value = 'a'.repeat(2000); // 2000 chars
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  await new Promise((r) => setTimeout(r, 2000));

  console.log('Done');
  await browser.close();
})();
