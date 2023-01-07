import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import * as jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { AuthTokenPayload } from '$utils/auth';

const prisma = new PrismaClient();

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

  const transaction = await prisma.transaction.findFirst({
    where: { accountId: account.id },
  });

  if (!transaction) redirect('/');

  let accountUrl: string = '';
  let year: string = '';

  const date = new Date(transaction.dateTimestamp as Date);

  switch (transaction.institution_id) {
    case 2:
      accountUrl = 'bca';
      break;
    case 3:
      accountUrl = 'mandiri';
      break;

    case 4:
      accountUrl = 'bni';
      break;

    case 11:
      accountUrl = 'gopay';
      break;

    case 12:
      accountUrl = 'ovo';
      break;
    case 17:
      accountUrl = 'mandiri';
      break;
    case 26:
      accountUrl = 'bsi';
      break;

    case 33:
      accountUrl = 'shopeepay';
      break;
    case 34:
      accountUrl = 'bsi';
      break;
    case 37:
      accountUrl = 'bca';
      break;
    case 38:
      accountUrl = 'bca';
      break;

    case 46:
      accountUrl = 'dana';
      break;

    default:
      break;
  }

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
