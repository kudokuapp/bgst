import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Client from './client';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';

export default async function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get('token')?.value;

  if (!token) redirect('/');

  const { whatsapp } = jwt.verify(
    token,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  if (!whatsapp) redirect('/');

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) redirect('/');

  const account = await prisma.account.findFirst({
    where: { kudosId: user.id, institutionId: 11 },
  });

  if (account?.expired === false) redirect('/t');

  const expired = account && account.expired === true;

  return (
    <>
      <Client
        token={token}
        expired={expired ?? false}
        accountId={account!.id}
      />
    </>
  );
}
