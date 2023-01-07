import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Client from './client';

export default function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get('token');

  if (!token) redirect('/');

  return (
    <>
      <Client token={token.value} />
    </>
  );
}
