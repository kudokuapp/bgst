import Client from './client';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthTokenPayload } from '$utils/auth';

const prisma = new PrismaClient();

export default async function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get('token');
  let arrrayOfConnectedBank: ['bca' | null, 'gopay' | null] = [null, null];

  if (!token) redirect('/');

  const { whatsapp } = jwt.verify(
    token.value,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) redirect('/');

  const { id: kudosId } = user;

  const response = await prisma.account.findMany({ where: { kudosId } });

  response.forEach((value) => {
    if (
      value.institutionId === 2 ||
      value.institutionId === 37 ||
      value.institutionId === 38
    ) {
      arrrayOfConnectedBank[0] = 'bca';
    }
    if (value.institutionId === 11) {
      arrrayOfConnectedBank[1] = 'gopay';
    }
  });

  return (
    <>
      <Client arrayOfConnectedBank={arrrayOfConnectedBank} />
    </>
  );
}
