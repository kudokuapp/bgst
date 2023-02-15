import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as jwt from 'jsonwebtoken';
import {
  BCATransaction,
  BNITransaction,
  BRITransaction,
  BSITransaction,
  GopayTransaction,
  MandiriTransaction,
  OVOTransaction,
  ShopeePayTransaction,
} from '@prisma/client';
import { AuthTokenPayload } from '$utils/auth';
import prisma from '$utils/prisma';

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

  if (!user || !user.hasAccount) return redirect('/');

  const account = await prisma.account.findFirst({
    where: { kudosId: user.id },
  });

  if (!account) return redirect('/');

  const { institutionId } = account;

  let accountUrl: string = '';
  let year: string = '';
  let transaction:
    | BCATransaction
    | BNITransaction
    | BSITransaction
    | BRITransaction
    | MandiriTransaction
    | GopayTransaction
    | OVOTransaction
    | ShopeePayTransaction
    | null = null;

  switch (institutionId) {
    case 2:
      accountUrl = 'bca';
      transaction = await prisma.bCATransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 3:
      accountUrl = 'mandiri';
      transaction = await prisma.mandiriTransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 4:
      accountUrl = 'bni';
      transaction = await prisma.bNITransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 5:
      accountUrl = 'bri';
      transaction = await prisma.bRITransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 11:
      accountUrl = 'gopay';
      transaction = await prisma.gopayTransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 12:
      accountUrl = 'ovo';
      transaction = await prisma.oVOTransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 16:
      accountUrl = 'bri';
      transaction = await prisma.bRITransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 17:
      accountUrl = 'mandiri';
      transaction = await prisma.mandiriTransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 26:
      accountUrl = 'bsi';
      transaction = await prisma.bSITransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 33:
      accountUrl = 'shopeepay';
      transaction = await prisma.shopeePayTransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 34:
      accountUrl = 'bsi';
      transaction = await prisma.bSITransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 37:
      accountUrl = 'bca';
      transaction = await prisma.bCATransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    case 38:
      accountUrl = 'bca';
      transaction = await prisma.bCATransaction.findFirst({
        where: { accountId: account.id },
      });
      break;

    default:
      break;
  }

  const date = new Date(transaction!.date ?? '2022-01-01');

  switch (date.getFullYear()) {
    case 2022:
      year = '1';
      break;

    case 2023:
      year = '2';
      break;

    default:
      break;
  }

  return redirect(`/t/${accountUrl}/${date.getMonth() + 1}/${year}`);
}
