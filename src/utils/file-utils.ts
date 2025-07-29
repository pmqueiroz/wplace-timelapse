import { mkdirSync } from 'fs';
import { resolve } from 'path';

export function ensureDirectoryExists(folderPath: string): void {
  mkdirSync(folderPath, { recursive: true });
}

export function getFullScreenshotPath(folder: string, filename: string): string {
  return resolve(folder, filename);
}
