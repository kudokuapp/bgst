import { redirect } from 'next/navigation';
import LivinMandiri from '$public/logo/bank/livinmandiri.png';
import Image from 'next/image';
import Client from './client';
import { cookies } from 'next/headers';

export default function Page({ params }: any) {
  const { id } = params;

  const nextCookies = cookies();
  const token = nextCookies.get('token');

  if (!token) redirect('/');

  let name: string;

  switch (id) {
    case '3':
      name = "Livin' by Mandiri Internet Banking";
      break;
    case '17':
      name = "Livin' by Mandiri Mobile Banking";
      break;
    default:
      redirect('/');
  }
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
        <Client id={id as string} token={token!.value} />
      </div>
    </>
  );
}
