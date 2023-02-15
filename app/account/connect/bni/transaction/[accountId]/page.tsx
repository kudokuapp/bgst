import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '$utils/prisma';
import axios from 'axios';
import { LottieLoading } from 'app/account/connect/bca/transaction/[accountId]/client';

export default async function Page({ params }: any) {
  const { accountId } = params;

  if (!accountId) redirect('/t');

  const nextCookies = cookies();
  const token = nextCookies.get('token');

  if (!token) redirect('/');

  const account = await prisma.account.findFirst({ where: { id: accountId } });

  if (!account) redirect('/t');

  fetchTransaction({
    accountId: account.id,
    accessToken: account.accessToken,
    token: token as unknown as string,
  })
    .then(() => {
      redirect('/account/success');
    })
    .catch(() => {
      redirect('/account/fail');
    });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center sm:px-0 px-2">
      <LottieLoading />
      <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark max-w-[400px]">
        Lagi ngambil transaksi kamu... Jangan close browser ini!!!
      </p>
    </div>
  );
}

function fetchTransaction({
  accountId,
  accessToken,
  token,
}: {
  accountId: number;
  accessToken: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/bank/bni/init',
          { accountId, accessToken },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
