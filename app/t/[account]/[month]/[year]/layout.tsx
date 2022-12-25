import { Navbar, Footer, NavCard } from './clientlayout';
import '$styles/globals.css';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import _ from 'lodash';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
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

  if (!user || !user.hasAccount) redirect('/');

  const accounts = (
    await prisma.account.findMany({
      where: { kudosId: user.id },
    })
  ).map((value) => {
    return {
      id: value.id,
      institutionId: value.institutionId,
      accountNumber: value.accountNumber,
    };
  });

  let monthOptions2022BCA: any[] | undefined = undefined,
    monthOptions2022Gopay: any[] | undefined = undefined,
    monthOptions2023BCA: any[] | undefined = undefined,
    monthOptions2023Gopay: any[] | undefined = undefined,
    availableYearBCA = [
      {
        id: 1,
        value: '2022',
        available: false,
      },
      {
        id: 2,
        value: '2023',
        available: false,
      },
    ],
    availableYearGopay = [
      {
        id: 1,
        value: '2022',
        available: false,
      },
      {
        id: 2,
        value: '2023',
        available: false,
      },
    ];

  for (let i = 0; i < accounts.length; i++) {
    const element = accounts[i];

    if (
      element.institutionId === 2 ||
      element.institutionId === 37 ||
      element.institutionId === 38
    ) {
      monthOptions2022BCA = await getAvailableMonth(
        element.institutionId,
        element.id,
        2022
      );

      monthOptions2023BCA = await getAvailableMonth(
        element.institutionId,
        element.id,
        2023
      );
    } else if (element.institutionId === 11) {
      monthOptions2022Gopay = await getAvailableMonth(
        element.institutionId,
        element.id,
        2022
      );

      monthOptions2023Gopay = await getAvailableMonth(
        element.institutionId,
        element.id,
        2023
      );
    }
  }

  if (monthOptions2022BCA !== undefined) {
    if (monthOptions2022BCA.length > 0) {
      availableYearBCA[0].available = true;
    }
  }

  if (monthOptions2023BCA !== undefined) {
    if (monthOptions2023BCA!.length > 0) {
      availableYearBCA[1].available = true;
    }
  }

  if (monthOptions2022Gopay !== undefined) {
    if (monthOptions2022Gopay.length > 0) {
      availableYearGopay[0].available = true;
    }
  }

  if (monthOptions2023Gopay !== undefined) {
    if (monthOptions2023Gopay.length > 0) {
      availableYearGopay[1].available = true;
    }
  }

  return (
    <div className="bg-background dark:bg-onBackground">
      <Navbar />
      <NavCard
        account={params.account}
        connectedAccounts={accounts}
        monthParam={params.month}
        yearParam={params.year}
        availableMonth2022BCA={monthOptions2022BCA ?? []}
        availableMonth2023BCA={monthOptions2023BCA ?? []}
        availableMonth2022Gopay={monthOptions2022Gopay ?? []}
        availableMonth2023Gopay={monthOptions2023Gopay ?? []}
        availableYearBCA={availableYearBCA}
        availableYearGopay={availableYearGopay}
      />
      <main className="w-full h-fit">{children}</main>
      <Footer />
    </div>
  );
}

async function getAvailableMonth(
  institutionId: number,
  accountId: number,
  year: number
) {
  const transactions = await prisma.transaction.findMany({
    where: {
      institution_id: institutionId,
      accountId,
    },
  });

  const yearArray = _.filter(transactions, ({ dateTimestamp }) => {
    return new Date(dateTimestamp as Date).getFullYear() === year;
  });

  return Object.keys(
    _.groupBy(yearArray, ({ dateTimestamp }) => {
      return new Date(dateTimestamp as Date).getMonth();
    })
  );
}
