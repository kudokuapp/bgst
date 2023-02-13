'use client';
import Lottie from 'lottie-react';
import animation from '$public/lottie/97930-loading.json';

export function LottieLoading() {
  return (
    <div className="max-w-[200px] w-fit h-fit">
      <Lottie animationData={animation} loop={true} />
    </div>
  );
}
