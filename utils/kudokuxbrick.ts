export function kudokuxbrickUrl(endpoint: string) {
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://kudoku-server.et.r.appspot.com'
      : 'http://localhost:4000';
  return new URL(endpoint, host);
}
