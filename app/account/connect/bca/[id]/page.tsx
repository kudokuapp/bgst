import { redirect } from 'next/navigation';
import KlikBCA from '$public/logo/bank/klikbca.png';
import MyBCA from '$public/logo/bank/mybca.png';
import Image, { StaticImageData } from 'next/image';
import Client from './client';
import { cookies } from 'next/headers';
import prisma from '$utils/prisma';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import { Account } from '@prisma/client';

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

  let srcImage: StaticImageData, name: string, inputSuggest: string;
  switch (id) {
    case '2':
      srcImage = KlikBCA;
      name = 'Klik BCA Internet Banking';
      inputSuggest = 'User ID & PIN';
      account = await prisma.account.findFirst({
        where: { kudosId: user.id, institutionId: 2 },
      });
      break;
    case '37':
      srcImage = MyBCA;
      name = 'MyBCA Internet Banking';
      inputSuggest = 'User ID & Password';
      account = await prisma.account.findFirst({
        where: { kudosId: user.id, institutionId: 37 },
      });
      break;
    case '38':
      srcImage = MyBCA;
      name = 'MyBCA Mobile Banking';
      inputSuggest = 'User ID & Password';
      account = await prisma.account.findFirst({
        where: { kudosId: user.id, institutionId: 38 },
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
          src={srcImage}
          width={50}
          height={50}
          quality={100}
          alt={`${name} Logo`}
          draggable={false}
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          {name}
        </h4>
      </div>
      <Client
        id={id as string}
        token={token}
        expired={expired ?? false}
        accountId={account ? account.id : null}
        inputSuggest={inputSuggest}
      />
    </>
  );
}
