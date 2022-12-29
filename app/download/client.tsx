'use client';

import ThemeContext from '$context/ThemeContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from 'react';
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
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import { styled } from '@mui/material/styles';
import { Tooltip, tooltipClasses, TooltipProps } from '@mui/material';

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

export function MainShare() {
  const [socmed, setSocmed] = useState('twitter');

  const options = [
    {
      id: 'total-income',
      value: 'Total Income',
      length: 1,
    },
    {
      id: 'total-expense',
      value: 'Total Expense',
      length: 1,
    },
    {
      id: 'income-vs-expense',
      value: 'Income vs Expense',
      length: 1,
    },
    {
      id: 'expense-heatmap',
      value: 'Expense Heatmap',
      length: 2,
    },
    {
      id: 'barang-paling-mahal',
      value: 'Barang Paling Mahal',
      length: 1,
    },
  ];

  const [metrics, setMetrics] = useState(
    new Array(options.length)
      .fill(false)
      .map((item, index) => (index === 0 ? !item : item))
  );

  const [metricsLength, setMetricsLength] = useState(1);

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
  ];

  const handleChecked = (position: number) => {
    const updatedCheckedState = metrics.map((item, index) =>
      index === position ? !item : item
    );

    const totalLength = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + options[index].length;
        }
        return sum;
      },
      0
    );

    setMetricsLength(totalLength);

    const length = updatedCheckedState.filter((v) => v).length;

    if (length >= 4 || length === 0) return;

    setMetrics(updatedCheckedState);

    console.log(metrics);
    console.log(metricsLength);
  };

  const renderDimension = () => {
    switch (socmed) {
      case 'twitter':
        return {
          width: 2080,
          height: 1170,
          aspectRatio: '1.78082 / 1',
        };

      case 'linkedin':
        return {
          width: 2400,
          height: 3600,
          aspectRatio: '1 / 1',
        };

      case 'instagram':
        return {
          width: 2160,
          height: 3840,
          aspectRatio: '0.5625 / 1',
        };

      default:
        return {
          width: 2160,
          height: 3840,
          aspectRatio: '1.78082 / 1',
        };
    }
  };
  return (
    <div className="flex gap-2 w-full h-fit items-end justify-center flex-wrap-reverse">
      {/* Left Section */}

      <motion.div
        className="w-fit h-fit max-w-[800px] bg-onPrimary flex flex-col border-[1px] border-gray-500 rounded-xl shadow-xl p-4 overflow-hidden justify-between"
        initial={{ width: 0, height: 0, aspectRatio: 0 }}
        animate={{
          width: '100%',
          height: '100%',
          maxWidth: '600px',
          aspectRatio: renderDimension().aspectRatio,
        }}
      >
        <div className="w-full h-fit flex justify-between items-center">
          <div>
            <p>Furqon</p>
            <p>Kudos No. 1</p>
          </div>
          <p>November, 2022</p>
          <p>Kudoku</p>
        </div>
        <motion.div
          className={`w-full h-fit flex ${
            socmed !== 'twitter' ? 'flex-col justify-between' : 'justify-end'
          } justify-center items-center gap-2`}
        >
          {metrics.map((item, index) => {
            if (item) {
              switch (index) {
                case 0:
                  return (
                    <motion.div
                      initial={{ x: -1000 }}
                      animate={{ x: 0 }}
                      className="w-full h-fit"
                    >
                      <TotalPemasukan />
                    </motion.div>
                  );

                case 1:
                  return (
                    <motion.div
                      initial={{ x: -1000 }}
                      animate={{ x: 0 }}
                      className="w-full h-fit"
                    >
                      <TotalPengeluaran />
                    </motion.div>
                  );

                case 2:
                  return (
                    <motion.div
                      initial={{ x: -1000 }}
                      animate={{ x: 0 }}
                      className="w-full h-fit"
                    >
                      <IncomevsExpense />
                    </motion.div>
                  );

                case 3:
                  return (
                    <motion.div
                      initial={{ x: -1000 }}
                      animate={{ x: 0 }}
                      className="w-full h-fit"
                    >
                      <Heatmap />
                    </motion.div>
                  );

                case 4:
                  return (
                    <motion.div
                      initial={{ x: -1000 }}
                      animate={{ x: 0 }}
                      className="w-full h-fit"
                    >
                      <BarangPalingMahal />
                    </motion.div>
                  );

                default:
                  return <p>Error</p>;
              }
            }
          })}
        </motion.div>

        <div className="w-full h-fit flex justify-between items-center">
          <p>BCA</p>
          <p>bgst.kudoku.id</p>
          <p>BGST</p>
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
            PICK UP TO <strong>3</strong> METRICS
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
                      (metricsLength === 2 && index === 3) ||
                      (!metrics[index] && metricsLength === 3)
                    }
                    onChange={() => handleChecked(index)}
                  />
                  <label
                    htmlFor={value.id}
                    className={`text-onPrimary rounded-md text-base w-fit h-fit cursor-pointer py-2 px-4 text-center flex ${
                      metrics[index] ? 'bg-onPrimaryContainer' : 'bg-primary'
                    } ${
                      (metrics.filter((v) => v).length === 3 &&
                        !metrics[index]) ||
                      (metricsLength === 3 && !metrics[index])
                        ? 'bg-gray-500 cursor-not-allowed'
                        : ''
                    }`}
                  >
                    {value.value}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <Link
          href={`https://w3schools.com/images/myw3schoolsimage.jpg`}
          download={true}
        >
          <button className="bg-primary text-onPrimary font-bold px-4 py-2 flex gap-2 w-full h-fit text-lg rounded-md shadow-xl items-center justify-center">
            <FontAwesomeIcon icon={faDownload} />
            Download Image
          </button>
        </Link>
      </motion.div>
    </div>
  );
}

function TotalPengeluaran() {
  return (
    <div className="w-full h-fit flex flex-col items-center gap-4 bg-gradient-to-br from-primary to-secondary px-4 py-8 rounded-3xl shadow-md select-none">
      <h6 className="text-4xl font-bold text-onPrimaryContainer text-center">
        Total pengeluaran boncos
      </h6>
      <h3 className="text-onPrimary text-4xl font-bold text-center">
        Rp. 12.000.000
      </h3>
      <div className="flex flex-col justify-center items-center">
        <p className="px-1.5 py-1 font-bold text-primary bg-onPrimary rounded-2xl text-center w-fit h-fit">
          SAMA AJA KAYAK
        </p>
        <div className="rounded-2xl bg-onPrimary grid grid-cols-3 w-fit h-fit mt-[-5px] gap-0 px-4 py-2">
          <div className="flex flex-col justify-center items-center border-r px-4 text-center">
            <p className="text-primary m-0 text-base">
              <span className="font-bold">0.5</span>x
            </p>
            <p className="text-primary m-0 text-sm">Honda vario 150</p>
          </div>
          <div className="flex flex-col justify-center items-center border-x px-4 text-center">
            <p className="text-primary m-0 text-base">
              <span className="font-bold">12</span>x
            </p>
            <p className="text-primary m-0 text-sm">Jeans uniqlo</p>
          </div>
          <div className="flex flex-col justify-center items-center border-l px-4 text-center">
            <p className="text-primary m-0 text-base">
              <span className="font-bold">480</span>x
            </p>
            <p className="text-primary m-0 text-sm">Rokok filter</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TotalPemasukan() {
  return (
    <div className="w-full h-fit flex flex-col items-center gap-4 bg-gradient-to-br from-primary to-secondary px-4 py-8 rounded-3xl shadow-md select-none">
      <h6 className="text-4xl font-bold text-onPrimaryContainer text-center">
        Total rejeki dari tuhan
      </h6>
      <h3 className="text-onPrimary text-4xl font-bold text-center">
        Rp. 15.000.000
      </h3>
      <div className="flex flex-col justify-center items-center">
        <p className="px-1.5 py-1 font-bold text-primary bg-onPrimary rounded-2xl text-center w-fit h-fit">
          DIBANDINGIN SAMA
        </p>
        <div className="rounded-2xl bg-onPrimary grid grid-cols-3 w-fit h-fit mt-[-5px] gap-0 px-4 py-2">
          <div className="flex flex-col justify-center items-center border-r px-4 text-center">
            <p className="text-primary m-0 text-base">
              <span className="font-bold">3</span>x
            </p>
            <p className="text-primary m-0 text-sm">Gaji PNS</p>
          </div>
          <div className="flex flex-col justify-center items-center border-x px-4 text-center">
            <p className="text-primary m-0 text-base">
              <span className="font-bold">0.24</span>x
            </p>
            <p className="text-primary m-0 text-sm">Gaji Presiden</p>
          </div>
          <div className="flex flex-col justify-center items-center border-l px-4 text-center">
            <p className="text-primary m-0 text-base">
              <span className="font-bold">100000</span>x
            </p>
            <p className="text-primary m-0 text-sm">Gaji Pengagguran</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function IncomevsExpense() {
  return (
    <div className="w-full h-fit flex flex-col items-center gap-4 bg-gradient-to-br from-primary to-secondary px-4 py-8 rounded-3xl shadow-md select-none">
      <h6 className="text-4xl font-bold text-onPrimaryContainer text-center">
        Gua abisin 80% income gua
      </h6>
      <div className="w-full flex flex-col justify-center items-center gap-6 max-w-[485px]">
        <div className="w-full flex flex-col gap-2">
          {/* Ganti width di w-[100%nya] */}
          <div className="w-[100%] h-[80px] bg-green-500 rounded-[16px] relative overflow-hidden">
            <p className="absolute inset-0 font-bold text-2xl text-green-400 ml-[16px]">
              PEMASUKAN
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <rect width="100%" height="100%" fill="rgb(34, 197, 94)"></rect>
            </svg>
          </div>
          <div className="w-[80%] h-[80px] bg-red-500 rounded-[16px] relative overflow-hidden">
            <p className="absolute inset-0 font-bold text-2xl text-red-400 ml-[16px]">
              PENGELUARAN
            </p>
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
              <rect width="100%" height="100%" fill="rgb(239, 68, 68)"></rect>
            </svg>
          </div>
        </div>
        <div className="rounded-2xl bg-onPrimary grid grid-cols-2 w-full h-fit gap-0 px-4 py-2">
          <div className="flex flex-col justify-center items-center border-r px-4 text-center">
            <p className="text-primary m-0 text-base">
              Rp. <span className="font-bold">15.000.000</span>
            </p>
            <p className="text-primary m-0 text-sm">Total pemasukan</p>
          </div>
          <div className="flex flex-col justify-center items-center border-l px-4 text-center">
            <p className="text-primary m-0 text-base">
              Rp. <span className="font-bold">12.000.000</span>
            </p>
            <p className="text-primary m-0 text-sm">Total pengeluaran</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Heatmap() {
  const [total, setTotal] = useState(0);
  const endMonth = new Date('2022-11-30');
  const startMonth = new Date('2022-10-31');

  function shiftDate(date: string | Date, numDays: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count: number) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const nameDate = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];

  const nameMonth = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const randomValues = getRange(30).map((index) => {
    return {
      date: shiftDate(endMonth, -index),
      count: getRandomInt(0, 9),
    };
  });

  useEffect(() => {
    let totalSum = 0;

    for (const value of randomValues) {
      totalSum += value.count;
    }

    setTotal(totalSum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-fit flex flex-col items-center gap-4 bg-gradient-to-br from-primary to-secondary px-4 py-8 rounded-3xl shadow-md select-none">
      <h6 className="text-4xl font-bold text-onPrimaryContainer text-center max-w-[485px]">
        Di bulan ini, gua abisin {`${total}`}x transaksi
      </h6>
      <div className="w-full h-full bg-yellow-200 rounded-2xl pb-6 max-w-[485px] pl-[50px]">
        <CalendarHeatmap
          startDate={startMonth}
          endDate={endMonth}
          values={randomValues}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            return `color-kudoku-${value.count}`;
          }}
          showWeekdayLabels={true}
          showMonthLabels={false}
          horizontal={false}
          gutterSize={8}
          showOutOfRangeDays={false}
        />
      </div>
    </div>
  );
}

function BarangPalingMahal() {
  return (
    <div className="w-full h-fit flex flex-col items-center gap-4 bg-gradient-to-br from-primary to-secondary px-4 py-8 rounded-3xl shadow-md select-none">
      <h6 className="text-4xl font-bold text-onPrimaryContainer text-center">
        Barang paling mahal bulan ini
      </h6>
      <h3 className="text-onPrimary text-4xl font-bold text-center">
        Rp. 1.230.000
      </h3>
      <div className="flex flex-col justify-center items-center">
        <p className="px-1.5 py-1 font-bold text-primary bg-onPrimary rounded-2xl text-center w-fit h-fit">
          DETAIL
        </p>
        <div className="rounded-2xl bg-onPrimary grid grid-cols-3 w-fit h-fit mt-[-5px] gap-0 px-4 py-2">
          <div className="flex flex-col justify-center items-center border-r px-4 text-center">
            <p className="text-primary m-0 text-base">
              <span className="font-bold">15</span> Nov
            </p>
            <p className="text-primary m-0 text-sm">Tanggal beli</p>
          </div>
          <div className="flex flex-col justify-center items-center border-x px-4 text-center">
            <p className="text-primary m-0 text-base">
              <span className="font-bold">10</span>%
            </p>
            <p className="text-primary m-0 text-sm">Dari pengeluaran</p>
          </div>
          <div className="flex flex-col justify-center items-center border-l px-4 text-center">
            <p className="text-primary m-0 text-base">
              <span className="font-bold">8</span>%
            </p>
            <p className="text-primary m-0 text-sm">Dari pemasukan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
