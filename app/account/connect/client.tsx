'use client';

import Image from 'next/image';
import '$styles/page.css';
import BCA from '$public/logo/bank/bca.png';
import Gopay from '$public/logo/bank/gojek.png';
import OVO from '$public/logo/bank/ovo.png';
import Dana from '$public/logo/bank/dana.png';
import Shopeepay from '$public/logo/bank/shopee.png';
import Mandiri from '$public/logo/bank/mandiri.png';
import BNI from '$public/logo/bank/bni.png';
import BSI from '$public/logo/bank/bsi.png';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeContext from '$context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';

export default function Client({
  isBca,
  isMandiri,
  isBni,
  isBsi,
  isGopay,
  isOvo,
  isDana,
  isShopeePay,
}: {
  isBca: boolean;
  isMandiri: boolean;
  isBni: boolean;
  isBsi: boolean;
  isGopay: boolean;
  isOvo: boolean;
  isDana: boolean;
  isShopeePay: boolean;
}) {
  const { isDarkTheme } = useContext(ThemeContext);

  const [categories, setCategories] = useState({
    Bank: [
      {
        id: 1,
        logo: BCA,
        name: 'Bank Central Asia',
        subname: 'PT. Bank Central Asia, Tbk.',
        link: 'bca',
        disabled: true,
        connected: isBca,
      },
      {
        id: 2,
        logo: Mandiri,
        name: 'Mandiri',
        subname: 'PT. Bank Mandiri, Tbk.',
        link: 'mandiri',
        disabled: false,
        connected: isMandiri,
      },
      {
        id: 3,
        logo: BNI,
        name: 'BNI',
        subname: 'PT. Bank Negara Indonesia (Persero), Tbk.',
        link: 'bni',
        disabled: false,
        connected: isBni,
      },
      {
        id: 4,
        logo: BSI,
        name: 'BSI',
        subname: 'PT. Bank Syariah Indonesia, Tbk.',
        link: 'bsi',
        disabled: false,
        connected: isBsi,
      },
    ],
    'E-Wallet': [
      {
        id: 1,
        logo: Gopay,
        name: 'Gopay',
        subname: 'PT. Gojek Indonesia',
        link: 'gopay',
        disabled: false,
        connected: isGopay,
      },
      {
        id: 2,
        logo: OVO,
        name: 'OVO',
        subname: 'PT. Visionet Internasional',
        link: 'ovo',
        disabled: false,
        connected: isOvo,
      },
      {
        id: 3,
        logo: Dana,
        name: 'Dana',
        subname: 'PT. Espay Debit Indonesia Koe',
        link: 'dana',
        disabled: true,
        connected: isDana,
      },
      {
        id: 4,
        logo: Shopeepay,
        name: 'Shopee Pay',
        subname: 'PT. Airpay International Indonesia',
        link: 'shopeepay',
        disabled: false,
        connected: isShopeePay,
      },
    ],
  });

  useEffect(() => {
    const banks = categories['Bank'].sort((value) => {
      return value.connected || value.disabled ? 1 : -1;
    });

    const ewallet = categories['E-Wallet'].sort((value) => {
      return value.connected || value.disabled ? 1 : -1;
    });

    setCategories({
      Bank: banks,
      'E-Wallet': ewallet,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((account, idx) => {
            return (
              <Tab.Panel key={idx}>
                <ul className="flex flex-col gap-4 my-8">
                  {account.map((value) => (
                    <li key={value.id} className="w-full relative">
                      <Link
                        href={`${
                          value.connected || value.disabled
                            ? `/account/connect#`
                            : `/account/connect/${value.link}`
                        }`}
                        target="_self"
                      >
                        <button
                          className={`flex gap-4 border-b-[1px] border-gray-600 dark:border-gray-400 pb-4 w-full text-left items-center ${
                            value.connected || value.disabled
                              ? 'cursor-not-allowed opacity-50'
                              : 'cursor-pointer opacity-100'
                          }`}
                          disabled={value.connected || value.disabled}
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
                              value.connected
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
                      {(value.connected || value.disabled) && (
                        <div className="flex flex-col gap-2 absolute right-0 top-2">
                          {value.connected && (
                            <div className="border-[1px] border-green-400 text-green-500 px-3 py-0.5 rounded-sm select-none cursor-not-allowed text-xs">
                              Connected
                            </div>
                          )}

                          {value.disabled && (
                            <div className="border-[1px] border-red-400 text-red-500 px-3 py-0.5 rounded-sm select-none cursor-not-allowed text-xs">
                              Lagi gabisa
                            </div>
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
