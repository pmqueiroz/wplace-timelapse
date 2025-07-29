import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer';
import { ScreenshotProvider, ScreenshotConfig } from '../interfaces/screenshot.js';

export class PuppeteerScreenshotProvider implements ScreenshotProvider {
  private config: ScreenshotConfig;

  constructor(config: ScreenshotConfig = {}) {
    this.config = {
      waitUntil: 'networkidle2',
      fullPage: true,
      args: ['--no-sandbox'],
      ...config
    };
  }

  async takeScreenshot(url: string, outputPath: string): Promise<void> {
    if (!url) {
      throw new Error('URL is required for taking screenshot');
    }

    let browser: Browser | undefined;
    
    try {
      const browserConfig: PuppeteerLaunchOptions = {
        args: this.config.args
      };

      browser = await puppeteer.launch(browserConfig);
      const page: Page = await browser.newPage();
      
      await page.goto(url, { 
        waitUntil: this.config.waitUntil 
      });
      
      await page.screenshot({ 
        path: outputPath, 
        fullPage: this.config.fullPage 
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
}
