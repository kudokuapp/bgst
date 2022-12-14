import { redirect } from 'next/navigation';
import KlikBCA from '$public/logo/bank/klikbca.png';
import MyBCA from '$public/logo/bank/mybca.png';
import Image, { StaticImageData } from 'next/image';
import Client from './client';
import { cookies } from 'next/headers';

export default function Page({ params }: any) {
  const { id } = params;

  const nextCookies = cookies();
  const token = nextCookies.get('token');

  if (!token) redirect('/');

  let srcImage: StaticImageData, name: string, inputSuggest: string;
  switch (id) {
    case '2':
      srcImage = KlikBCA;
      name = 'Klik BCA Internet Banking';
      inputSuggest = 'User ID & PIN';
      break;
    case '37':
      srcImage = MyBCA;
      name = 'MyBCA Internet Banking';
      inputSuggest = 'User ID & Password';
      break;
    case '38':
      srcImage = MyBCA;
      name = 'MyBCA Mobile Banking';
      inputSuggest = 'User ID & Password';
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
          Masukkan {inputSuggest} kamu
        </h6>
      </div>
      <div className="w-full h-fit flex justify-center items-center my-10">
        <Client id={id as string} token={token!.value} />
      </div>
    </>
  );
}
