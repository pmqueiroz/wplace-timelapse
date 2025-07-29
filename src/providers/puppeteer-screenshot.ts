import puppeteer, { Browser, Page, PuppeteerLaunchOptions } from 'puppeteer';
import { ScreenshotProvider, ScreenshotConfig } from '../interfaces/screenshot.js';

export class PuppeteerScreenshotProvider implements ScreenshotProvider {
  private config: ScreenshotConfig;

  constructor(config: ScreenshotConfig = {}) {
    this.config = {
      waitUntil: 'networkidle2',
      fullPage: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--use-gl=desktop'
      ],
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
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
      
      await page.setViewport({
        width: this.config.width!,
        height: this.config.height!,
        deviceScaleFactor: this.config.deviceScaleFactor!
      });

      page.on('console', msg => {
        console.log('PAGE LOG >', msg.text());
        console.log(msg)
      });

      await page.goto(url, { 
        waitUntil: this.config.waitUntil 
      });

      await page.evaluate(() => {
        return new Promise((resolve) => {
          if (document.readyState === 'complete') {
            setTimeout(resolve, 1000);
          } else {
            window.addEventListener('load', () => setTimeout(resolve, 1000));
          }
        });
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
