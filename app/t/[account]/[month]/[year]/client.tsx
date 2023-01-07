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
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import LogoPrimaryLight from '$public/logo/primary.svg';
import LogoPrimaryDark from '$public/logo/primaryDark.svg';
import LogoSecondaryLight from '$public/logo/secondary.svg';
import LogoSecondaryDark from '$public/logo/secondaryDark.svg';
import DarkModeToggle from '$lib/DarkModeToggle';
import Image, { ImageProps } from 'next/image';
import BCA from '$public/logo/bank/bca.png';
import Gopay from '$public/logo/bank/gojek.png';
import OVO from '$public/logo/bank/ovo.png';
import Dana from '$public/logo/bank/dana.png';
import Shopeepay from '$public/logo/bank/shopee.png';
import Mandiri from '$public/logo/bank/mandiri.png';
import BNI from '$public/logo/bank/bni.png';
import BSI from '$public/logo/bank/bsi.png';
import { Dialog, Listbox, Tab, Transition } from '@headlessui/react';
import { censorLastFour } from '$utils/helper/censorString';
import { month, year, availableMonthArray } from '$utils/helper/dateArray';
import { toast, Toaster } from 'react-hot-toast';
import Cal from '@calcom/embed-react';
import { classNames } from 'app/account/connect/client';

type IParams = {
  account: string;
  year: string;
  month: string;
};

export function Navbar({ params }: { params: IParams }) {
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
            href={`/download/${params.account}/${params.month}/${params.year}`}
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
    toast.promise(navigator.clipboard.writeText('https://bgst.kudoku.id'), {
      loading: 'Copying...',
      success: 'Sukses copy link',
      error: 'Gagal copy link',
    });
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
      <Toaster position="bottom-center" />
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
  availableMonth2023BCA,

  availableMonth2022Mandiri,
  availableMonth2023Mandiri,

  availableMonth2022Bni,
  availableMonth2023Bni,

  availableMonth2022Bsi,
  availableMonth2023Bsi,

  availableMonth2022Gopay,
  availableMonth2023Gopay,

  availableMonth2022Ovo,
  availableMonth2023Ovo,

  availableMonth2022Dana,
  availableMonth2023Dana,

  availableMonth2022Shopeepay,
  availableMonth2023Shopeepay,

  yearParam,
  connectedAccounts,

  availableYearBCA,
  availableYearMandiri,
  availableYearBni,
  availableYearBsi,

  availableYearGopay,
  availableYearOvo,
  availableYearDana,
  availableYearShopeepay,
}: {
  account: string;
  monthParam: string;

  availableMonth2022BCA: string[];
  availableMonth2023BCA: string[];

  availableMonth2022Mandiri: string[];
  availableMonth2023Mandiri: string[];

  availableMonth2022Bni: string[];
  availableMonth2023Bni: string[];

  availableMonth2022Bsi: string[];
  availableMonth2023Bsi: string[];

  availableMonth2022Gopay: string[];
  availableMonth2023Gopay: string[];

  availableMonth2022Ovo: string[];
  availableMonth2023Ovo: string[];

  availableMonth2022Dana: string[];
  availableMonth2023Dana: string[];

  availableMonth2022Shopeepay: string[];
  availableMonth2023Shopeepay: string[];

  yearParam: string;
  connectedAccounts: Account[];

  availableYearBCA: AvailableArray[];
  availableYearMandiri: AvailableArray[];
  availableYearBni: AvailableArray[];
  availableYearBsi: AvailableArray[];

  availableYearGopay: AvailableArray[];
  availableYearOvo: AvailableArray[];
  availableYearDana: AvailableArray[];
  availableYearShopeepay: AvailableArray[];
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
    isMandiri = false,
    isBni = false,
    isBsi = false,
    isGopay = false,
    isOvo = false,
    isDana = false,
    isShopeepay = false,
    bcaAccountNumber = undefined,
    mandiriAccountNumber = undefined,
    bniAccountNumber = undefined,
    bsiAccountNumber = undefined,
    gopayAccountNumber = undefined,
    ovoAccountNumber = undefined,
    danaAccountNumber = undefined,
    shopeepayAccountNumber = undefined;

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

    if (element.institutionId === 3 || element.institutionId === 17) {
      isMandiri = true;
      mandiriAccountNumber = element.accountNumber;
    }

    if (element.institutionId === 4) {
      isBni = true;
      bniAccountNumber = element.accountNumber;
    }

    if (element.institutionId === 26 || element.institutionId === 34) {
      isBsi = true;
      bsiAccountNumber = element.accountNumber;
    }

    if (element.institutionId === 11) {
      isGopay = true;
      gopayAccountNumber = element.accountNumber;
    }

    if (element.institutionId === 12) {
      isOvo = true;
      ovoAccountNumber = element.accountNumber;
    }

    if (element.institutionId === 46) {
      isDana = true;
      danaAccountNumber = element.accountNumber;
    }

    if (element.institutionId === 33) {
      isShopeepay = true;
      shopeepayAccountNumber = element.accountNumber;
    }
  }

  const options = [
    {
      name: 'Gopay',
      logo: Gopay,
      alt: 'Logo Gojek',
      param: 'gopay',
    },
    {
      name: 'OVO',
      logo: OVO,
      alt: 'Logo OVO',
      param: 'ovo',
    },
    {
      name: 'Dana',
      logo: Dana,
      alt: 'Logo Dana',
      param: 'dana',
    },
    {
      name: 'Shopee Pay',
      logo: Shopeepay,
      alt: 'Logo Shopee Pay',
      param: 'shopeepay',
    },
    {
      name: 'BCA',
      logo: BCA,
      alt: 'Logo Bank BCA',
      param: 'bca',
    },
    {
      name: 'Mandiri',
      logo: Mandiri,
      alt: 'Logo Mandiri',
      param: 'mandiri',
    },
    {
      name: 'BNI',
      logo: BNI,
      alt: 'Logo Bank BNI',
      param: 'bni',
    },
    {
      name: 'BSI',
      logo: BSI,
      alt: 'Logo Bank BSI',
      param: 'bsi',
    },
  ];

  const [categories, setCategories] = useState({
    Bank: [
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
        name: 'Mandiri',
        logo: Mandiri,
        alt: 'Logo Mandiri',
        param: 'mandiri',
        connected: isMandiri,
        accountNumber: mandiriAccountNumber,
      },
      {
        _id: 3,
        name: 'BNI',
        logo: BNI,
        alt: 'Logo Bank BNI',
        param: 'bni',
        connected: isBni,
        accountNumber: bniAccountNumber,
      },
      {
        _id: 4,
        name: 'BSI',
        logo: BSI,
        alt: 'Logo Bank BSI',
        param: 'bsi',
        connected: isBsi,
        accountNumber: bsiAccountNumber,
      },
    ],
    'E-Wallet': [
      {
        _id: 1,
        name: 'Gopay',
        logo: Gopay,
        alt: 'Logo Gojek',
        param: 'gopay',
        connected: isGopay,
        accountNumber: gopayAccountNumber,
      },
      {
        _id: 2,
        name: 'OVO',
        logo: OVO,
        alt: 'Logo OVO',
        param: 'ovo',
        connected: isOvo,
        accountNumber: ovoAccountNumber,
      },
      {
        _id: 3,
        name: 'Dana',
        logo: Dana,
        alt: 'Logo Dana',
        param: 'dana',
        connected: isDana,
        accountNumber: danaAccountNumber,
      },
      {
        _id: 4,
        name: 'Shopee Pay',
        logo: Shopeepay,
        alt: 'Logo Shopee Pay',
        param: 'shopeepay',
        connected: isShopeepay,
        accountNumber: shopeepayAccountNumber,
      },
    ],
  });

  useEffect(() => {
    const banks = categories['Bank'].sort(
      (a, b) => Number(b.connected) - Number(a.connected)
    );

    const ewallet = categories['E-Wallet'].sort(
      (a, b) => Number(b.connected) - Number(a.connected)
    );

    setCategories({
      Bank: banks,
      'E-Wallet': ewallet,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const monthOptions2022BCA = availableMonthArray(availableMonth2022BCA);
  const monthOptions2023BCA = availableMonthArray(availableMonth2023BCA);

  const monthOptions2022Mandiri = availableMonthArray(
    availableMonth2022Mandiri
  );
  const monthOptions2023Mandiri = availableMonthArray(
    availableMonth2023Mandiri
  );

  const monthOptions2022Bni = availableMonthArray(availableMonth2022Bni);
  const monthOptions2023Bni = availableMonthArray(availableMonth2023Bni);

  const monthOptions2022Bsi = availableMonthArray(availableMonth2022Bsi);
  const monthOptions2023Bsi = availableMonthArray(availableMonth2023Bsi);

  const monthOptions2022Gopay = availableMonthArray(availableMonth2022Gopay);
  const monthOptions2023Gopay = availableMonthArray(availableMonth2023Gopay);

  const monthOptions2022Ovo = availableMonthArray(availableMonth2022Ovo);
  const monthOptions2023Ovo = availableMonthArray(availableMonth2023Ovo);

  const monthOptions2022Dana = availableMonthArray(availableMonth2022Dana);
  const monthOptions2023Dana = availableMonthArray(availableMonth2023Dana);

  const monthOptions2022Shopeepay = availableMonthArray(
    availableMonth2022Shopeepay
  );
  const monthOptions2023Shopeepay = availableMonthArray(
    availableMonth2023Shopeepay
  );

  useEffect(() => {
    if (akun === 'bca' || account === 'bca') {
      setArrayOfYearOptions(availableYearBCA);
    } else if (akun === 'mandiri' || account === 'mandiri') {
      setArrayOfYearOptions(availableYearMandiri);
    } else if (akun === 'bni' || account === 'bni') {
      setArrayOfYearOptions(availableYearBni);
    } else if (akun === 'bsi' || account === 'bsi') {
      setArrayOfYearOptions(availableYearBsi);
    } else if (akun === 'gopay' || account === 'gopay') {
      setArrayOfYearOptions(availableYearGopay);
    } else if (akun === 'ovo' || account === 'ovo') {
      setArrayOfYearOptions(availableYearOvo);
    } else if (akun === 'dana' || account === 'dana') {
      setArrayOfYearOptions(availableYearDana);
    } else if (akun === 'shopeepay' || account === 'shopeepay') {
      setArrayOfYearOptions(availableYearShopeepay);
    }

    if (periodeTahun === '2022') {
      if (akun === 'bca') {
        setArrayOfMonthsOptions(monthOptions2022BCA);
        setPeriodeBulan(
          monthOptions2022BCA.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'mandiri') {
        setArrayOfMonthsOptions(monthOptions2022Mandiri);
        setPeriodeBulan(
          monthOptions2022Mandiri.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'bni') {
        setArrayOfMonthsOptions(monthOptions2022Bni);
        setPeriodeBulan(
          monthOptions2022Bni.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'bsi') {
        setArrayOfMonthsOptions(monthOptions2022Bsi);
        setPeriodeBulan(
          monthOptions2022Bsi.filter((value) => {
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
      } else if (akun === 'ovo') {
        setArrayOfMonthsOptions(monthOptions2022Ovo);
        setPeriodeBulan(
          monthOptions2022Ovo.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'dana') {
        setArrayOfMonthsOptions(monthOptions2022Dana);
        setPeriodeBulan(
          monthOptions2022Dana.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'shopeepay') {
        setArrayOfMonthsOptions(monthOptions2022Shopeepay);
        setPeriodeBulan(
          monthOptions2022Shopeepay.filter((value) => {
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
      } else if (akun === 'mandiri') {
        setArrayOfMonthsOptions(monthOptions2023Mandiri);
        setPeriodeBulan(
          monthOptions2023Mandiri.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'bni') {
        setArrayOfMonthsOptions(monthOptions2023Bni);
        setPeriodeBulan(
          monthOptions2023Bni.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'bsi') {
        setArrayOfMonthsOptions(monthOptions2023Bsi);
        setPeriodeBulan(
          monthOptions2023Bsi.filter((value) => {
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
      } else if (akun === 'ovo') {
        setArrayOfMonthsOptions(monthOptions2023Ovo);
        setPeriodeBulan(
          monthOptions2023Ovo.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'dana') {
        setArrayOfMonthsOptions(monthOptions2023Dana);
        setPeriodeBulan(
          monthOptions2023Dana.filter((value) => {
            return value.available;
          })[0].value
        );
      } else if (akun === 'shopeepay') {
        setArrayOfMonthsOptions(monthOptions2023Shopeepay);
        setPeriodeBulan(
          monthOptions2023Shopeepay.filter((value) => {
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
                .map((value, index) => (
                  <button
                    className="flex items-center justify-center gap-2"
                    onClick={() => setProgress(1)}
                    key={index}
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
                {Object.values(categories).map((account, idx) => (
                  <Tab.Panel key={idx}>
                    <ul className="flex flex-col gap-4 my-8">
                      {account
                        .sort((value) => {
                          return value.connected ? 1 : -1;
                        })
                        .map((value) => (
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
                                      ? censorLastFour(
                                          value.accountNumber as string
                                        )
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
                        ))}
                    </ul>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
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

            {isMandiri && account === 'mandiri' && (
              <p>{censorLastFour(mandiriAccountNumber as string)}</p>
            )}

            {isBni && account === 'bni' && (
              <p>{censorLastFour(bniAccountNumber as string)}</p>
            )}

            {isBsi && account === 'bsi' && (
              <p>{censorLastFour(bsiAccountNumber as string)}</p>
            )}

            {isGopay && account === 'gopay' && (
              <p>{censorLastFour(gopayAccountNumber as string)}</p>
            )}

            {isOvo && account === 'ovo' && (
              <p>{censorLastFour(ovoAccountNumber as string)}</p>
            )}

            {isDana && account === 'dana' && (
              <p>{censorLastFour(danaAccountNumber as string)}</p>
            )}

            {isShopeepay && account === 'shopeepay' && (
              <p>{censorLastFour(shopeepayAccountNumber as string)}</p>
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

interface IDataPayload {
  id: number;
  firstName: string;
  email: string;
  whatsapp: string;
}

interface IFoundersCal {
  calLink: string;
  name: string;
  title: string;
  avatar: ImageProps['src'];
}

export function NgobrolSamaFounder({
  founders,
  user,
}: {
  founders: IFoundersCal;
  user: IDataPayload;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <motion.button
        type="button"
        animate={{
          opacity: 1,
        }}
        whileHover={{ scale: [null, 1.3, 1.1] }}
        transition={{ duration: 0.5 }}
        onClick={openModal}
        className="w-fit h-fit p-2 rounded-xl shadow-md flex gap-4 items-center bg-primary dark:bg-primaryDark"
      >
        <Image
          src={founders.avatar}
          height={40}
          quality={100}
          alt={`${founders.name} Avatar`}
          draggable={false}
        />
        <div className="flex flex-col items-start">
          <p className="text-base font-medium text-onPrimary dark:text-onPrimaryDark">
            {founders.name}
          </p>
          <p className="text-xs font-medium text-onPrimary dark:text-onPrimaryDark">
            {founders.title}
          </p>
        </div>
      </motion.button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-90" />
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
                <Dialog.Panel
                  className="w-full max-w-xl max-h-[95vh] transform overflow-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  as="div"
                >
                  <Dialog.Title
                    as="div"
                    className="flex justify-end items-center sticky top-0 z-30 rounded-md"
                  >
                    <button
                      className="w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-gray-300 bg-onPrimary"
                      onClick={closeModal}
                    >
                      <FontAwesomeIcon
                        icon={faXmark}
                        className="text-primary text-3xl"
                      />
                    </button>
                  </Dialog.Title>

                  <Cal
                    calLink={founders.calLink}
                    config={{
                      name: `${user.firstName}`,
                      email: `${user.email}`,
                      notes: `Meeting Kudos No. ${user.id} dengan Founder`,
                      theme: 'light',
                    }}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
