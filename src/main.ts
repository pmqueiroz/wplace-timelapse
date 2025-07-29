import { getTargetUrl } from './config/environment.js';
import { getScreenshotFolder, getScreenshotFilename } from './utils/date-utils.js';
import { ensureDirectoryExists, getFullScreenshotPath } from './utils/file-utils.js';
import { takeScreenshot } from './services/screenshot-service.js';

async function main(): Promise<void> {
  try {
    const url: string = getTargetUrl();
    const folder: string = getScreenshotFolder();
    const filename: string = getScreenshotFilename();
    
    ensureDirectoryExists(folder);
    const outputPath: string = getFullScreenshotPath(folder, filename);
    
    await takeScreenshot(url, outputPath);
    
    console.log('Screenshot process completed successfully');
    
  } catch (error) {
    console.error('Screenshot process failed:', (error as Error).message);
    process.exit(1);
  }
}

main();
