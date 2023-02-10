'use client';
import { motion } from 'framer-motion';
import BRIINTERNET from '$public/logo/bank/briinternetbanking.png';
import BRIMO from '$public/logo/bank/brimo.png';
import BRI from '$public/logo/bank/bri.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Client() {
  const data = [
    {
      logo: BRIINTERNET,
      name: 'BRI Internet Banking',
      subname: 'Bank Rakyat Indonesia',
      link: '5',
    },
    {
      logo: BRIMO,
      name: 'BRI Mo',
      subname: 'Bank Rakyat Indonesia',
      link: '16',
    },
  ];
  return (
    <motion.div
      className="flex flex-col w-full items-center text-center gap-6 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={BRI}
          width={50}
          height={50}
          quality={100}
          alt="Bank BRI Logo"
          draggable={false}
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Bank Rakyat Indonesia
        </h4>
        <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
          Pilih metode untuk konek ke BRI
        </h6>
      </div>
      <ul className="flex flex-col gap-4 mt-8 w-full h-fit">
        {data.map((value, index) => {
          return (
            <li key={index} className="w-full relative">
              <Link href={`/account/connect/bri/${value.link}`} target="_self">
                <button
                  className={`flex gap-4 border-b-[1px] border-gray-600 dark:border-gray-400 pb-4 w-full text-left items-center `}
                >
                  <Image
                    src={value.logo}
                    alt={`${value.name} Logo`}
                    draggable={false}
                    height={45}
                    width={45}
                    quality={100}
                  />
                  <div className={`flex flex-col gap-0`}>
                    <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark font-medium text-base">
                      {value.name}
                    </p>
                    <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark font-light text-sm">
                      {value.subname}
                    </p>
                  </div>
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
