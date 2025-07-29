import { ScreenshotProvider } from '../interfaces/screenshot.js';
import { PuppeteerScreenshotProvider } from '../providers/puppeteer-screenshot.js';

class ScreenshotService {
  private provider: ScreenshotProvider;

  constructor(provider?: ScreenshotProvider) {
    this.provider = provider || new PuppeteerScreenshotProvider();
  }

  async takeScreenshot(url: string, outputPath: string): Promise<void> {
    return this.provider.takeScreenshot(url, outputPath);
  }

  setProvider(provider: ScreenshotProvider): void {
    this.provider = provider;
  }
}

export const screenshotService = new ScreenshotService();

export { ScreenshotService };

export async function takeScreenshot(url: string, outputPath: string): Promise<void> {
  return screenshotService.takeScreenshot(url, outputPath);
}
