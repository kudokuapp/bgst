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
import { Decimal } from '@prisma/client/runtime';
import { NgobrolSamaFounder } from './client';
import AldiAvatar from '$public/avatar/aldi.png';
import FurqonAvatar from '$public/avatar/furqon.png';
import RizqyAvatar from '$public/avatar/rizqy.png';

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

  const superTransaction: Transaction[] = transactions.map((value) => {
    return {
      id: value.id,
      dateTimestamp: value.dateTimestamp,
      brick_id: value.brick_id,
      brick_account_id: value.brick_account_id,
      account_number: value.account_number,
      account_currency: value.account_currency,
      institution_id: value.institution_id,
      merchant_id: value.merchant_id,
      outlet_outlet_id: value.outlet_outlet_id,
      location_city_id: value.location_city_id,
      location_country_id: value.location_country_id,
      date: value.date,
      amount: Math.ceil(
        value.amount as unknown as number
      ) as unknown as Decimal,
      description: value.description,
      status: value.status,
      direction: value.direction,
      reference_id: value.reference_id,
      transaction_type: value.transaction_type,
      category_id: value.category_id,
      category_name: value.category_name,
      classification_group_id: value.classification_group_id,
      classification_group: value.classification_group,
      classification_subgroup_id: value.classification_subgroup_id,
      classification_subgroup: value.classification_subgroup,
      accountId: value.accountId,
    };
  });

  // Ini brarti 2022
  if (params.year === '1') {
    const year = _.filter(superTransaction, ({ dateTimestamp }) => {
      return new Date(dateTimestamp as Date).getFullYear() === 2022;
    });

    monthlyTransactions = _.groupBy(year, ({ dateTimestamp }) => {
      return new Date(dateTimestamp as Date).getMonth();
    });
  }
  // Ini brarti 2023
  else if (params.year === '2') {
    const year = _.filter(superTransaction, ({ dateTimestamp }) => {
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

  const caldata = [
    {
      name: 'Furqon Wilogo',
      title: 'Co-CEO',
      avatar: FurqonAvatar,
      calLink: 'furqon/kudoku',
    },
    {
      name: 'Rizqy Fachri',
      title: 'Co-CEO',
      avatar: RizqyAvatar,
      calLink: 'rizqy-fachri/kudoku',
    },
    {
      name: 'Aldi Megantara',
      title: 'CTO',
      avatar: AldiAvatar,
      calLink: 'aldi-megantara-arifin/30min',
    },
  ];

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
      <div className="flex flex-col gap-4 my-20">
        <h6 className="font-bold text-4xl text-left text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Ada masukan? Saran? Kritik? Request?
        </h6>
        <h6 className="font-medium text-2xl text-left text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Yuk ngobrol sama yang buat BGST
        </h6>
        <div className="flex flex-wrap gap-4">
          {caldata.map((value, index) => {
            return (
              <NgobrolSamaFounder founders={value} user={user} key={index} />
            );
          })}
        </div>
      </div>
    </main>
  );
}
