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
    isShopeePay: boolean = false,
    isBcaExpired: boolean = false,
    isMandiriExpired: boolean = false,
    isBniExpired: boolean = false,
    isBsiExpired: boolean = false,
    isBriExpired: boolean = false,
    isGopayExpired: boolean = false,
    isOvoExpired: boolean = false,
    isShopeePayExpired: boolean = false;

  if (!token) redirect('/');

  const { email } = jwt.verify(
    token.value,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) redirect('/');

  const { id: kudosId } = user;

  const response = await prisma.account.findMany({ where: { kudosId } });

  response.forEach((value) => {
    const { institutionId, expired } = value;

    if (institutionId === 2 || institutionId === 37 || institutionId === 38) {
      isBca = true;
      isBcaExpired = expired ?? false;
    }

    if (institutionId === 3 || institutionId === 17) {
      isMandiri = true;
      isMandiriExpired = expired ?? false;
    }

    if (institutionId === 4) {
      isBni = true;
      isBniExpired = expired ?? false;
    }

    if (institutionId === 26 || institutionId === 34) {
      isBsi = true;
      isBsiExpired = expired ?? false;
    }

    if (institutionId === 5 || institutionId === 16) {
      isBri = true;
      isBriExpired = expired ?? false;
    }

    if (institutionId === 11) {
      isGopay = true;
      isGopayExpired = expired ?? false;
    }

    if (institutionId === 12) {
      isOvo = true;
      isOvoExpired = expired ?? false;
    }

    if (institutionId === 33) {
      isShopeePay = true;
      isShopeePay = expired ?? false;
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
        isBcaExpired={isBcaExpired}
        isMandiriExpired={isMandiriExpired}
        isBniExpired={isBniExpired}
        isBriExpired={isBriExpired}
        isBsiExpired={isBsiExpired}
        isGopayExpired={isGopayExpired}
        isOvoExpired={isOvoExpired}
        isShopeePayExpired={isShopeePayExpired}
      />
    </>
  );
}
