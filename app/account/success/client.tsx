'use client';
import Lottie from 'lottie-react';
import animation from '$public/lottie/96085-green-check.json';
import { useRouter } from 'next/navigation';

export function ButtonLanjut({}: {}) {
  const router = useRouter();

  async function handleClick() {
    router.push('/t');
  }
  return (
    <button
      className="text-primary dark:text-primaryDark text-lg py-1.5 w-full h-fit font-medium text-center"
      onClick={handleClick}
    >
      Lanjut
    </button>
  );
}

export function LottieSuccess() {
  return (
    <div className="max-w-[200px] w-fit h-fit">
      <Lottie animationData={animation} loop={false} />
    </div>
  );
}
