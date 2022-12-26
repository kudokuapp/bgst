'use client';

import ThemeContext from '$context/ThemeContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useContext, useState } from 'react';
import Image from 'next/image';
import LogoPrimaryLight from '$public/logo/primary.svg';
import LogoPrimaryDark from '$public/logo/primaryDark.svg';
import LogoSecondaryLight from '$public/logo/secondary.svg';
import LogoSecondaryDark from '$public/logo/secondaryDark.svg';
import DarkModeToggle from '$lib/DarkModeToggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import '$styles/page.css';
import {
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

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
  const [gambar, setGambar] = useState([]);
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
  return (
    <div className="flex gap-2 flex-wrap-reverse">
      {/* Left Section */}
      <div className="w-[600px] h-[300px] bg-red-500"></div>

      {/* Right Section */}
      <div className="flex flex-col w-fit h-fit bg-onPrimary">
        <div className="flex flex-col w-fit h-fit gap-2">
          <p className="font-medium text-base text-onPrimaryContainer">
            SHARE ON
          </p>
          <ul
            className="flex gap-2 m-0"
            onChange={(e) => {
              setSocmed((e.target as HTMLInputElement).value);
              console.log(socmed);
            }}
          >
            {socmedOptions.map((value, index) => {
              return (
                <li key={index}>
                  <input
                    type="radio"
                    value={value.name}
                    name="socmed"
                    id={value.name}
                    checked={socmed === value.name}
                    className="appearance-none m-0"
                    style={{ display: 'none' }}
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
          <p className="font-medium text-base text-onPrimaryContainer">
            PICK UP TO <strong>3</strong> METRICS
          </p>
          <ul
            className="flex gap-2 m-0"
            onChange={(e) => {
              setSocmed((e.target as HTMLInputElement).value);
              console.log(socmed);
            }}
          >
            {options.map((value, index) => {
              return (
                <li key={index}>
                  <input
                    type="radio"
                    value={value.value}
                    name="socmed"
                    id={value.id}
                    // checked={socmed === value.name}
                    className="appearance-none m-0"
                    style={{ display: 'none' }}
                  />
                  <label
                    htmlFor={value.value}
                    className={`text-onPrimary rounded-md text-lg w-fit h-fit bg-primary cursor-pointer`}
                  >
                    {value.value}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
