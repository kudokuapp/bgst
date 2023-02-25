import { redirect } from 'next/navigation';
import BSI from '$public/logo/bank/bsi.png';
import BSIMobile from '$public/logo/bank/bsimobile.png';
import Image, { StaticImageData } from 'next/image';
import Client from './client';
import { cookies } from 'next/headers';
import * as jwt from 'jsonwebtoken';
import { AuthTokenPayload } from '$utils/auth';
import { Account } from '@prisma/client';

export default async function Page({ params }: any) {
  const { id } = params;

  const nextCookies = cookies();
  const token = nextCookies.get('token')?.value;

  if (!token) redirect('/');

  const { whatsapp } = jwt.verify(
    token,
    process.env.APP_SECRET as string
  ) as AuthTokenPayload;

  if (!whatsapp) redirect('/');

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) redirect('/');

  let account: Account | null;

  let name: string, srcImage: StaticImageData;

  switch (id) {
    case '26':
      name = 'BSI Internet Banking';
      srcImage = BSI;
      account = await prisma.account.findFirst({
        where: { kudosId: user.id, institutionId: 26 },
      });
      break;
    case '34':
      name = 'BSI Mobile';
      srcImage = BSIMobile;
      account = await prisma.account.findFirst({
        where: { kudosId: user.id, institutionId: 34 },
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
        <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
          Masukkan User ID dan Password kamu
        </h6>
      </div>
      <div className="w-full h-fit flex justify-center items-center my-10">
        <Client
          id={id as string}
          token={token}
          expired={expired ?? false}
          accountId={account!.id}
        />
      </div>
    </>
  );
}
