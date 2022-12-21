import BarangPalingMahal from '$lib/Metrics/BarangPalingMahal';
import Heatmap from '$lib/Metrics/Heatmap';
import IncomevsExpense from '$lib/Metrics/IncomevsExpense';
import TotalPemasukan from '$lib/Metrics/TotalPemasukan';
import TotalPengeluaran from '$lib/Metrics/TotalPengeluaran';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import _ from 'lodash';

const prisma = new PrismaClient();

export default async function Page({
  params,
}: {
  params: { account: string };
}) {
  const nextCookies = cookies();
  const token = nextCookies.get('token')?.value;

  let bca: any, gopay: any;

  if (!token) redirect('/');

  const { whatsapp } = jwt.verify(
    token,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user || !user.hasAccount) redirect('/');

  console.log(params.account);

  const accounts = await prisma.account.findMany({
    where: { kudosId: user.id },
  });

  for (let i = 0; i < accounts.length; i++) {
    if (
      accounts[i].institutionId === 2 ||
      accounts[i].institutionId === 37 ||
      accounts[i].institutionId === 38
    ) {
      bca = await prisma.transaction.findMany({
        where: {
          accountId: accounts[i].id,
          institution_id: accounts[i].institutionId,
        },
      });
    }

    if (accounts[i].institutionId === 11) {
      gopay = await prisma.transaction.findMany({
        where: {
          accountId: accounts[i].id,
          institution_id: accounts[i].institutionId,
        },
      });
    }
  }

  return (
    <main className="w-full h-fit my-20 flex flex-col items-center justify-center gap-28 sm:px-0 px-4">
      <TotalPemasukan />
      <TotalPengeluaran />
      <IncomevsExpense />
      <Heatmap />
      <BarangPalingMahal />
      <h6 className="font-bold text-4xl text-center text-primary dark:text-primaryDark my-20">
        Other metrics coming soon
      </h6>
    </main>
  );
}
