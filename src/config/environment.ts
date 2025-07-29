export function getTargetUrl(): string {
  const url: string | undefined = process.env.TARGET_URL;
  
  if (!url) {
    throw new Error('TARGET_URL environment variable is required');
  }
  
  return url;
}

export function validateEnvironment(): void {
  getTargetUrl();
}
