import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LottieLoading } from 'app/account/connect/bca/transaction/[accountId]/client';
import { fetchDetailsEWallet } from './fetchdetailewallet';

export default async function Page({
  params,
}: {
  params: { accessToken: string; userId: string; institutionId: string };
}) {
  const { accessToken, userId, institutionId } = params;

  if (!accessToken || !userId || !institutionId) redirect('/t');

  const nextCookies = cookies();
  const token = nextCookies.get('token');

  if (!token) redirect('/');

  fetchDetailsEWallet({
    userId: Number(userId),
    accessToken,
    institutionId: Number(institutionId),
    token: token.value as unknown as string,
  })
    .then((data: any) => {
      redirect(`/account/connect/gopay/transaction/${data.id}`);
    })
    .catch(() => {
      redirect('/account/fail');
    });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center sm:px-0 px-2">
      <LottieLoading />
      <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark max-w-[400px] text-center">
        Lagi ngambil transaksi kamu...
      </p>
      <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark max-w-[400px] text-center">
        Jangan close browser ini!!!
      </p>
    </div>
  );
}
