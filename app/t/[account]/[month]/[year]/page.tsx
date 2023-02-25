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
import _ from 'lodash';
import { month, shortMonth, year } from '$utils/helper/dateArray';
import { LottieNoData, NgobrolSamaFounder } from './client';
import AldiAvatar from '$public/avatar/aldi.png';
import FurqonAvatar from '$public/avatar/furqon.png';
import RizqyAvatar from '$public/avatar/rizqy.png';
import { getAccountFromParams, getTransaction } from './utils';
import getLastTransaction from '$utils/helper/getLastTransaction';
import moment from 'moment';
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

  const renderPage = () => {
    if (transaction) {
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
          month: `${
            Number(params.month) < 10 ? `0${params.month}` : params.month
          }`,
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
          <IncomevsExpense
            totalIncome={totalIncome}
            totalExpense={totalExpense}
          />
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
                  <NgobrolSamaFounder
                    founders={value}
                    user={user}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        </main>
      );
    } else {
      const today = {
        month: moment().subtract(1, 'M').month(),
        year: moment().subtract(1, 'M').year(),
      };
      return (
        <main className="w-full h-fit my-20 flex flex-col items-center justify-center gap-20 sm:px-0 px-4">
          <LottieNoData />
          <div className="flex flex-col items-center justify-center max-w-[600px] gap-4">
            <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-xl">
              Sumpah yak, gua udah cariin transaksi buat akun{' '}
              {params.account.toUpperCase()} lu bulan{' '}
              {month[Number(params.month) - 1]} {year[Number(params.year) - 1]}{' '}
              dimana-mana gak ketemu jon.
            </p>
            <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-xl">
              Inget yaa jon, buat akun {params.account.toUpperCase()} lo,
              transaksi yang kita ambil itu dari{' '}
              <strong>
                {getLastTransaction(account.createdAt, params.account)}
              </strong>{' '}
              sampe{' '}
              <strong>
                {month[today.month]} {today.year}
              </strong>{' '}
              jon.
            </p>
            <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-xl">
              Kalo lo merasa di bulan ini lo seharusnya ada transaksi, tinggal
              email aja jon sama yang buat aplikasi ini. Bisa ke si{' '}
              <a
                className="text-primary dark:text-primaryDark underline"
                href="mailto:furqon@kudoku.id"
              >
                Furqon
              </a>
              ,{' '}
              <a
                className="text-primary dark:text-primaryDark underline"
                href="mailto:rizqy@kudoku.id"
              >
                Rizqy
              </a>
              , atau{' '}
              <a
                className="text-primary dark:text-primaryDark underline"
                href="mailto:aldi@kudoku.id"
              >
                Aldi
              </a>{' '}
              jon.
            </p>
          </div>
        </main>
      );
    }
  };

  return <>{renderPage()}</>;
}
