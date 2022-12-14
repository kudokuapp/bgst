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
  let isBca: boolean = false,
    isMandiri: boolean = false,
    isBni: boolean = false,
    isBsi: boolean = false,
    isGopay: boolean = false,
    isOvo: boolean = false,
    isDana: boolean = false,
    isShopeePay: boolean = false;

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

    if (value.institutionId === 3 || value.institutionId === 17) {
      isMandiri = true;
    }

    if (value.institutionId === 4) {
      isBni = true;
    }

    if (value.institutionId === 26 || value.institutionId === 34) {
      isBsi = true;
    }

    if (value.institutionId === 11) {
      isGopay = true;
    }

    if (value.institutionId === 12) {
      isOvo = true;
    }

    if (value.institutionId === 46) {
      isDana = true;
    }

    if (value.institutionId === 33) {
      isShopeePay = true;
    }
  });

  return (
    <>
      <Client
        isBca={isBca}
        isMandiri={isMandiri}
        isBni={isBni}
        isBsi={isBsi}
        isGopay={isGopay}
        isOvo={isOvo}
        isDana={isDana}
        isShopeePay={isShopeePay}
      />
    </>
  );
}
