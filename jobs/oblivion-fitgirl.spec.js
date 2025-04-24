// @ts-check
import { test } from '@playwright/test'
import downloadLinks from './links.js'

const downloadFolder = 'C:\\Downloads\\'

// set timeout to 3 hours
test.setTimeout(1000*60*60*3)

test('download parts', async ({ page }) => {
  for (const dl of downloadLinks) {
    await page.goto(dl)
    const downloadPromise = page.waitForEvent('download');
    await page.evaluate('seen = true; download();')
    const download = await downloadPromise;
    // Wait for the download process to complete and save the downloaded file somewhere.
    await download.saveAs(downloadFolder + download.suggestedFilename());
  }
})
