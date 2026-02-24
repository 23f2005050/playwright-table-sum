const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const seeds = [62,63,64,65,66,67,68,69,70,71];
    let grandTotal = 0;

    for (const seed of seeds) {
        const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
        await page.goto(url);

        // Wait for tables to load
        await page.waitForSelector('table');

        const numbers = await page.$$eval('table td', cells =>
            cells.map(td => Number(td.innerText)).filter(n => !isNaN(n))
        );

        const pageSum = numbers.reduce((a, b) => a + b, 0);
        console.log(`Seed ${seed} sum: ${pageSum}`);

        grandTotal += pageSum;
    }

    console.log('==========================');
    console.log(`FINAL TOTAL: ${grandTotal}`);

    await browser.close();
})();