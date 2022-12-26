'use client';
import Link from 'next/link';
import ThemeContext from '$context/ThemeContext';
import { Fragment, useContext, useEffect, useState } from 'react';
import '$styles/page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShareNodes,
  faDownload,
  faClose,
  faChevronRight,
  faChevronLeft,
  faRightToBracket,
  faCircleChevronDown,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import LogoPrimaryLight from '$public/logo/primary.svg';
import LogoPrimaryDark from '$public/logo/primaryDark.svg';
import LogoSecondaryLight from '$public/logo/secondary.svg';
import LogoSecondaryDark from '$public/logo/secondaryDark.svg';
import DarkModeToggle from '$lib/DarkModeToggle';
import Image from 'next/image';
import BCA from '$public/logo/bank/bca.png';
import Gopay from '$public/logo/bank/gojek.png';
import { Dialog, Listbox, Transition } from '@headlessui/react';
import { censorLastFour } from '$utils/helper/censorString';
import { month, year, availableMonthArray } from '$utils/helper/dateArray';

export function Navbar() {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <nav className="select-none w-full h-fit">
      <motion.section
        className="max-w-[1400px] p-4 flex justify-between items-center mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <>
          {isDarkTheme ? (
            <Link href="/t" className="w-fit h-fit">
              <Image
                height={30}
                src={LogoSecondaryDark}
                quality={100}
                alt="Kudoku Logo"
                draggable={false}
                className="sm:flex hidden"
              />
              <Image
                height={30}
                src={LogoPrimaryDark}
                quality={100}
                alt="Kudoku Logo"
                draggable={false}
                className="sm:hidden flex"
              />
            </Link>
          ) : (
            <Link href="/t" className="w-fit h-fit">
              <Image
                height={30}
                src={LogoSecondaryLight}
                quality={100}
                alt="Kudoku Logo"
                draggable={false}
                className="sm:flex hidden"
              />
              <Image
                height={30}
                src={LogoPrimaryLight}
                quality={100}
                alt="Kudoku Logo"
                draggable={false}
                className="sm:hidden flex"
              />
            </Link>
          )}
        </>
        <div className="flex gap-4">
          <DarkModeToggle />
          <Link
            className="bg-primary dark:bg-primaryDark text-onPrimary dark:text-onPrimaryDark font-bold px-3.5 py-1.5 rounded-xl shadow-xl inline-flex items-center justify-center gap-2"
            href="/download"
          >
            <FontAwesomeIcon icon={faDownload} />
            Download
          </Link>
        </div>
      </motion.section>
    </nav>
  );
}

export function Footer() {
  const { isDarkTheme } = useContext(ThemeContext);

  function handleCopy() {
    console.log('click');
  }

  return (
    <footer className="w-full h-fit flex flex-col items-center justify-center gap-20">
      <section className="rounded-xl w-fit h-fit shadow-md grid md:grid-cols-2 grid-cols-1 max-w-[1200px] bg-onPrimary dark:bg-onPrimaryDark p-10 justify-between justify-items-end md:mx-0 mx-4">
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h6 className="text-4xl font-bold w-fit h-fit select-none text-onPrimaryContainer dark:text-surfaceVariant">
            Bagikan ke temen-temen lo yang{' '}
            <span
              className={`${
                isDarkTheme ? 'gradient-text-dark' : 'gradient-text'
              } tracking-[-0.15em] sm:ml-[-5px] pr-1`}
            >
              BGST
            </span>{' '}
            juga
          </h6>
          <p className="font-normal text-onPrimaryContainer dark:text-surfaceVariant text-xl">
            Ajak temen lo pake <span>BGST</span>. Saling bandingin, seru-seruan,
            dan siapa tau, khilaf bayar gajelas bareng-bareng.
          </p>
          <button
            className="bg-secondary dark:bg-secondaryDark text-onSecondary dark:text-onSecondaryDark font-bold px-4 py-2 rounded-md shadow-xl flex gap-2 items-center justify-center w-fit select-none"
            onClick={handleCopy}
          >
            <FontAwesomeIcon icon={faShareNodes} />
            Bagikan link BGST
          </button>
          <p className="text-onPrimaryContainer dark:text-surfaceVariant text-xs">
            Kirim email ke{' '}
            <a
              href="mailto:furqon@kudoku.id"
              className="text-underline text-primary dark:text-primaryDark"
            >
              furqon@kudoku.id
            </a>{' '}
            atau{' '}
            <a
              href="mailto:rizqy@kudoku.id"
              className="text-underline text-primary dark:text-primaryDark"
            >
              rizqy@kudoku.id
            </a>{' '}
            buat kasih feedback.
          </p>
        </motion.div>
        <div className="flex w-fit h-fit items-center md:mt-0 mt-12">
          <Card left={true} key={1} onClick={handleCopy} />
          <Card left={false} key={2} onClick={handleCopy} />
        </div>
      </section>
      <section className="bg-primary dark:bg-primaryDark flex items-center justify-center w-full h-fit">
        <Link href="https://kudoku.id" target="_blank">
          <motion.button
            className="text-onPrimary dark:text-onPrimaryDark py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Kunjungi website Kudoku &rarr;
          </motion.button>
        </Link>
      </section>
    </footer>
  );
}

type Account = {
  institutionId: number;
  accountNumber: string;
};

type AvailableArray = {
  id: number;
  value: string;
  available: boolean;
};

export function NavCard({
  account,
  monthParam,
  availableMonth2022BCA,
  availableMonth2022Gopay,
  availableMonth2023BCA,
  availableMonth2023Gopay,
  yearParam,
  connectedAccounts,
  availableYearBCA,
  availableYearGopay,
}: {
  account: string;
  monthParam: string;
  availableMonth2022BCA: string[];
  availableMonth2022Gopay: string[];
  availableMonth2023BCA: string[];
  availableMonth2023Gopay: string[];
  yearParam: string;
  connectedAccounts: Account[];
  availableYearBCA: AvailableArray[];
  availableYearGopay: AvailableArray[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [akun, setAkun] = useState(account);
  const [periodeBulan, setPeriodeBulan] = useState(
    month[Number(monthParam) - 1]
  );
  const [periodeTahun, setPeriodeTahun] = useState(year[Number(yearParam) - 1]);
  const [arrayOfMonthsOptions, setArrayOfMonthsOptions] = useState(
    [] as AvailableArray[]
  );

  const [arrayOfYearOptions, setArrayOfYearOptions] = useState(
    [] as AvailableArray[]
  );

  let isBca = false,
    isGopay = false,
    bcaAccountNumber = undefined,
    gopayAccountNumber = undefined;

  for (let index = 0; index < connectedAccounts.length; index++) {
    const element = connectedAccounts[index];

    if (
      element.institutionId === 2 ||
      element.institutionId === 37 ||
      element.institutionId === 38
    ) {
      isBca = true;
      bcaAccountNumber = element.accountNumber;
    }

    if (element.institutionId === 11) {
      isGopay = true;
      gopayAccountNumber = element.accountNumber;
    }
  }

  const options = [
    {
      _id: 1,
      name: 'BCA',
      logo: BCA,
      alt: 'Logo Bank BCA',
      param: 'bca',
      connected: isBca,
      accountNumber: bcaAccountNumber,
    },
    {
      _id: 2,
      name: 'Gopay',
      logo: Gopay,
      alt: 'Logo Gojek',
      param: 'gopay',
      connected: isGopay,
      accountNumber: gopayAccountNumber,
    },
  ];

  const monthOptions2022BCA = availableMonthArray(availableMonth2022BCA);
  const monthOptions2023BCA = availableMonthArray(availableMonth2023BCA);

  const monthOptions2022Gopay = availableMonthArray(availableMonth2022Gopay);
  const monthOptions2023Gopay = availableMonthArray(availableMonth2023Gopay);

  useEffect(() => {
    if (akun === 'bca' || account === 'bca') {
      setArrayOfYearOptions(availableYearBCA);
    } else if (akun === 'gopay' || account === 'gopay') {
      setArrayOfYearOptions(availableYearGopay);
    }

    if (periodeTahun === '2022') {
      if (akun === 'bca') {
        setArrayOfMonthsOptions(monthOptions2022BCA);
        setPeriodeBulan(
          monthOptions2022BCA.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'gopay') {
        setArrayOfMonthsOptions(monthOptions2022Gopay);
        setPeriodeBulan(
          monthOptions2022Gopay.filter((value) => {
            return value.available;
          })[0].value
        );
      }
    } else if (periodeTahun === '2023') {
      if (akun === 'bca') {
        setArrayOfMonthsOptions(monthOptions2023BCA);
        setPeriodeBulan(
          monthOptions2023BCA.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'gopay') {
        setArrayOfMonthsOptions(monthOptions2023Gopay);
        setPeriodeBulan(
          monthOptions2023Gopay.filter((value) => {
            return value.available;
          })[0].value
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodeTahun, akun]);

  function renderProgress() {
    switch (progress) {
      case 0:
        return (
          <div className="flex flex-col gap-8 mt-4">
            <div className="flex justify-between text-lg text-onPrimaryContainer">
              <p className="font-bold">Akun</p>
              {options
                .filter((value) => value.param === akun)
                .map((value) => (
                  <button
                    className="flex items-center justify-center gap-2"
                    onClick={() => setProgress(1)}
                    key={value._id}
                  >
                    <Image
                      src={value.logo}
                      alt={value.alt}
                      width={18}
                      height={18}
                      draggable={false}
                    />
                    {value.name}{' '}
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      className="text-sm"
                    />
                  </button>
                ))}
            </div>
            <div className="flex justify-between text-lg text-onPrimaryContainer">
              <p className="font-bold">Periode</p>
              <button
                className="flex items-center justify-center gap-2"
                onClick={() => setProgress(2)}
              >
                {periodeBulan}, {periodeTahun}{' '}
                <FontAwesomeIcon icon={faChevronRight} className="text-sm" />
              </button>
            </div>
            <div className="w-full h-fit flex items-end justify-end">
              <Link
                href={`/t/${akun}/${month.indexOf(periodeBulan) + 1}/${
                  year.indexOf(periodeTahun) + 1
                }`}
                className="px-4 py-1 rounded-md shadow-xl bg-primary text-onPrimary text-lg"
              >
                Gaskeun
              </Link>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="mt-10">
            <ul className="flex flex-col gap-8">
              {options.map((value) => {
                return (
                  <li key={value._id}>
                    <button
                      className={`flex gap-4 items-center select-none text-left w-full ${
                        value.connected
                          ? 'hover:bg-gray-300 cursor-pointer'
                          : 'hover:bg-onPrimary cursor-not-allowed'
                      } p-2 rounded-md`}
                      disabled={!value.connected}
                      onClick={() => {
                        setAkun(value.param);
                        setProgress(0);
                      }}
                    >
                      <Image
                        src={value.logo}
                        alt={value.alt}
                        className="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px]"
                        width={50}
                        height={50}
                        draggable={false}
                      />
                      <div className="flex flex-wrap gap-2 justify-between items-center w-full">
                        <div className="text-onPrimaryContainer">
                          <p className="font-bold sm:text-lg text-base">
                            {value.name}
                          </p>
                          <p className="sm:text-base text-sm">
                            {value.connected
                              ? censorLastFour(value.accountNumber as string)
                              : 'Belum terhubung'}
                          </p>
                        </div>
                        {!value.connected && (
                          <Link
                            href="/account/connect"
                            className="px-2 py-1 border-2 border-green-500 rounded-md sm:text-sm bg-green-900 text-white flex gap-2 items-center font-bold text-xs"
                          >
                            Hubungkan
                            <FontAwesomeIcon icon={faRightToBracket} />
                          </Link>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );

      case 2:
        return (
          <div className="flex justify-between gap-2 mt-6">
            <div className="w-72 h-72">
              <Listbox value={periodeBulan} onChange={setPeriodeBulan}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{periodeBulan}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <FontAwesomeIcon icon={faCircleChevronDown} />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {arrayOfMonthsOptions.map((month) => (
                        <Listbox.Option
                          key={month.id}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-amber-100 text-amber-900'
                                : 'text-gray-900'
                            } ${!month.available ? 'opacity-50' : ''}`
                          }
                          value={month.value}
                          disabled={!month.available}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                } ${!month.available ? 'opacity-50' : ''}`}
                              >
                                {month.value}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <FontAwesomeIcon icon={faCheck} />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>

            <div className="w-24 h-fit">
              <Listbox
                value={periodeTahun}
                onChange={(tahun) => {
                  setPeriodeTahun(tahun);
                }}
              >
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{periodeTahun}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <FontAwesomeIcon icon={faCircleChevronDown} />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {arrayOfYearOptions.map((year, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-amber-100 text-amber-900'
                                : 'text-gray-900'
                            } ${!year.available ? 'opacity-50' : ''}`
                          }
                          value={year.value}
                          disabled={!year.available}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                } `}
                              >
                                {year.value}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <FontAwesomeIcon icon={faCheck} />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
        );

      default:
        return <p>Error</p>;
    }
  }

  function renderTitleText() {
    switch (progress) {
      case 1:
        return 'Akun';
      case 2:
        return 'Periode';
      default:
        return '';
    }
  }

  return (
    <>
      <div className="w-full h-fit flex items-center justify-center mt-8">
        <button
          className="bg-onPrimary py-2 px-4 rounded-md shadow-xl flex flex-col gap-2 select-none cursor-pointer"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <section className="flex gap-4 text-lg font-normal">
            <p>{account.toUpperCase()}</p>
            {isBca && account === 'bca' && (
              <p>{censorLastFour(bcaAccountNumber as string)}</p>
            )}
            {isGopay && account === 'gopay' && (
              <p>{censorLastFour(gopayAccountNumber as string)}</p>
            )}
          </section>
          <section className="w-full h-fit flex items-center justify-center">
            <p className="text-center text-lg font-[600]">
              {month[Number(monthParam) - 1]}, {year[Number(yearParam) - 1]}
            </p>
          </section>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-background dark:bg-onBackground bg-opacity-80 dark:bg-opacity-80" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-onPrimary p-6 text-left align-middle shadow-xl transition-all min-h-fit">
                  <Dialog.Title
                    as="div"
                    className={`w-full flex ${
                      progress === 0 ? 'justify-end' : 'justify-between'
                    }`}
                  >
                    {progress !== 0 && (
                      <button
                        className="flex gap-2 items-center justify-center text-onPrimaryContainer"
                        onClick={() => setProgress(0)}
                      >
                        <FontAwesomeIcon
                          icon={faChevronLeft}
                          className="text-sm"
                        />
                        <p className="font-bold text-lg">{renderTitleText()}</p>
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setAkun(account);
                        setPeriodeBulan(month[Number(monthParam) - 1]);
                        setPeriodeTahun(year[Number(yearParam) - 1]);
                        setProgress(0);
                      }}
                      className="rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 w-[30px] h-[30px] flex items-center justify-center text-2xl text-primary"
                    >
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                  </Dialog.Title>

                  {renderProgress()}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function Card({ left, onClick }: { left: boolean; onClick: () => void }) {
  const xtraClassName = left ? 'z-10' : 'z-0 ml-[-60px]';
  const initialObj = left ? { y: -100, x: -100 } : { y: 100, x: 100 };
  const endObj = left ? { rotate: '-10deg' } : { rotate: '10deg' };
  return (
    <motion.div
      className={`min-w-[150px] h-fit bg-gradient-to-r from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark flex flex-col gap-8 shadow-xl rounded-xl p-4 select-none ${xtraClassName}`}
      initial={{ opacity: 0, ...initialObj }}
      whileInView={{ opacity: 1, y: 0, x: 0, ...endObj }}
      transition={{ type: 'spring', duration: 2.5 }}
      viewport={{ once: true }}
    >
      <p className="text-onPrimary dark:text-onPrimaryDark text-lg font-light">
        Khilaf gua
      </p>
      <div className="flex flex-col gap-0">
        <h6 className="sm:text-7xl text-5xl font-bold tracking-[-0.15em] w-fit h-fit sm:ml-[-5px] pr-4 select-none text-onPrimary dark:text-onPrimaryDark">
          BGST
        </h6>
        <p className="text-onPrimary dark:text-onPrimaryDark font-light">
          (<span className="font-bold">B</span>ayar{' '}
          <span className="font-bold">G</span>ajelas{' '}
          <span className="font-bold">S</span>etiap{' '}
          <span className="font-bold">T</span>ahun)
        </p>
      </div>
      <p className="text-onPrimary dark:text-onPrimaryDark font-light">
        Bagikan ke temen lo yang <span className="font-bold">BGST</span>
      </p>
      <button
        className="bg-onPrimary dark:bg-onPrimaryDark text-primary dark:text-primaryDark font-bold py-2 px-2 rounded-md shadow-xl flex gap-2 items-center justify-center"
        onClick={onClick}
      >
        <FontAwesomeIcon icon={faShareNodes} />
        Bagikan link BGST
      </button>
    </motion.div>
  );
}
