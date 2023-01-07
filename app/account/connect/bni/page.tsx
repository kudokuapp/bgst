import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Client from './client';
import Image from 'next/image';
import BNI from '$public/logo/bank/bni.png';

export default function Page() {
  const nextCookies = cookies();
  const token = nextCookies.get('token');

  if (!token) redirect('/');

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
        <Client token={token!.value} />
      </div>
    </>
  );
}
