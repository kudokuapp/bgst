'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Gojek from '$public/logo/bank/gojek.png';
import WaInput from '$lib/WaInput';
import { useState } from 'react';
import { ButtonConnect } from '../bca/[id]/client';
import OtpInput from 'react-otp-input';
import { connectGopayOne, connectGopayTwo } from './promise';
import { toast } from 'react-hot-toast';
import cleanNum from '$utils/helper/cleanNum';
import { useRouter } from 'next/navigation';

interface IData {
  redirectRefId: string;
  clientId: string;
  sessionId: string;
  uniqueId: string;
  otpToken: string;
  otp: string;
  username: string;
  token: string;
}

export default function Client({ token }: { token: string }) {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [otp, setOtp] = useState('');
  const [progress, setProgress] = useState(1);
  const [data, setData] = useState({} as IData);

  const renderText = () => {
    switch (progress) {
      case 1:
        return (
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Isi nomor hp gopay kamu
          </h6>
        );

      case 2:
        return (
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Masukkan OTP dari Gojek
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
              id="nomor-gojek"
              placeholder="Nomor HP Gopay"
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
          <motion.div
            className="max-w-[400px] flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <OtpInput
              placeholder="1234"
              value={otp}
              onChange={setOtp}
              numInputs={4}
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
      .promise(connectGopayOne({ username: `+62${cleanNum(input)}`, token }), {
        loading: 'Kirim OTP...',
        success: 'Sukses kirim OTP!',
        error: 'Error kirim OTP',
      })
      .then((data: any) => {
        //ON FULFILLED
        setData({
          redirectRefId: data.redirectRefId,
          clientId: data.clientId,
          sessionId: data.clientId,
          uniqueId: data.uniqueId,
          otpToken: data.otpToken,
          otp,
          username: `+62${cleanNum(input)}`,
          token,
        });
        setProgress(2);
      });
  };

  const handleClickSecond = async () => {
    toast
      .promise(connectGopayTwo({ ...data }), {
        loading: 'Connecting...',
        success: 'Sukses!',
        error: 'Error!',
      })
      .then(
        () => {
          //ON FULFILLED
          router.push('/account/success');
        },
        () => {
          //ON REJECTED
          setProgress(1);
          setInput('');
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
          src={Gojek}
          width={50}
          height={50}
          quality={100}
          alt="Gojek Logo"
          draggable={false}
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Gopay
        </h4>
        {renderText()}
      </div>
      {renderProgress()}
    </motion.div>
  );
}
