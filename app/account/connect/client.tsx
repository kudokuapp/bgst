'use client';

import Image from 'next/image';
import '$styles/page.css';
import BCA from '$public/logo/bank/bca.png';
import Gopay from '$public/logo/bank/gojek.png';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeContext from '$context/ThemeContext';
import { useContext } from 'react';

export default function Client({
  arrayOfConnectedBank,
}: {
  arrayOfConnectedBank: ['bca' | null, 'gopay' | null];
}) {
  const { isDarkTheme } = useContext(ThemeContext);
  const data = [
    {
      logo: BCA,
      name: 'Bank Central Asia',
      subname: 'PT. Bank Central Asia, Tbk.',
      link: 'bca',
      disabled: true,
    },
    {
      logo: Gopay,
      name: 'Gopay',
      subname: 'PT. Gojek Indonesia',
      link: 'gopay',
      disabled: false,
    },
  ];
  return (
    <>
      <motion.div
        className="flex flex-col w-full items-center text-center gap-4 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h4
          className={`${
            isDarkTheme ? 'gradient-text-dark' : 'gradient-text'
          } text-3xl font-bold tracking-[-0.15em] w-fit h-fit pr-2 select-none`}
        >
          BGST
        </h4>
        <div className="flex flex-col gap-2">
          <h5 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-xl font-medium">
            Pilih akun Bank/E-wallet kamu
          </h5>
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            buat konekin ke BGST
          </h6>
        </div>
      </motion.div>
      <ul className="flex flex-col gap-4 my-8">
        {data.map((value, index) => {
          return (
            <li key={index} className="w-full relative">
              <Link
                href={`${
                  arrayOfConnectedBank[index] === value.link
                    ? `/s/${value.link}`
                    : `/account/connect/${value.link}`
                }`}
                target="_self"
              >
                <button
                  className={`flex gap-4 border-b-[1px] border-gray-600 dark:border-gray-400 pb-4 w-full text-left items-center ${
                    arrayOfConnectedBank[index] === value.link || value.disabled
                      ? 'cursor-not-allowed opacity-50'
                      : 'cursor-pointer opacity-100'
                  }`}
                  disabled={
                    arrayOfConnectedBank[index] === value.link || value.disabled
                  }
                >
                  <Image
                    src={value.logo}
                    alt={`${value.name} Logo`}
                    draggable={false}
                    height={45}
                    width={45}
                    quality={100}
                  />
                  <div
                    className={`flex flex-col gap-0 ${
                      arrayOfConnectedBank[index] === value.link
                        ? 'sm:max-w-fit max-w-[135px] sm:max-h-fit max-h-[45px] overflow-auto'
                        : 'w-fit h-fit'
                    }`}
                  >
                    <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark font-medium text-base">
                      {value.name}
                    </p>
                    <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark font-light text-sm">
                      {value.subname}
                    </p>
                  </div>
                </button>
              </Link>
              {arrayOfConnectedBank[index] === value.link && (
                <div className="absolute right-0 top-2 border-2 border-green-400 text-green-500 px-3 py-0.5 rounded-sm select-none cursor-not-allowed text-xs">
                  Connected
                </div>
              )}

              {value.disabled && (
                <div className="absolute right-0 top-2 border-2 border-red-400 text-red-500 px-3 py-0.5 rounded-sm select-none cursor-not-allowed text-xs">
                  Lagi gabisa
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
