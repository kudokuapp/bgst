const APP_SECRET: string | undefined = process.env.APP_SECRET!;

export function getJwtSecretKey(): string {
  if (!APP_SECRET || APP_SECRET.length === 0) {
    throw new Error('The environment variable APP_SECRET is not set.');
  }

  return APP_SECRET;
}
