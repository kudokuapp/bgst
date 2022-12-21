'use client';
import Lottie from 'lottie-react';
import animation from '$public/lottie/96085-green-check.json';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Client({
  isBca,
  isGopay,
}: {
  isBca: boolean;
  isGopay: boolean;
}) {
  const renderLink = () => {
    if (isBca) {
      return '/s/bca';
    } else if (isGopay) {
      return '/s/gopay';
    } else {
      return '/';
    }
  };

  const disabled = isBca && isGopay;
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="max-w-[200px] w-fit h-fit">
        <Lottie animationData={animation} loop={false} />
      </div>
      <div className="w-full h-fit flex flex-col gap-4 mt-10">
        <Link href="/account/connect" className="w-full h-fit">
          <motion.button
            className={`text-onPrimary dark:text-onPrimaryDark text-lg rounded-md py-1.5 shadow-lg w-full h-fit font-medium ${
              disabled
                ? 'bg-gray-600 dark:bg-gray-300 cursor-not-allowed'
                : 'bg-primary dark:bg-primaryDark cursor-pointer'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            disabled={disabled}
          >
            Connect akun lain
          </motion.button>
        </Link>

        <Link href={renderLink()} className="w-full h-fit">
          <motion.button
            className="text-primary dark:text-primaryDark text-lg py-1.5 w-full h-fit font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Lanjut
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
