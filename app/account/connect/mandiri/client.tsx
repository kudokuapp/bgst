'use client';
import { motion } from 'framer-motion';
import Mandiri from '$public/logo/bank/mandiri.png';
import LivinByMandiri from '$public/logo/bank/livinmandiri.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Client() {
  const data = [
    {
      logo: LivinByMandiri,
      name: "Livin' by Mandiri Internet Banking",
      subname: 'Bank Mandiri',
      link: '3',
    },
    {
      logo: LivinByMandiri,
      name: "Livin' by Mandiri Mobile Banking",
      subname: 'Bank Mandiri',
      link: '17',
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
          src={Mandiri}
          width={50}
          height={50}
          quality={100}
          alt="Mandiri Logo"
          draggable={false}
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Mandiri
        </h4>
        <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
          Pilih metode untuk konek ke Mandiri
        </h6>
      </div>
      <ul className="flex flex-col gap-4 mt-8 w-full h-fit">
        {data.map((value, index) => {
          return (
            <li key={index} className="w-full relative">
              <Link
                href={`/account/connect/mandiri/${value.link}`}
                target="_self"
              >
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
