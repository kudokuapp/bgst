import { cookies } from 'next/headers';
import Client from './client';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get('token');

  let isBca = false,
    isGopay = false;

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
      isBca = true;
    }
    if (value.institutionId === 11) {
      isGopay = true;
    }
  });

  return <Client isBca={isBca} isGopay={isGopay} />;
}
