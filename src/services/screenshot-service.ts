import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer';

const BROWSER_CONFIG: PuppeteerLaunchOptions = {
  args: ['--no-sandbox']
};

const PAGE_CONFIG = {
  waitUntil: 'networkidle2' as const
};

export async function takeScreenshot(url: string, outputPath: string): Promise<void> {
  if (!url) {
    throw new Error('URL is required for taking screenshot');
  }

  let browser: Browser | undefined;
  
  try {
    browser = await puppeteer.launch(BROWSER_CONFIG);
    const page: Page = await browser.newPage();
    await page.goto(url, PAGE_CONFIG);
    await page.screenshot({ 
      path: outputPath, 
      fullPage: true 
    });
    
    console.log(`Screenshot saved to: ${outputPath}`);
    
  } catch (error) {
    console.error('Error taking screenshot:', (error as Error).message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
