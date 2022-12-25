import BarangPalingMahal, {
  TransactionToneDown,
} from '$lib/Metrics/BarangPalingMahal';
import Heatmap, { IData } from '$lib/Metrics/Heatmap';
import IncomevsExpense from '$lib/Metrics/IncomevsExpense';
import TotalPemasukan from '$lib/Metrics/TotalPemasukan';
import TotalPengeluaran from '$lib/Metrics/TotalPengeluaran';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import { PrismaClient, Transaction } from '@prisma/client';
import _, { Dictionary } from 'lodash';
import { shortMonth, year } from '$utils/helper/dateArray';

const prisma = new PrismaClient();

export default async function Page({
  params,
}: {
  params: { account: string; month: string; year: string };
}) {
  const nextCookies = cookies();
  const token = nextCookies.get('token')?.value;
  let transactions: Transaction[] | undefined = undefined;

  let monthlyTransactions: Dictionary<Transaction[]> | undefined = undefined;

  if (!token) redirect('/');

  const { whatsapp } = jwt.verify(
    token,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) redirect('/');

  if (!user.hasAccount) redirect('/account/connect');

  if (params.account === 'bca') {
    const account = await prisma.account.findFirst({
      where: {
        OR: [
          { institutionId: 2 },
          { institutionId: 37 },
          { institutionId: 38 },
        ],
        kudosId: user.id,
      },
    });

    transactions = await prisma.transaction.findMany({
      where: {
        accountId: account?.id,
        institution_id: account?.institutionId,
      },
    });
  } else if (params.account === 'gopay') {
    const account = await prisma.account.findFirst({
      where: {
        kudosId: user.id,
        institutionId: 11,
      },
    });

    transactions = await prisma.transaction.findMany({
      where: {
        accountId: account?.id,
        institution_id: account?.institutionId,
      },
    });
  } else {
    redirect('/');
  }

  if (!transactions) redirect('/');

  // Ini brarti 2022
  if (params.year === '1') {
    const year = _.filter(transactions, ({ dateTimestamp }) => {
      return new Date(dateTimestamp as Date).getFullYear() === 2022;
    });

    monthlyTransactions = _.groupBy(year, ({ dateTimestamp }) => {
      return new Date(dateTimestamp as Date).getMonth();
    });
  }
  // Ini brarti 2023
  else if (params.year === '2') {
    const year = _.filter(transactions, ({ dateTimestamp }) => {
      return new Date(dateTimestamp as Date).getFullYear() === 2023;
    });

    monthlyTransactions = _.groupBy(year, ({ dateTimestamp }) => {
      return new Date(dateTimestamp as Date).getMonth();
    });
  } else {
    redirect('/');
  }

  const realTransaction = monthlyTransactions[Number(params.month) - 1];

  if (!realTransaction) redirect('/');

  const groupDirection = _.groupBy(realTransaction, ({ direction }) => {
    return direction;
  });

  let totalIncome: number,
    totalExpense: number,
    barangPalingMahal = {} as TransactionToneDown;

  if (!groupDirection) {
    totalIncome = 1;
    totalExpense = 1;
  } else {
    totalIncome = _.reduce(
      groupDirection['in'],
      (result, { amount }) => {
        if (amount === null) return 1;

        return (result += amount);
      },
      0
    );

    totalExpense = _.reduce(
      groupDirection['out'],
      (result, { amount }) => {
        if (amount === null) return 1;

        return (result += amount);
      },
      0
    );

    const barangPalingMahalUnedited = _.maxBy(
      groupDirection['out'],
      ({ amount }) => {
        return amount;
      }
    );

    const barangPalingMahalDate = new Date(
      barangPalingMahalUnedited!.dateTimestamp as Date
    );

    barangPalingMahal = {
      amount: barangPalingMahalUnedited!.amount as number,
      day: `${barangPalingMahalDate.getDate()}`,
      month: `${shortMonth[barangPalingMahalDate.getMonth()]}`,
      description: barangPalingMahalUnedited!.description as string,
    };
  }

  // Ini buat heatmap
  // Jadi gua group by day dulu (ini mulai dari 1 bukan 0)
  const groupbyDay = _.groupBy(groupDirection['out'], ({ dateTimestamp }) => {
    return new Date(dateTimestamp as Date).getDate();
  });
  // Abis itu gua for loop-in
  // Heatmap butuh array yang isinya object {date: ..., count: ...}
  let heatMapArray = [] as IData[];
  for (const date in groupbyDay) {
    heatMapArray.push({
      year: `${year[Number(params.year) - 1]}`,
      month: `${Number(params.month) < 10 ? `0${params.month}` : params.month}`,
      date: `${Number(date) < 10 ? `0${date}` : date}`,
      count: groupbyDay[date].length,
    });
  }

  return (
    <main className="w-full h-fit my-20 flex flex-col items-center justify-center gap-28 sm:px-0 px-4">
      <TotalPemasukan totalIncome={totalIncome} />
      <TotalPengeluaran totalExpense={totalExpense} />
      <IncomevsExpense totalIncome={totalIncome} totalExpense={totalExpense} />
      <Heatmap
        data={heatMapArray}
        year={year[Number(params.year) - 1]}
        month={Number(params.month)}
      />
      <BarangPalingMahal
        item={barangPalingMahal}
        totalIncome={totalIncome}
        totalExpense={totalExpense}
      />
      <h6 className="font-bold text-4xl text-center text-primary dark:text-primaryDark my-20">
        Other metrics coming soon
      </h6>
    </main>
  );
}
