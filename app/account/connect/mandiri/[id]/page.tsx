import { redirect } from 'next/navigation';
import LivinMandiri from '$public/logo/bank/livinmandiri.png';
import Image from 'next/image';
import Client from './client';
import { cookies } from 'next/headers';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import { Account } from '@prisma/client';
import prisma from '$utils/prisma';

export default async function Page({ params }: any) {
  const { id } = params;

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

  let account: Account | null;

  let name: string;

  switch (id) {
    case '3':
      name = "Livin' by Mandiri Internet Banking";
      account = await prisma.account.findFirst({
        where: { kudosId: user.id, institutionId: 3 },
      });
      break;
    case '17':
      name = "Livin' by Mandiri Mobile Banking";
      account = await prisma.account.findFirst({
        where: { kudosId: user.id, institutionId: 17 },
      });
      break;
    default:
      redirect('/');
  }

  if (account?.expired === false) redirect('/t');

  const expired = account && account.expired === true;

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={LivinMandiri}
          width={50}
          height={50}
          quality={100}
          alt={`${name} Logo`}
          draggable={false}
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          {name}
        </h4>
        <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
          Masukkan User ID dan Password kamu
        </h6>
      </div>
      <div className="w-full h-fit flex justify-center items-center my-10">
        <Client
          id={id as string}
          token={token}
          expired={expired ?? false}
          accountId={account ? account.id : null}
        />
      </div>
    </>
  );
}
