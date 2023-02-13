import Client from './client';
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthTokenPayload } from '$utils/auth';
import prisma from '$utils/prisma';

export default async function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get('token');
  let isBca: boolean = false,
    isMandiri: boolean = false,
    isBni: boolean = false,
    isBsi: boolean = false,
    isBri: boolean = false,
    isGopay: boolean = false,
    isOvo: boolean = false,
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
    const { institutionId } = value;

    if (institutionId === 2 || institutionId === 37 || institutionId === 38) {
      isBca = true;
    }

    if (institutionId === 3 || institutionId === 17) {
      isMandiri = true;
    }

    if (institutionId === 4) {
      isBni = true;
    }

    if (institutionId === 26 || institutionId === 34) {
      isBsi = true;
    }

    if (institutionId === 5 || institutionId === 16) {
      isBri = true;
    }

    if (institutionId === 11) {
      isGopay = true;
    }

    if (institutionId === 12) {
      isOvo = true;
    }

    if (institutionId === 33) {
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
        isBri={isBri}
        isGopay={isGopay}
        isOvo={isOvo}
        isShopeePay={isShopeePay}
      />
    </>
  );
}
