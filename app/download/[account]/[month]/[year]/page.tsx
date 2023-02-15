import { TransactionToneDown } from '$lib/Metrics/BarangPalingMahal';
import { IData } from '$lib/Metrics/Heatmap';
import { shortMonth, year } from '$utils/helper/dateArray';
import _ from 'lodash';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Navbar, Heading, MainShare } from './client';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import {
  getAccountFromParams,
  getTransaction,
} from 'app/t/[account]/[month]/[year]/utils';
import prisma from '$utils/prisma';

export default async function Page({
  params,
}: {
  params: { account: string; month: string; year: string };
}) {
  const nextCookies = cookies();
  const token = nextCookies.get('token')?.value;

  if (!token) redirect('/');

  const { whatsapp } = jwt.verify(
    token,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) redirect('/');

  if (!user.hasAccount) redirect('/account/connect');

  const account = await getAccountFromParams(params.account, user);

  if (!account) redirect('/');

  const transaction = await getTransaction(account, params);

  if (!transaction) redirect('/t');

  const groupDirection = _.groupBy(transaction, ({ direction }) => {
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

        return (result += amount as unknown as number);
      },
      0
    );

    totalExpense = _.reduce(
      groupDirection['out'],
      (result, { amount }) => {
        if (amount === null) return 1;

        return (result += amount as unknown as number);
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
      amount: barangPalingMahalUnedited!.amount as unknown as number,
      day: `${barangPalingMahalDate.getDate()}`,
      month: `${shortMonth[barangPalingMahalDate.getMonth()]}`,
      description: barangPalingMahalUnedited!.description as string,
    };
  }

  // Ini buat heatmap
  // Jadi gua group by day dulu (ini mulai dari 1 bukan 0)
  const groupbyDay = _.groupBy(groupDirection['out'], ({ date }) => {
    return new Date(date as Date).getDate();
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
    <section className="bg-background dark:bg-onBackground min-h-[100vh] w-full">
      <Navbar params={params} />
      <Heading />
      <div className="p-4">
        <MainShare
          params={params}
          kudos={{ firstName: user.firstName, kudosNo: user.id }}
          financialData={{
            totalIncome: totalIncome,
            totalExpense: totalExpense,
            heatMap: heatMapArray,
            barangPalingMahal: barangPalingMahal,
          }}
        />
      </div>
    </section>
  );
}
