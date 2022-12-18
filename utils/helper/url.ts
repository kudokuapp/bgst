export default function url(endpoint: string) {
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://bgst.kudoku.id'
      : 'http://localhost:3000';

  const url = new URL(endpoint, host);

  return url;
}
