import puppeteer from 'puppeteer';

async function run() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://swap.defillama.com');

    await page.type('[placeholder="Chain"]', 'Arbitrum One');
    await page.type('[placeholder="You Sell"]', '12');

    // Assuming the token selector opens a dropdown where you can type to search
    await page.click('[placeholder="Select Token"]');
    await page.type('[placeholder="Select Token"]', 'WBTC');
    await page.keyboard.press('Enter');

    await page.click('[placeholder="You Buy"]');
    await page.type('[placeholder="You Buy"]', 'USDC');
    await page.keyboard.press('Enter');

    // Wait for the section "Select a route to perform a swap" to appear
    await page.waitForSelector('.your-selector-for-route-section');

    // Select the second option in the routes section
    const routes = await page.$$('.your-selector-for-route-option'); 
    routes[1].click();

    // Note: We're not closing the browser as per the requirements.
}

run().catch(console.error);
