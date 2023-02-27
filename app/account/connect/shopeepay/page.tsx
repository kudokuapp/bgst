import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Client from './client';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import prisma from '$utils/prisma';

export default async function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get('token')?.value;

  if (!token) redirect('/');

  const { email } = jwt.verify(
    token,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  if (!email) redirect('/');

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) redirect('/');

  const account = await prisma.account.findFirst({
    where: { kudosId: user.id, institutionId: 33 },
  });

  if (account?.expired === false) redirect('/t');

  const expired = account && account.expired === true;

  return (
    <>
      <Client
        token={token}
        expired={expired ?? false}
        accountId={account ? account.id : null}
      />
    </>
  );
}
