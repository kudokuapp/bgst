'use client';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import ProgressButton from '$lib/ProgressButton';
import WaInput from '../WaInput';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { checkUserBgst, checkKudos, kirimOtp, verifyOtp } from '../promise';
import cleanNum from '$utils/helper/cleanNum';
import OtpInput from 'react-otp-input';
import type { Percentage } from '$lib/ProgressButton';
import ThemeContext from '$context/ThemeContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import TypeformRegistration from '$lib/TypeformRegistration';

export default function LoginModal({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) {
  const [input, setInput] = useState('');
  const [otpWa, setOtpWa] = useState('');
  const [progress, setProgress] = useState('initial');
  const [bgstConnected, setBgstConnected] = useState(false);
  const [bgst, setBgst] = useState(false);
  const [kudos, setKudos] = useState(false);
  const [lastKudos, setLastKudos] = useState(0);
  const { isDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get('/api/getlastkudos');
      setLastKudos(data);
    })();
  }, []);

  const checkboxData = [
    {
      _id: 1,
      label:
        'Saya mengerti bahwa Kudoku sama sekali tidak bisa melakukan transaksi atas akun Bank/e-wallet saya.',
      htmlId: 'tidak-bisa-transaksi',
    },
    {
      _id: 2,
      label:
        'Saya mengerti bahwa BGST adalah produk dari Kudoku (PT. Kudoku Finansial Indonesia).',
      htmlId: 'bgst-produk-kudoku',
    },
    {
      _id: 3,
      label:
        'Saya mengerti bahwa BGST sewaktu-waktu bisa diberhentikan aplikasinya karena aplikasi utama Kudoku sudah launching.',
      htmlId: 'kudoku-launch',
    },
  ];

  const [checkedState, setCheckedState] = useState(
    new Array(checkboxData.length).fill(false)
  );

  function handleCheckBox(position: number) {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  }

  const renderFromOtp = (): Percentage => {
    if (bgst) {
      if (bgstConnected) {
        return '10%';
      } else {
        return '10%';
      }
    } else {
      if (kudos) {
        return '50%';
      } else {
        return '50%';
      }
    }
  };

  const renderToOtp = (): Percentage => {
    if (bgst) {
      if (bgstConnected) {
        return '90%';
      } else {
        return '70%';
      }
    } else {
      if (kudos) {
        return '60%';
      } else {
        return '60%';
      }
    }
  };

  const handleSendOtpRejection = () => {
    return toast(
      (t) => (
        <div className="flex flex-col">
          <p>
            Nampaknya Kudoku gabisa ngirim OTP karena servernya error. Tolong
            email ke{' '}
            <a
              className="underline text-primary"
              href="mailto:furqon@kudoku.id"
            >
              furqon@kudoku.id
            </a>{' '}
            atau{' '}
            <a className="underline text-primary" href="mailto:rizqy@kudoku.id">
              rizqy@kudoku.id
            </a>{' '}
            untuk kasih tau ini yaa!
          </p>
          <button
            className="bg-primary text-onPrimary py-2 font-bold shadow-xl rounded-lg mt-4"
            onClick={() => toast.dismiss(t.id)}
          >
            Dismiss
          </button>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const renderProgress = () => {
    switch (progress) {
      case 'initial':
        return (
          <>
            <div className="flex flex-col gap-3">
              <WaInput
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                value={input}
              />
              <p className="text-justify text-xs text-onPrimaryContainer dark:text-surfaceVariant">
                Dengan mengisi nomor WhatsApp dan meng-klik tombol lanjut, kamu
                menyadari bahwa kamu telah membaca, mengerti, dan setuju dengan{' '}
                <Link
                  href="https://kudoku.id/terms"
                  target="_blank"
                  className="hover:text-primary dark:hover:text-primaryDark"
                >
                  Syarat dan Ketentuan
                </Link>{' '}
                dan{' '}
                <Link
                  href="https://kudoku.id/privacy"
                  target="_blank"
                  className="hover:text-primary dark:hover:text-primaryDark"
                >
                  Kebijakan Privasi
                </Link>{' '}
                Kudoku (BGST).
              </p>
            </div>

            <ProgressButton
              text="Lanjut"
              disabled={
                !input || !(input.length > 8) || !/^08\d|^8\d/g.test(input)
              }
              onClick={() => {
                toast
                  .promise(checkUserBgst(cleanNum(input)), {
                    loading: 'Loading...',
                    success: 'Kamu sudah jadi user BGST',
                    error: 'Kamu belum jadi user BGST',
                  })
                  .then(
                    (axiosData: any) => {
                      // On fulfilled
                      const hasAccount = axiosData.data.hasAccount;

                      setBgst(true);

                      if (hasAccount) {
                        setBgstConnected(true);

                        toast
                          .promise(kirimOtp(cleanNum(input)), {
                            loading: 'Kirim OTP...',
                            success: 'Sukses kirim OTP',
                            error: 'Kirim OTP Gagal',
                          })
                          .then(
                            () => {
                              //ON FULFILLED
                              setProgress('otp');
                            },
                            () => {
                              //ON REJECTED
                              handleSendOtpRejection();
                            }
                          );
                      } else {
                        setBgstConnected(false);

                        toast
                          .promise(kirimOtp(cleanNum(input)), {
                            loading: 'Kirim OTP...',
                            success: 'Sukses kirim OTP',
                            error: 'Kirim OTP Gagal',
                          })
                          .then(
                            () => {
                              //ON FULFILLED
                              setProgress('otp');
                            },
                            () => {
                              //ON REJECTED
                              handleSendOtpRejection();
                            }
                          );
                      }
                    },
                    () => {
                      // On rejected
                      toast
                        .promise(checkKudos(cleanNum(input)), {
                          loading: 'Loading...',
                          success: 'Kamu sudah jadi Kudos',
                          error: 'Kamu belum jadi Kudos!',
                        })
                        .then(
                          () => {
                            // ON FULFILLED
                            setKudos(true);
                            setProgress('kudos-progress-1');
                          },
                          () => {
                            // ON REJECTED
                            setKudos(false);
                            setProgress('not-kudos-progress-1');
                          }
                        );
                    }
                  );
              }}
              from="0%"
              to="10%"
            />
          </>
        );

      case 'kudos-progress-1':
        return (
          <>
            <h1>Kudos-Progress-1</h1>
            <motion.ul
              className="flex flex-col gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {checkboxData.map((value, index) => {
                return (
                  <ul
                    key={value._id}
                    className="flex items-start gap-2 select-none"
                  >
                    <input
                      id={value.htmlId}
                      type="checkbox"
                      onChange={() => {
                        handleCheckBox(index);
                      }}
                      checked={checkedState[index]}
                      className="text-blue-600 bg-gray-100 rounded border-gray-300 dark:focus:ring-0 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 mt-0.5"
                    />
                    <label
                      htmlFor={value.htmlId}
                      className="text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {value.label}
                    </label>
                  </ul>
                );
              })}
            </motion.ul>
            <ProgressButton
              text="Ngerti bos"
              disabled={
                checkedState.filter((status) => status === true).length !==
                  checkedState.length ||
                checkedState.filter((status) => status === false).length ===
                  checkedState.length
              }
              onClick={() => {
                toast
                  .promise(kirimOtp(cleanNum(input)), {
                    loading: 'Kirim OTP...',
                    success: 'Kirim OTP sukses!',
                    error: 'Servernya error!',
                  })
                  .then(
                    () => {
                      //ON FULFILLED
                      setProgress('otp');
                    },
                    () => {
                      //ON REJECTED
                      handleSendOtpRejection();
                    }
                  );
              }}
              from={kudos ? '10%' : '20%'}
              to="50%"
            />
          </>
        );

      case 'kudos-progress-2':
        return (
          <>
            <h1>kudos-progress-2</h1>
            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h4 className="text-2xl font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark select-none">
                Kamu sudah jadi user{' '}
                <span
                  className={`${
                    isDarkTheme ? 'gradient-text-dark' : 'gradient-text'
                  } tracking-[-0.15em] w-fit h-fit pr-4`}
                >
                  BGST
                </span>
              </h4>
              <div className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-justify flex flex-col gap-4">
                <p>
                  Di BGST, lo bisa dapetin insight tentang pemasukan dan
                  pengeluaran lo secara bulanan.
                </p>
                <p>
                  BGST masih Beta, jadi pasti masih ada bug. BGST juga adalah
                  buatan Kudoku. Anggep aja, BGST itu awal dari aplikasi Kudoku
                  nantinya.
                </p>
                <p>Yuk connect-in akun Bank/E-wallet kamu ke BGST!</p>
              </div>
            </motion.div>
            <ProgressButton
              text="Connect"
              disabled={false}
              onClick={() => {
                // Redirect to Account Page
              }}
              from="60%"
              to="90%"
            />
          </>
        );

      case 'not-kudos-progress-1':
        return (
          <>
            <h1>not-kudos-progress-1</h1>
            <motion.div
              className="flex flex-col gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h4 className="text-2xl font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark select-none">
                Untuk pake{' '}
                <span
                  className={`${
                    isDarkTheme ? 'gradient-text-dark' : 'gradient-text'
                  } tracking-[-0.15em] w-fit h-fit pr-1`}
                >
                  BGST
                </span>{' '}
                kamu harus jadi Kudos!
              </h4>
              <div className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-justify flex flex-col gap-4">
                <p>
                  Ikut waiting list Kudoku dan jadi{' '}
                  <strong className="text-primary dark:text-primaryDark font-medium">
                    Kudos
                  </strong>{' '}
                  cuman isi form{' '}
                  <strong className="text-primary dark:text-primaryDark font-medium">
                    2 menit
                  </strong>{' '}
                  doang!
                </p>
                <p>
                  Kudos adalah panggilan untuk user Kudoku. Lo bisa cek Kudoku
                  itu apa dengan mengunjungi{' '}
                  <a
                    className="underline text-primary dark:text-primaryDark"
                    href="https://kudoku.id"
                    target="_blank"
                    rel="noreferrer"
                  >
                    website kita
                  </a>
                  .
                </p>
                <div className="w-full flex justify-center items-center select-none my-4">
                  <p className="text-onPrimaryContainer dark:text-surfaceVariant">
                    Kamu akan jadi{' '}
                    <span className="px-2 py-1 bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark dark:text-onPrimaryContainer text-surfaceVariant rounded-md shadow-md">
                      Kudos No.{' '}
                      {lastKudos === 0 ? (
                        <svg
                          aria-hidden="true"
                          className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 inline"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      ) : (
                        `${lastKudos + 1}`
                      )}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
            <TypeformRegistration
              whatsapp={`62${cleanNum(input)}`}
              onSubmit={() => {
                setProgress('kudos-progress-1');
              }}
              from="10%"
              to="20%"
            />
          </>
        );

      case 'otp':
        return (
          <>
            <motion.div
              className="flex flex-col gap-3 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h4 className="text-2xl font-medium text-onPrimaryContainer dark:text-surfaceVariant">
                Kudoku udah kirim sms ke{' '}
                <span className="text-primary dark:text-primaryDark">
                  +62{cleanNum(input)}
                </span>
                .
              </h4>
              <p className="text-onPrimaryContainer dark:text-surfaceVariant">
                Masukkan kode otpnya dibawah yaa!
              </p>
              <OtpInput
                placeholder="123123"
                value={otpWa}
                onChange={setOtpWa}
                numInputs={6}
                isInputNum={true}
                containerStyle={
                  'w-full flex flex-row justify-between gap-1 mt-2 font-medium text-xl'
                }
                focusStyle={{ border: '2px solid #BA1B1B', outline: 'none' }}
                inputStyle={{
                  backgroundColor: '#d6e3ff',
                  borderRadius: '0.375rem',
                  padding: '0.5rem',
                  color: '#001a40',
                  width: '100%',
                  maxWidth: '60px',
                  border: '2px solid #d6e3ff',
                }}
              />
            </motion.div>

            <ProgressButton
              text="Cek"
              disabled={!otpWa || !(otpWa.length > 5)}
              onClick={() => {
                console.table({
                  'kudos?': kudos,
                  'bgst con?': bgstConnected,
                  bgst,
                });
                toast
                  .promise(verifyOtp(otpWa, cleanNum(input)), {
                    loading: 'Cek OTP kamu...',
                    success: 'OTP benar!',
                    error: 'OTP salah!',
                  })
                  .then(() => {
                    //ON FULFILLED
                    if (bgst) {
                      if (bgstConnected) {
                        // SEND JWT
                        // REDIRECT TO /s/account
                        console.log('user bgst dan udah connect');
                      } else {
                        // SEND JWT
                        // REDIRECT to connect account page
                        console.log('user bgst tapi belom connect');
                      }
                    } else {
                      // COPY DATABASE users_final to User (BGST)
                      // Send JWT
                      setProgress('kudos-progress-2');
                    }
                  });
              }}
              from={renderFromOtp()}
              to={renderToOtp()}
            />
          </>
        );

      default:
        return (
          <>
            <p>Error!</p>
          </>
        );
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        onClose={() => {
          return;
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background dark:bg-onBackground bg-opacity-70 dark:bg-opacity-70" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-onPrimary dark:bg-onSurfaceVariant p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="div" className="w-full flex justify-end">
                  <Toaster />
                  <button
                    onClick={() => {
                      closeModal();
                      if (progress === 'initial') {
                        setInput('');
                      }
                    }}
                    className="rounded-full dark:hover:bg-gray-500 hover:bg-gray-200 w-[30px] h-[30px] flex items-center justify-center text-2xl text-primary dark:text-primaryDark"
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
  );
}
