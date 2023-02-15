'use client';
import Lottie from 'lottie-react';
import animation from '$public/lottie/94303-failed.json';
import { useRouter } from 'next/navigation';

export function ButtonLanjut({}: {}) {
  const router = useRouter();

  async function handleClick() {
    router.push('/account/connect');
  }
  return (
    <button
      className="text-onPrimary dark:text-onPrimaryDark text-lg py-1.5 w-full h-fit font-medium text-center bg-primary dark:bg-primaryDark rounded-md shadow-lg"
      onClick={handleClick}
    >
      Connect Akun Lain
    </button>
  );
}

export function LottieFailed() {
  return (
    <div className="max-w-[250px] w-fit h-fit">
      <Lottie animationData={animation} loop={false} />
    </div>
  );
}
