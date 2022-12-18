'use client';
import Link from 'next/link';
import ThemeContext from '$context/ThemeContext';
import { useContext } from 'react';
import '$styles/page.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faDownload } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import LogoPrimaryLight from '$public/logo/primary.svg';
import LogoPrimaryDark from '$public/logo/primaryDark.svg';
import LogoSecondaryLight from '$public/logo/secondary.svg';
import LogoSecondaryDark from '$public/logo/secondaryDark.svg';
import DarkModeToggle from '$lib/DarkModeToggle';
import Image from 'next/image';
import BCA from '$public/logo/bank/bca.png';
import Gopay from '$public/logo/bank/gojek.png';

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
            <Link href="/s" className="w-fit h-fit">
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
            <Link href="/s" className="w-fit h-fit">
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
          <button className="bg-primary dark:bg-primaryDark text-onPrimary dark:text-onPrimaryDark font-bold px-3.5 py-1.5 rounded-xl shadow-xl inline-flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faDownload} />
            Download
          </button>
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

export function NavCard({ params }: { params: string }) {
  const data = [
    { name: 'BCA', param: 'bca', image: BCA },
    { name: 'Gopay', param: 'gopay', image: Gopay },
  ];

  return (
    <motion.nav
      className="w-full h-fit flex flex-col items-center justify-center my-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <ul className="flex bg-gray-300 border-2 border-primary gap-4 rounded-xl shadow-xl p-2">
        {data.map((value, index) => {
          const isActive = params === value.param;
          return (
            <motion.li
              key={index}
              className={`${
                isActive
                  ? 'bg-yellow-500 shadow-2xl'
                  : 'bg-transparent shadow-none hover:bg-gray-400'
              } p-2 rounded-lg font-medium`}
              initial={{ y: 0, scale: 1 }}
              animate={{ y: isActive ? -10 : 0, scale: isActive ? 1.1 : 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
            >
              <Link
                href={`/s/${value.param}`}
                target="_self"
                className="flex gap-2 items-center justify-center"
              >
                <Image src={value.image} alt={`${value.name} Logo`} />
                {value.name}
              </Link>
            </motion.li>
          );
        })}
      </ul>
      <motion.div
        className="w-[188.5px] h-fit bg-gray-300"
        initial={{ opacity: 0, y: -55, x: 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1.1 }}
      >
        <p>Account number: 4971037321</p>
      </motion.div>
    </motion.nav>
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
