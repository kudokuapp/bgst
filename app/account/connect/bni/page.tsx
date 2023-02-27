import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Client from './client';
import Image from 'next/image';
import BNI from '$public/logo/bank/bni.png';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import prisma from '$utils/prisma';

export default async function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get('token')?.value;

  if (!token) redirect('/');

  const { email } = jwt.verify(
    token,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  if (!email) redirect('/');

  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) redirect('/');

  const account = await prisma.account.findFirst({
    where: { kudosId: user.id, institutionId: 4 },
  });

  if (account?.expired === false) redirect('/t');

  const expired = account && account.expired === true;

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={BNI}
          width={50}
          height={50}
          quality={100}
          alt={`Bank BNI Logo`}
          draggable={false}
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          BNI Internet Banking
        </h4>
        <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
          Masukkan user ID dan password kamu
        </h6>
      </div>
      <div className="w-full h-fit flex justify-center items-center my-10">
        <Client
          token={token}
          expired={expired ?? false}
          accountId={account ? account.id : null}
        />
      </div>
    </>
  );
}
