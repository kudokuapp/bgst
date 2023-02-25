'use client';

import Image from 'next/image';
import '$styles/page.css';
import BCA from '$public/logo/bank/bca.png';
import Gopay from '$public/logo/bank/gojek.png';
import OVO from '$public/logo/bank/ovo.png';
import Shopeepay from '$public/logo/bank/shopee.png';
import Mandiri from '$public/logo/bank/mandiri.png';
import BNI from '$public/logo/bank/bni.png';
import BSI from '$public/logo/bank/bsi.png';
import BRI from '$public/logo/bank/bri.png';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeContext from '$context/ThemeContext';
import { useContext, useEffect, useState } from 'react';
import { Tab } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

export default function Client({
  isBca,
  isMandiri,
  isBni,
  isBsi,
  isBri,
  isGopay,
  isOvo,
  isShopeePay,
  isBcaExpired,
  isMandiriExpired,
  isBniExpired,
  isBsiExpired,
  isBriExpired,
  isGopayExpired,
  isOvoExpired,
  isShopeePayExpired,
}: {
  isBca: boolean;
  isMandiri: boolean;
  isBni: boolean;
  isBsi: boolean;
  isBri: boolean;
  isGopay: boolean;
  isOvo: boolean;
  isShopeePay: boolean;
  isBcaExpired: boolean;
  isMandiriExpired: boolean;
  isBniExpired: boolean;
  isBsiExpired: boolean;
  isBriExpired: boolean;
  isGopayExpired: boolean;
  isOvoExpired: boolean;
  isShopeePayExpired: boolean;
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
        disabled: false,
        connected: isBca,
        expired: isBcaExpired,
      },
      {
        id: 2,
        logo: Mandiri,
        name: 'Mandiri',
        subname: 'PT. Bank Mandiri, Tbk.',
        link: 'mandiri',
        disabled: true,
        connected: isMandiri,
        expired: isMandiriExpired,
      },
      {
        id: 3,
        logo: BNI,
        name: 'BNI',
        subname: 'PT. Bank Negara Indonesia (Persero), Tbk.',
        link: 'bni',
        disabled: false,
        connected: isBni,
        expired: isBniExpired,
      },
      {
        id: 4,
        logo: BSI,
        name: 'BSI',
        subname: 'PT. Bank Syariah Indonesia, Tbk.',
        link: 'bsi',
        disabled: false,
        connected: isBsi,
        expired: isBsiExpired,
      },
      {
        id: 5,
        logo: BRI,
        name: 'BRI',
        subname: 'PT. Bank Rakyat Indonesia, Tbk.',
        link: 'bri',
        disabled: false,
        connected: isBri,
        expired: isBriExpired,
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
        expired: isGopayExpired,
      },
      {
        id: 2,
        logo: OVO,
        name: 'OVO',
        subname: 'PT. Visionet Internasional',
        link: 'ovo',
        disabled: false,
        connected: isOvo,
        expired: isOvoExpired,
      },
      {
        id: 3,
        logo: Shopeepay,
        name: 'Shopee Pay',
        subname: 'PT. Airpay International Indonesia',
        link: 'shopeepay',
        disabled: false,
        connected: isShopeePay,
        expired: isShopeePayExpired,
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
                          (value.connected && !value.expired) || value.disabled
                            ? `/account/connect#`
                            : `/account/connect/${value.link}`
                        }`}
                        target="_self"
                      >
                        <button
                          className={`flex gap-4 border-b-[1px] border-gray-600 dark:border-gray-400 pb-4 w-full text-left items-center ${
                            (value.connected && !value.expired) ||
                            value.disabled
                              ? 'cursor-not-allowed opacity-50'
                              : 'cursor-pointer opacity-100'
                          }`}
                          disabled={
                            (value.connected && !value.expired) ||
                            value.disabled
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
                          {value.connected && !value.expired && (
                            <div className="border-[1px] border-green-400 text-green-500 px-3 py-0.5 rounded-md select-none cursor-not-allowed text-xs">
                              Connected
                            </div>
                          )}

                          {value.disabled && (
                            <div className="border-[1px] border-red-400 text-red-500 px-3 py-0.5 rounded-md select-none cursor-not-allowed text-xs">
                              Lagi gabisa
                            </div>
                          )}

                          {value.expired && (
                            <div className="border-[1px] flex gap-2 items-center justify-center border-red-900 bg-red-500 text-white px-3 py-0.5 rounded-md select-none text-xs">
                              Login kembali
                              <FontAwesomeIcon icon={faCircleExclamation} />
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
