'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import OVO from '$public/logo/bank/ovo.png';
import WaInput from '$lib/WaInput';
import { useState } from 'react';
import { ButtonConnect } from '../bca/[id]/client';
import OtpInput from 'react-otp-input';
import { connectOvoOne, connectOvoTwo } from './promise';
import { toast } from 'react-hot-toast';
import cleanNum from '$utils/helper/cleanNum';
import { useRouter } from 'next/navigation';

interface IData {
  username: string;
  refId: string;
  deviceId: string;
  redirectRefId: string;
  clientId: number;
}

export default function Client({ token }: { token: string }) {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');
  const [link, setLink] = useState('');
  const [progress, setProgress] = useState(1);
  const [data, setData] = useState({} as IData);

  const renderText = () => {
    switch (progress) {
      case 1:
        return (
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Isi nomor hp OVO kamu
          </h6>
        );

      case 2:
        return (
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Tipe SMS apa yang diterima di nomor{' '}
            <strong>{`+62${cleanNum(input)}`}</strong>?
          </h6>
        );

      case 3:
        return (
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Masukkan link dari OVO yang diterima di nomor HP{' '}
            <strong>{`+62${cleanNum(input)}`}</strong>?
          </h6>
        );

      case 4:
        return (
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Silahkan masukkan kode verifikasi OVO di nomor HP{' '}
            <strong>{`+62${cleanNum(input)}`}</strong>?
          </h6>
        );

      case 5:
        return (
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Masukkan PIN OVO kamu!
          </h6>
        );

      default:
        return <p>Error</p>;
    }
  };

  const renderProgress = () => {
    switch (progress) {
      case 1:
        return (
          <div className="max-w-[400px] flex flex-col gap-4">
            <WaInput
              onChange={(e) => {
                setInput(e.target.value);
              }}
              id="nomor-ovo"
              placeholder="Nomor HP OVO"
              value={input}
            />
            <ButtonConnect
              disabled={
                !input || input.length < 9 || !/^08\d|^8\d/g.test(input)
              }
              onClick={handleClickFirst}
            />
          </div>
        );

      case 2:
        return (
          <div className="max-w-[400px] flex flex-col gap-8">
            <button
              className="bg-[#e5e5ea] text-left text-black p-2 rounded-md shadow-md hover:opacity-80"
              onClick={() => setProgress(3)}
            >
              Klik link verifikasi{' '}
              <span className="break-all text-blue-500">
                https://ovo.id/app/login?code=262779b89ef76e64f9b6f13771d1e8a8c490e525a01d04ea8f2875a0a0b3cd
              </span>
              <br />
              Bantuan: <span className="text-blue-500">1500696</span>
            </button>

            <button
              className="bg-[#e5e5ea] text-left text-black p-2 rounded-md shadow-md hover:opacity-80"
              onClick={() => setProgress(4)}
            >
              Kode Verifikasi OVO: <strong className="underline">123456</strong>{' '}
              JANGAN BERIKAN KODE RAHASIA INI KEPADA SIAPA PUN, TERMASUK PIHAK
              YANG MENGAKU DARI OVO Hubungi{' '}
              <span className="text-blue-500">1500696</span> untuk bantuan
            </button>
          </div>
        );

      case 3:
        return (
          <motion.div
            className="max-w-[400px] flex flex-col gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="bg-yellow-300 text-sm text-justify px-2 py-1 rounded-md shadow-sm my-4">
              Copy link dari SMS yang lo terima. Hindari untuk meng-klik link
              dari SMS secara langsung!
            </p>
            <textarea
              id="link"
              rows={4}
              className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://ovo.id/app/login?code=262779b89ef76e64f9b6f13771d1e8a8c490e525a01d04ea8f2875a0a0b3cd"
              onChange={(e) => {
                setLink(e.target.value);
              }}
            />
            <ButtonConnect
              disabled={!link || link.length < 10}
              onClick={() => {
                setProgress(5);
              }}
            />
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            className="max-w-[400px] flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <OtpInput
              placeholder="123456"
              value={otp}
              onChange={setOtp}
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
            <ButtonConnect
              disabled={!otp || otp.length < 4}
              onClick={() => {
                setProgress(5);
              }}
            />
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            className="max-w-[400px] flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <OtpInput
              placeholder="123456"
              value={pin}
              onChange={setPin}
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
            <ButtonConnect
              disabled={!pin || pin.length < 4}
              onClick={handleClickSecond}
            />
          </motion.div>
        );
      default:
        return <p>Error</p>;
    }
  };

  const handleClickFirst = async () => {
    toast
      .promise(connectOvoOne({ username: `+62${cleanNum(input)}`, token }), {
        loading: 'Kirim SMS...',
        success: 'Sukses kirim SMS!',
        error: 'Error kirim SMS',
      })
      .then((data: any) => {
        //ON FULFILLED
        setData({
          username: data.username,
          refId: data.refId,
          deviceId: data.deviceId,
          redirectRefId: data.redirectRefId,
          clientId: data.clientId,
        });
        setProgress(2);
      });
  };

  const handleClickSecond = async () => {
    toast
      .promise(
        connectOvoTwo({
          token,
          username: data.username,
          refId: data.refId,
          deviceId: data.deviceId,
          otpNumber: link.length > 0 ? link : otp,
          pin,
          redirectRefId: data.redirectRefId,
          clientId: data.clientId,
        }),
        {
          loading: 'Connecting...',
          success: 'Sukses!',
          error: 'Error!',
        }
      )
      .then(
        (data: any) => {
          //ON FULFILLED
          router.push(
            `/account/connect/ovo/detail/${data.accessToken}/${data.userId}/${data.institutionId}`
          );
        },
        () => {
          router.push('/account/fail');
        }
      );
  };
  return (
    <motion.div
      className="flex flex-col w-full items-center text-center gap-6 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <Image
          src={OVO}
          width={50}
          height={50}
          quality={100}
          alt="OVO Logo"
          draggable={false}
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          OVO
        </h4>
        {renderText()}
      </div>
      {renderProgress()}
    </motion.div>
  );
}
