'use client';
import '$styles/page.css';
import LogoPrimaryLight from '$public/logo/primary.svg';
import LogoPrimaryDark from '$public/logo/primaryDark.svg';
import LogoSecondaryLight from '$public/logo/secondary.svg';
import LogoSecondaryDark from '$public/logo/secondaryDark.svg';
import DarkModeToggle from '$lib/DarkModeToggle';
import ThemeContext from '$context/ThemeContext';
import { useContext, Fragment, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import LoginButton from '$lib/LoginButton';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import { Dialog, Transition } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export default function Client() {
  const [mobile, setMobile] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  return (
    <>
      {mobile ? (
        <Mobile isDarkTheme={isDarkTheme} />
      ) : (
        <NotMobile isDarkTheme={isDarkTheme} />
      )}
    </>
  );
}

function Mobile({ isDarkTheme }: { isDarkTheme: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <main className="flex w-[100vw] h-fit min-h-[100vh] bg-background dark:bg-onBackground flex-col p-8 justify-between gap-4">
      <motion.nav
        className="flex justify-between select-none bg-background dark:bg-onBackground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <>
          {isDarkTheme ? (
            <Link href="/" className="w-fit h-fit">
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
            <Link href="/" className="w-fit h-fit">
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
        <DarkModeToggle />
      </motion.nav>

      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-1">
          <motion.h1
            className={`${
              isDarkTheme ? 'gradient-text-dark' : 'gradient-text'
            } sm:text-8xl text-6xl font-bold tracking-[-0.15em] w-fit h-fit  sm:ml-[-5px] pr-4 select-none`}
            initial={{ y: -1000 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 100, duration: 1 }}
          >
            BGST
          </motion.h1>
          <motion.p
            className="text-onPrimaryContainer dark:text-surfaceVariant sm:text-2xl text-xl"
            initial={{ x: -1000 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.8 }}
          >
            <span className="font-bold text-primary dark:text-primaryDark">
              B
            </span>
            ayar{' '}
            <span className="font-bold text-primary dark:text-primaryDark">
              G
            </span>
            ajelas{' '}
            <span className="font-bold text-primary dark:text-primaryDark">
              S
            </span>
            etiap{' '}
            <span className="font-bold text-primary dark:text-primaryDark">
              T
            </span>
            ahun
          </motion.p>
        </section>

        <motion.p
          className="sm:text-xl text-lg text-onPrimaryContainer dark:text-surfaceVariant text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Penasaran kan duit yang lo abisin selama ini gimana? BGST&#8482; bakal
          ngerangkum, secara bulanan, pengeluaran dan pemasukan lo di akun{' '}
          <HtmlTooltip
            title={
              <Fragment>
                <p className="text-onPrimaryContainer text-justify text-xs">
                  <ol>
                    <li>BCA</li>
                    <li>Mandiri</li>
                    <li>BNI</li>
                    <li>BSI</li>
                    <li>BRI</li>
                  </ol>
                </p>
              </Fragment>
            }
          >
            <motion.button
              initial={false}
              whileHover={{
                backgroundColor: '#FAFA06',
                scale: 1.05,
              }}
              transition={{
                duration: 0.15,
              }}
              className="px-1.5 rounded-md text-[#0060AF] inline-flex items-center justify-center"
            >
              Bank
            </motion.button>
          </HtmlTooltip>{' '}
          atau{' '}
          <HtmlTooltip
            title={
              <Fragment>
                <p className="text-onPrimaryContainer text-justify text-xs">
                  <ol>
                    <li>Gopay</li>
                    <li>OVO</li>
                    <li>Shopee Pay</li>
                  </ol>
                </p>
              </Fragment>
            }
          >
            <motion.button
              initial={false}
              whileHover={{
                backgroundColor: '#FAFA06',
                scale: 1.05,
              }}
              transition={{
                duration: 0.15,
              }}
              className="px-1.5 rounded-md text-[#1BAC4B] inline-flex items-center justify-center"
            >
              E-Wallet
            </motion.button>
          </HtmlTooltip>{' '}
          lo.
        </motion.p>

        <motion.p
          className="sm:text-xl text-lg text-onPrimaryContainer dark:text-surfaceVariant text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Pas pertama kali lo connect-in Bank/E-wallet lo, kami bakal ambil
          transaksi lo beberapa bulan ke belakang (tergantung bank). Dan kami
          akan update transaksinya setiap bulan.
        </motion.p>
      </div>

      <motion.div
        className="flex flex-col gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <LoginButton />
          <button
            className="font-bold text-primary dark:text-primaryDark text-lg"
            onClick={openModal}
          >
            Lihat metrics
          </button>
        </div>
        <p className="text-xs text-onPrimaryContainer dark:text-surfaceVariant text-justify">
          Data kamu disediakan oleh PT. Brick Teknologi Indonesia dan dijamin
          keharasiaannya oleh PT. Kudoku Finansial Indonesia.
        </p>
      </motion.div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
            <div className="flex min-h-full items-center justify-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[100vw] h-[100vh] transform overflow-hidden bg-white align-middle">
                  <Dialog.Title className="text-2xl z-[9999999999] absolute w-full flex items-end justify-end pr-4 mt-4 text-red-500 font-bold">
                    <button
                      onClick={closeModal}
                      className="w-fit h-fit rounded-xl flex gap-2 items-center justify-center bg-white shadow-xl px-2 py-1"
                    >
                      Close
                      <FontAwesomeIcon icon={faClose} />
                    </button>
                  </Dialog.Title>
                  <motion.section
                    className="w-full h-full bg-background dark:bg-onBackground z-0 px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      className="w-full h-fit flex flex-col justify-center gap-20"
                      animate={{ x: ['0%', '0%'], y: ['10%', '-90%'] }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: 'reverse',
                        type: 'easeOut',
                      }}
                    >
                      <TotalPengeluaran />
                      <TotalPemasukan />
                      <IncomevsExpense />
                      <Heatmap />
                      <BarangPalingMahal />
                      <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
                        Other metrics coming soon
                      </h6>
                    </motion.div>
                  </motion.section>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}

function NotMobile({ isDarkTheme }: { isDarkTheme: boolean }) {
  return (
    <main className="flex gap-8 relative w-[100vw] h-[100vh] h_ios overflow-hidden">
      {/* Left section */}
      <div className="md:p-8 w-fit min-h-full">
        <section className="bg-onPrimary dark:bg-onSurfaceVariant h-full md:w-full w-fit max-w-[700px] px-8 py-12 rounded-2xl shadow-md flex flex-col justify-between gap-12 z-20 md:static absolute md:m-0 m-4 md:max-h-full max-h-[90vh] overflow-auto">
          <motion.nav
            className="flex justify-between select-none bg-onPrimary dark:bg-onSurfaceVariant"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <>
              {isDarkTheme ? (
                <Link href="/" className="w-fit h-fit">
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
                <Link href="/" className="w-fit h-fit">
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
            <DarkModeToggle />
          </motion.nav>

          <div className="flex flex-col gap-8">
            <section className="flex flex-col gap-1">
              <motion.h1
                className={`${
                  isDarkTheme ? 'gradient-text-dark' : 'gradient-text'
                } sm:text-8xl text-6xl font-bold tracking-[-0.15em] w-fit h-fit  sm:ml-[-5px] pr-4 select-none`}
                initial={{ y: -1000 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100, duration: 1 }}
              >
                BGST
              </motion.h1>
              <motion.p
                className="text-onPrimaryContainer dark:text-surfaceVariant sm:text-2xl text-xl"
                initial={{ x: -1000 }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 100, delay: 0.8 }}
              >
                <span className="font-bold text-primary dark:text-primaryDark">
                  B
                </span>
                ayar{' '}
                <span className="font-bold text-primary dark:text-primaryDark">
                  G
                </span>
                ajelas{' '}
                <span className="font-bold text-primary dark:text-primaryDark">
                  S
                </span>
                etiap{' '}
                <span className="font-bold text-primary dark:text-primaryDark">
                  T
                </span>
                ahun
              </motion.p>
            </section>

            <motion.p
              className="sm:text-xl text-lg text-onPrimaryContainer dark:text-surfaceVariant text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Penasaran kan duit yang lo abisin selama ini gimana? BGST&#8482;
              bakal ngerangkum, secara bulanan, pengeluaran dan pemasukan lo di
              akun{' '}
              <HtmlTooltip
                title={
                  <Fragment>
                    <p className="text-onPrimaryContainer text-justify text-xs">
                      <ol>
                        <li>BCA</li>
                        <li>Mandiri</li>
                        <li>BNI</li>
                        <li>BSI</li>
                        <li>BRI</li>
                      </ol>
                    </p>
                  </Fragment>
                }
              >
                <motion.button
                  initial={false}
                  whileHover={{
                    backgroundColor: '#FAFA06',
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                  className="px-1.5 rounded-md text-[#0060AF] inline-flex items-center justify-center"
                >
                  Bank
                </motion.button>
              </HtmlTooltip>{' '}
              atau{' '}
              <HtmlTooltip
                title={
                  <Fragment>
                    <p className="text-onPrimaryContainer text-justify text-xs">
                      <ol>
                        <li>Gopay</li>
                        <li>OVO</li>
                        <li>Shopee Pay</li>
                      </ol>
                    </p>
                  </Fragment>
                }
              >
                <motion.button
                  initial={false}
                  whileHover={{
                    backgroundColor: '#FAFA06',
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.15,
                  }}
                  className="px-1.5 rounded-md text-[#1BAC4B] inline-flex items-center justify-center"
                >
                  E-Wallet
                </motion.button>
              </HtmlTooltip>{' '}
              lo.
            </motion.p>

            <motion.p
              className="sm:text-xl text-lg text-onPrimaryContainer dark:text-surfaceVariant text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Pas pertama kali lo connect-in Bank/E-wallet lo, kami bakal ambil
              transaksi lo beberapa bulan ke belakang (tergantung bank). Dan
              kami akan update transaksinya setiap bulan.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <LoginButton />
            <p className="text-xs text-onPrimaryContainer dark:text-surfaceVariant text-justify">
              Data kamu disediakan oleh PT. Brick Teknologi Indonesia dan
              dijamin keharasiaannya oleh PT. Kudoku Finansial Indonesia.
            </p>
          </motion.div>
        </section>
      </div>

      {/* Right section */}
      <motion.section
        className="w-full h-full bg-background dark:bg-onBackground md:block md:static absolute z-10 md:mr-2 mr-0 md:px-0 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-full h-fit flex flex-col justify-center items-center gap-20"
          animate={{ x: ['0%', '0%'], y: ['10%', '-90%'] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            type: 'easeOut',
          }}
        >
          <TotalPengeluaran />
          <TotalPemasukan />
          <IncomevsExpense />
          <Heatmap />
          <BarangPalingMahal />
          <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
            Other metrics coming soon
          </h6>
        </motion.div>
      </motion.section>
    </main>
  );
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} arrow placement="top" />
  // eslint-disable-next-line no-unused-vars
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: '#FAFA06',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#FAFA06',
    maxWidth: 220,
    border: '1px solid #FEFE06',
    fontWeight: 400,
  },
}));

function TotalPengeluaran() {
  return (
    <div className="w-fit h-fit flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-primary dark:text-primaryDark text-center">
          TOTAL PENGELUARAN
        </p>
        <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
          Total pengeluaran boncooos lo
        </h6>
      </div>
      <motion.div className="bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark w-fit h-fit px-4 py-8 rounded-3xl shadow-md flex flex-col items-center gap-8 select-none max-w-[545px]">
        <h3 className="text-onPrimary dark:text-onPrimaryDark text-4xl font-bold text-center">
          Rp. 12.000.000
        </h3>
        <div className="flex flex-col justify-center items-center">
          <p className="px-1.5 py-1 font-bold text-primary bg-onPrimary dark:text-primaryDark dark:bg-onPrimaryDark rounded-2xl text-center w-fit h-fit">
            SAMA AJA KAYAK
          </p>
          <div className="rounded-2xl bg-onPrimary dark:bg-onPrimaryDark grid grid-cols-3 w-fit h-fit mt-[-5px] gap-0 px-4 py-2">
            <div className="flex flex-col justify-center items-center border-r px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">0.5</span>x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Honda vario 150
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-x px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">12</span>x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Jeans uniqlo
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-l px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">480</span>x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Rokok filter
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function TotalPemasukan() {
  return (
    <div className="w-fit h-fit flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-primary dark:text-primaryDark text-center">
          TOTAL PEMASUKAN
        </p>
        <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
          Total rejeki dari tuhan
        </h6>
      </div>
      <motion.div className="bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark w-fit h-fit px-4 py-8 rounded-3xl shadow-md flex flex-col items-center gap-8 select-none max-w-[545px]">
        <h3 className="text-onPrimary dark:text-onPrimaryDark text-4xl font-bold text-center">
          Rp. 15.000.000
        </h3>
        <div className="flex flex-col justify-center items-center">
          <p className="px-1.5 py-1 font-bold text-primary bg-onPrimary dark:text-primaryDark dark:bg-onPrimaryDark rounded-2xl text-center w-fit h-fit">
            DIBANDINGIN SAMA
          </p>
          <div className="rounded-2xl bg-onPrimary dark:bg-onPrimaryDark grid grid-cols-3 w-fit h-fit mt-[-5px] gap-0 px-4 py-2">
            <div className="flex flex-col justify-center items-center border-r px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">3</span>x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Gaji PNS
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-x px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">0.24</span>x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Gaji Presiden
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-l px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">100000</span>x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Gaji Pengagguran
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function IncomevsExpense() {
  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} followCursor />
    // eslint-disable-next-line no-unused-vars
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: 'white',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'white',
      maxWidth: 220,
      fontWeight: 600,
      color: 'rgb(44, 94, 168)',
      fontSize: '1.25rem',
    },
  }));
  return (
    <div className="w-fit h-fit flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-primary dark:text-primaryDark text-center">
          INCOME VS EXPENSE
        </p>
        <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
          Gali lubang tutup lubang terooos
        </h6>
      </div>
      <motion.div className="bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark w-full h-fit px-4 py-8 rounded-3xl shadow-md flex flex-col items-center gap-8 select-none max-w-[545px] sm:mx-0 mx-4">
        <h3 className="text-onPrimary dark:text-onPrimaryDark text-4xl font-bold text-center">
          Lo abisin 80% income lo
        </h3>
        <div className="w-full flex flex-col justify-center items-center gap-12">
          <div className="w-full flex flex-col gap-4">
            <HtmlTooltip title={<Fragment>Rp. 15.000.000</Fragment>}>
              <div className="w-[100%] h-[80px] bg-green-500 rounded-[16px] relative overflow-hidden">
                <p className="absolute inset-0 font-bold text-2xl text-green-400 ml-[16px]">
                  PEMASUKAN
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <rect
                    width="100%"
                    height="100%"
                    fill="rgb(34, 197, 94)"
                  ></rect>
                </svg>
              </div>
            </HtmlTooltip>
            <HtmlTooltip title={<Fragment>Rp. 12.000.000</Fragment>}>
              <div className="w-[80%] h-[80px] bg-red-500 rounded-[16px] relative overflow-hidden">
                <p className="absolute inset-0 font-bold text-2xl text-red-400 ml-[16px]">
                  PENGELUARAN
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <rect
                    width="80%"
                    height="100%"
                    fill="rgb(239, 68, 68)"
                  ></rect>
                </svg>
              </div>
            </HtmlTooltip>
          </div>
          <div className="rounded-2xl bg-onPrimary dark:bg-onPrimaryDark grid grid-cols-2 w-full h-fit mt-[-5px] gap-0 px-4 py-2">
            <div className="flex flex-col justify-center items-center border-r px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                Rp. <span className="font-bold">15.000.000</span>
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Total pemasukan
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-l px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                Rp. <span className="font-bold">12.000.000</span>
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Total pengeluaran
              </p>
            </div>
          </div>
        </div>
      </motion.div>
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
    <span className="w-fit h-fit flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-primary dark:text-primaryDark text-center">
          TOTAL TRANSAKSI
        </p>
        <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
          Berapa kali lo abisin duit lo dan gimana
        </h6>
      </div>
      <motion.div className="bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark w-fit h-fit px-4 py-8 rounded-3xl shadow-md select-none max-w-[545px] flex flex-col gap-8">
        <h3 className="text-onPrimary dark:text-onPrimaryDark text-4xl font-bold text-center">
          Di bulan November 2022, lo abisin {`${total}`}x transaksi
        </h3>
        <div className="flex items-center justify-center w-full h-full bg-yellow-200 pl-[50px] rounded-2xl pb-6">
          <div className="w-full h-full">
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
              tooltipDataAttrs={(value: any) => {
                const date = new Date(value.date.toISOString());
                return {
                  'data-tip': `Jumlah transaksi hari ${
                    nameDate[date.getDay()]
                  }, ${date.getDate()} ${nameMonth[date.getMonth()]}: ${
                    value.count
                  }`,
                };
              }}
              showWeekdayLabels={true}
              showMonthLabels={false}
              horizontal={false}
              gutterSize={8}
              showOutOfRangeDays={false}
            />
          </div>
          <ReactTooltip />
        </div>
      </motion.div>
    </span>
  );
}

function BarangPalingMahal() {
  return (
    <div className="w-fit h-fit flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-primary dark:text-primaryDark text-center">
          BARANG PALING MAHAL
        </p>
        <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
          Barang paling mahal bulan ini
        </h6>
      </div>
      <motion.div className="bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark w-fit h-fit px-4 py-8 rounded-3xl shadow-md flex flex-col items-center gap-8 select-none max-w-[545px]">
        <h3 className="text-onPrimary dark:text-onPrimaryDark text-4xl font-bold text-center">
          Rp. 1.230.000
        </h3>
        <h3 className="text-onPrimary dark:text-onPrimaryDark text-lg font-bold text-center truncate w-full px-4 sm:max-w-full max-w-[300px]">
          GoPay Topup #202212192324167000100678737759
        </h3>
        <div className="flex flex-col justify-center items-center">
          <p className="px-1.5 py-1 font-bold text-primary bg-onPrimary dark:text-primaryDark dark:bg-onPrimaryDark rounded-2xl text-center w-fit h-fit">
            DETAIL
          </p>
          <div className="rounded-2xl bg-onPrimary dark:bg-onPrimaryDark grid grid-cols-3 w-fit h-fit mt-[-5px] gap-0 px-4 py-2">
            <div className="flex flex-col justify-center items-center border-r px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">15</span> Nov
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Tanggal beli
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-x px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">10</span>%
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Dari pengeluaran
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-l px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">8</span>%
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Dari pemasukan
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
