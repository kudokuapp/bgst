import { redirect } from 'next/navigation';
import BSI from '$public/logo/bank/bsi.png';
import BSIMobile from '$public/logo/bank/bsimobile.png';
import Image, { StaticImageData } from 'next/image';
import Client from './client';
import { cookies } from 'next/headers';

export default function Page({ params }: any) {
  const { id } = params;

  const nextCookies = cookies();
  const token = nextCookies.get('token');

  if (!token) redirect('/');

  let name: string, srcImage: StaticImageData;

  switch (id) {
    case '26':
      name = 'BSI Internet Banking';
      srcImage = BSI;
      break;
    case '34':
      name = 'BSI Mobile';
      srcImage = BSIMobile;
      break;
    default:
      redirect('/');
  }
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
        <Client id={id as string} token={token!.value} />
      </div>
    </>
  );
}
