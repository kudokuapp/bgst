'use client';
import DarkModeToggle from '$lib/DarkModeToggle';
import ThemeContext from '$context/ThemeContext';
import { useContext } from 'react';
import Image from 'next/image';
import '$styles/page.css';
import LogoPrimaryLight from '$public/logo/primary.svg';
import LogoPrimaryDark from '$public/logo/primaryDark.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faX,
  faLock,
  // faRss,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

export function Navbar() {
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <motion.nav
      className="flex justify-between select-none bg-onPrimary dark:bg-onSurfaceVariant border-b-[1px] border-gray-600 dark:border-gray-400 px-4 py-2 rounded-t-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Toaster />
      <div className="flex gap-2 items-center">
        {isDarkTheme ? (
          <Image
            height={18}
            src={LogoPrimaryDark}
            quality={100}
            alt="Kudoku Logo"
            draggable={false}
          />
        ) : (
          <Image
            height={18}
            src={LogoPrimaryLight}
            quality={100}
            alt="Kudoku Logo"
            draggable={false}
          />
        )}
        <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Connect akun kamu
        </p>
      </div>
      <DarkModeToggle />
    </motion.nav>
  );
}

export function Footer() {
  const footnotes = [
    {
      logo: faShieldHalved,
      text: 'Privasi terlindungi.',
    },
    {
      logo: faX,
      text: 'Kami tidak menyimpan User ID dan Password Kamu.',
    },
    {
      logo: faLock,
      text: 'Akses read-only. Kami tidak berwenang melakukan transaksi dari akun Kamu.',
    },
    // {
    //   logo: faRss,
    //   text: 'Menggunakan data aggregator yang bernama Brick.',
    // },
  ];
  return (
    <motion.ul
      className="flex flex-col gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {footnotes.map((value, index) => {
        return (
          <li key={index} className="flex gap-4 items-start">
            <FontAwesomeIcon
              icon={value.logo}
              className="mt-[2px] text-primary dark:text-primaryDark w-[15px] h-[15px]"
            />
            <p className="text-onPrimaryContainer dark:text-onPrimaryContainerDark">
              {value.text}
            </p>
          </li>
        );
      })}
    </motion.ul>
  );
}
