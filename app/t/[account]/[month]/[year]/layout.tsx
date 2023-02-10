import { Navbar, Footer, NavCard } from './client';
import '$styles/globals.css';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
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

  return (
    <div className="bg-background dark:bg-onBackground">
      <Navbar params={params} />
      <NavCard
        account={params.account}
        connectedAccounts={accounts}
        monthParam={params.month}
        yearParam={params.year}
      />
      <main className="w-full h-fit">{children}</main>
      <Footer />
    </div>
  );
}
