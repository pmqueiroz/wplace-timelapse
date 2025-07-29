import { resolve } from 'path';

interface DateComponents {
  year: number;
  month: string;
  day: string;
  time: string;
}

export function getCurrentDateComponents(): DateComponents {
  const now: Date = new Date();
  const year: number = now.getFullYear();
  const month: string = String(now.getMonth() + 1).padStart(2, '0');
  const day: string = String(now.getDate()).padStart(2, '0');
  const time: string = now.toTimeString().slice(0, 5).replace(':', '');

  return { year, month, day, time };
}

export function getScreenshotFolder(): string {
  const { year, month, day }: DateComponents = getCurrentDateComponents();
  return resolve('screenshots', String(year), month, day);
}

export function getScreenshotFilename(): string {
  const { time }: DateComponents = getCurrentDateComponents();
  return `${time}.png`;
}
