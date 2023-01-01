'use client';

import ThemeContext from '$context/ThemeContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Fragment, useContext, useState } from 'react';
import Image from 'next/image';
import LogoPrimaryLight from '$public/logo/primary.svg';
import LogoPrimaryDark from '$public/logo/primaryDark.svg';
import LogoSecondaryLight from '$public/logo/secondary.svg';
import LogoSecondaryDark from '$public/logo/secondaryDark.svg';
import DarkModeToggle from '$lib/DarkModeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faHouse } from '@fortawesome/free-solid-svg-icons';
import '$styles/page.css';
import {
  faInstagram,
  faLinkedin,
  faTiktok,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import 'react-calendar-heatmap/dist/styles.css';
import satori from 'satori';
import Card from './download';
import { downloadSvgAsPng } from './utils';
import LogoKudoku from '$public/logo/primary.svg';
import LogoBCA from '$public/logo/bank/bca.png';
import LogoGopay from '$public/logo/bank/gojek.png';
import { shortMonth, year } from '$utils/helper/dateArray';
import {
  BarangPalingMahal,
  Heatmap,
  IncomevsExpense,
  TotalPemasukan,
  TotalPengeluaran,
} from './download';

const font = fetch(
  new URL(
    '../../../../../public/fonts/TTInterfaces/TTInterfaces-Bold.ttf',
    import.meta.url
  )
).then((res) => res.arrayBuffer());

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
            href="/t"
          >
            <FontAwesomeIcon icon={faHouse} />
            Ke BGST
          </Link>
        </div>
      </motion.section>
    </nav>
  );
}

export function Heading() {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2 my-8">
      <p className="font-medium text-primary dark:text-primaryDark text-lg">
        SHARE
      </p>
      <p className="font-bold text-onBackground dark:text-surfaceVariant sm:text-6xl text-4xl">
        Laporan{' '}
        <span
          className={`${
            isDarkTheme ? 'gradient-text-dark' : 'gradient-text'
          } tracking-[-0.15em] w-fit h-fit pr-2`}
        >
          BGST
        </span>{' '}
        lo
      </p>
    </div>
  );
}

export type IKudosData = {
  firstName: string;
  kudosNo: string | number;
};

export type IFinansialData = {
  totalIncome: number;
  totalExpense: number;
  heatMap: {
    year: string;
    month: string;
    date: string;
    count: number;
  }[];
  barangPalingMahal: {
    amount: number;
    day: string;
    month: string;
    description: string;
  };
};

export type IParams = {
  account: string;
  year: string;
  month: string;
};

export function MainShare({
  params,
  kudos,
  financialData,
}: {
  params: IParams;
  kudos: IKudosData;
  financialData: IFinansialData;
}) {
  const [socmed, setSocmed] = useState('instagram');

  const options = [
    {
      id: 'total-income',
      value: 'Total Income',
    },
    {
      id: 'total-expense',
      value: 'Total Expense',
    },
    {
      id: 'income-vs-expense',
      value: 'Income vs Expense',
    },
    {
      id: 'expense-heatmap',
      value: 'Expense Heatmap',
    },
    {
      id: 'barang-paling-mahal',
      value: 'Barang Paling Mahal',
    },
  ];

  const [metrics, setMetrics] = useState(
    new Array(options.length)
      .fill(false)
      .map((item, index) => (index === 0 ? !item : item))
  );

  const socmedOptions = [
    {
      name: 'twitter',
      icon: faTwitter,
    },
    {
      name: 'instagram',
      icon: faInstagram,
    },
    {
      name: 'linkedin',
      icon: faLinkedin,
    },
    {
      name: 'tiktok',
      icon: faTiktok,
    },
  ];

  const handleChecked = (position: number) => {
    const updatedCheckedState = metrics.map((item, index) =>
      index === position ? !item : item
    );

    const length = updatedCheckedState.filter((v) => v).length;

    if (length === 0) return;

    setMetrics(updatedCheckedState);

    console.log(length);
  };

  const renderDimension = () => {
    switch (socmed) {
      case 'twitter':
        return {
          width: 1080,
          height: 607,
          maxWidth: 600,
          aspectRatio: '1.78082 / 1',
        };

      case 'linkedin':
        return {
          width: 1080,
          height: 1080,
          maxWidth: 600,
          aspectRatio: '1 / 1',
        };

      case 'instagram':
        return {
          width: 1080,
          height: 1920,
          maxWidth: 400,
          aspectRatio: '0.5625 / 1',
        };

      case 'tiktok':
        return {
          width: 1080,
          height: 1920,
          maxWidth: 400,
          aspectRatio: '0.5625 / 1',
        };

      default:
        return {
          width: 1080,
          height: 1920,
          maxWidth: 400,
          aspectRatio: '0.5625 / 1',
        };
    }
  };

  const handleClick = async () => {
    const svg = await satori(
      <Card
        width={renderDimension().width}
        height={renderDimension().height}
        params={params}
        socmed={socmed}
        arrayOfMetrics={
          metrics as [boolean, boolean, boolean, boolean, boolean]
        }
        kudos={kudos}
        financialData={financialData}
      />,
      {
        width: renderDimension().width,
        height: renderDimension().height,
        fonts: [
          {
            name: 'TTInterfaces',
            data: await font,
          },
        ],
      }
    );
    downloadSvgAsPng(svg);
  };

  return (
    <div className="flex gap-12 w-full h-fit items-end justify-center flex-wrap-reverse select-none">
      {/* Left Section */}

      <motion.div
        className="w-fit h-fit bg-onPrimary flex flex-col border-[1px] dark:border-gray-600 border-gray-300 rounded-xl shadow-xl p-4 sm:mb-0 mb-4 sm:pb-0 pb-4 overflow-hidden justify-between"
        initial={{ width: 0, height: 0, aspectRatio: 0 }}
        animate={{
          width: '100%',
          height: '100%',
          maxWidth: renderDimension().maxWidth,
          aspectRatio: renderDimension().aspectRatio,
        }}
      >
        <div className="w-full h-fit grid grid-cols-3 items-center">
          <div className="flex flex-col gap-0 text-base">
            <p className="m-0 font-bold text-primary">
              {kudos.firstName}{' '}
              <span className="text-onPrimaryContainer">
                #
                <span className="font-bold text-secondary">
                  {kudos.kudosNo}
                </span>
              </span>
            </p>
          </div>
          <div className="w-full h-fit flex justify-center">
            <p className="text-primary font-bold text-base text-center min-w-[130px]">
              {shortMonth[Number(params.month) - 1]}{' '}
              <span className="text-secondary">
                {year[Number(params.year) - 1]}
              </span>
            </p>
          </div>
          <div className="w-full h-fit flex justify-end">
            <Image
              src={LogoKudoku}
              alt="Logo Kudoku"
              height={20}
              className="justify-end"
              draggable={false}
            />
          </div>
        </div>
        <motion.div
          className={`w-full h-fit ${
            socmed !== 'twitter' ? 'flex-col justify-between' : 'justify-end'
          } items-center gap-4 py-2 sm:flex hidden`}
        >
          {metrics.map((item, index) => {
            if (item) {
              switch (index) {
                case 0:
                  return (
                    <motion.div
                      initial={{ x: -1000 }}
                      animate={{ x: 0 }}
                      className="w-full h-fit sm:block hidden"
                      key={index}
                    >
                      <TotalPemasukan totalIncome={financialData.totalIncome} />
                    </motion.div>
                  );

                case 1:
                  return (
                    <motion.div
                      initial={{ x: -1000 }}
                      animate={{ x: 0 }}
                      className="w-full h-fit"
                      key={index}
                    >
                      <TotalPengeluaran
                        totalExpense={financialData.totalExpense}
                      />
                    </motion.div>
                  );

                case 2:
                  return (
                    <motion.div
                      initial={{ x: -1000 }}
                      animate={{ x: 0 }}
                      className="w-full h-fit"
                      key={index}
                    >
                      <IncomevsExpense
                        totalExpense={financialData.totalExpense}
                        totalIncome={financialData.totalIncome}
                      />
                    </motion.div>
                  );

                case 3:
                  return (
                    <motion.div
                      initial={{ x: -1000 }}
                      animate={{ x: 0 }}
                      className="w-full h-fit"
                      key={index}
                    >
                      <Heatmap
                        data={financialData.heatMap}
                        month={Number(params.month)}
                        year={year[Number(params.year) - 1]}
                      />
                    </motion.div>
                  );

                case 4:
                  return (
                    <motion.div
                      initial={{ x: -1000 }}
                      animate={{ x: 0 }}
                      className="w-full h-fit"
                      key={index}
                    >
                      <BarangPalingMahal
                        item={financialData.barangPalingMahal}
                        totalIncome={financialData.totalIncome}
                        totalExpense={financialData.totalExpense}
                      />
                    </motion.div>
                  );

                default:
                  return <p key={index}>Error</p>;
              }
            }
          })}
        </motion.div>

        <p className="w-full h-fit sm:hidden block text-onPrimaryContainer text-center">
          View is unavailable on mobile
        </p>

        <div className="w-full h-fit grid grid-cols-3 items-center">
          <div className="flex gap-2 items-center justify-start w-full h-fit">
            {params.account === 'bca' && (
              <>
                <Image
                  src={LogoBCA}
                  alt="Logo BCA"
                  height={20}
                  draggable={false}
                />
                <p className="text-onPrimaryContainer">BCA</p>
              </>
            )}

            {params.account === 'gopay' && (
              <>
                <Image
                  src={LogoGopay}
                  alt="Logo Gojek"
                  height={20}
                  draggable={false}
                />
                <p className="text-onPrimaryContainer">Gopay</p>
              </>
            )}
          </div>
          <div className="flex items-center justify-center w-full h-fit">
            <p className="text-onPrimaryContainer font-bold">bgst.kudoku.id</p>
          </div>
          <div className="flex items-center justify-end w-full h-fit">
            <p
              className={`gradient-text text-lg font-bold tracking-[-0.15em] w-fit h-fit pr-4`}
            >
              BGST
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right Section */}
      <motion.div
        className="flex flex-col w-fit h-fit bg-onPrimary/80 p-6 max-w-[350px] rounded-2xl gap-12 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col w-fit h-fit gap-2">
          <p className="font-bold text-base text-onPrimaryContainer">
            SHARE ON
          </p>
          <ul className="flex gap-3 m-0">
            {socmedOptions.map((value, index) => {
              return (
                <li key={index}>
                  <input
                    type="radio"
                    value={value.name}
                    name="socmed"
                    id={value.name}
                    className="appearance-none m-0"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      setSocmed((e.target as HTMLInputElement).value);
                      console.log(socmed);
                    }}
                  />
                  <label
                    htmlFor={value.name}
                    className={`text-onPrimary flex items-center justify-center rounded-md text-lg w-[44px] h-[44px] cursor-pointer ${
                      socmed === value.name
                        ? 'bg-onPrimaryContainer'
                        : 'bg-primary'
                    }`}
                  >
                    <FontAwesomeIcon icon={value.icon} />
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex flex-col w-fit h-fit gap-2">
          <p className="font-bold text-base text-onPrimaryContainer">
            PICK UP TO <strong>2</strong> METRICS
          </p>
          <ul className="flex gap-2 m-0 flex-wrap">
            {options.map((value, index) => {
              return (
                <li key={index}>
                  <input
                    type="checkbox"
                    value={value.value}
                    name="metrics"
                    id={value.id}
                    checked={metrics[index]}
                    className="appearance-none m-0"
                    style={{ display: 'none' }}
                    disabled={
                      metrics.filter((v) => v).length === 2 && !metrics[index]
                    }
                    onChange={() => handleChecked(index)}
                  />
                  <label
                    htmlFor={value.id}
                    className={`text-onPrimary rounded-md text-base w-fit h-fit py-2 px-4 text-center flex ${
                      metrics[index] ? 'bg-onPrimaryContainer' : 'bg-primary'
                    } ${
                      metrics.filter((v) => v).length === 2 && !metrics[index]
                        ? 'bg-gray-500 cursor-not-allowed'
                        : 'cursor-pointer'
                    }`}
                  >
                    {value.value}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          className="bg-primary text-onPrimary font-bold px-4 py-2 flex gap-2 w-full h-fit text-lg rounded-md shadow-xl items-center justify-center"
          onClick={handleClick}
        >
          <FontAwesomeIcon icon={faDownload} />
          Download Image
        </button>
      </motion.div>
    </div>
  );
}
