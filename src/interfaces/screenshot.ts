export interface ScreenshotProvider {
  takeScreenshot(url: string, outputPath: string): Promise<void>;
}

export interface ScreenshotConfig {
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2';
  fullPage?: boolean;
  args?: string[];
  width?: number;
  height?: number;
  deviceScaleFactor?: number;
}
