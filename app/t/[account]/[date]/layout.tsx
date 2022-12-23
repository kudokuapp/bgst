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
  params: { account: string; date: string };
}) {
  const nextCookies = cookies();
  const token = nextCookies.get('token')?.value;
  let currentAccountNumber = '';

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
      institutionId: value.institutionId,
      accountNumber: value.accountNumber,
    };
  });

  for (let i = 0; i < accounts.length; i++) {
    const element = accounts[i];

    if (
      params.account === 'bca' &&
      (element.institutionId === 2 ||
        element.institutionId === 37 ||
        element.institutionId === 38)
    ) {
      currentAccountNumber = element.accountNumber;
    } else if (params.account === 'gopay' && element.institutionId === 11) {
      currentAccountNumber = element.accountNumber;
    }
  }

  const test = [
    {
      id: 2,
      institutionId: 2,
      accessToken: '123897124',
      accountNumber: '4971037321',
      brick_account_id: '123',
      kudosId: 1,
    },
    {
      id: 2,
      institutionId: 11,
      accessToken: '123897124',
      accountNumber: '+6285171232449',
      brick_account_id: '123',
      kudosId: 1,
    },
  ];
  return (
    <div className="bg-background dark:bg-onBackground">
      <Navbar />
      <NavCard
        account={params.account}
        date={params.date}
        accountNo={currentAccountNumber}
        connectedAccounts={test}
      />
      <main className="w-full h-fit">{children}</main>
      <Footer />
    </div>
  );
}
