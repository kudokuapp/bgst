'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ShopeePay from '$public/logo/bank/shopee.png';
import WaInput from '$lib/WaInput';
import { useState } from 'react';
import { ButtonConnect } from '../bca/[id]/client';
import {
  connectShopeePayFour,
  connectShopeePayOne,
  connectShopeePayThree,
  connectShopeePayTwo,
} from './promise';
import { toast } from 'react-hot-toast';
import cleanNum from '$utils/helper/cleanNum';
import { useRouter } from 'next/navigation';
import PasswordInput from '$lib/PasswordInput';

interface IData {
  username: string;
  sessionId: string;
  redirectRefId: string;
  clientId: string;
}

export default function Client({ token }: { token: string }) {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const [progress, setProgress] = useState(1);
  const [data, setData] = useState({} as IData);

  const renderText = () => {
    switch (progress) {
      case 1:
        return (
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Isi nomor hp dan password Shopee Pay kamu
          </h6>
        );

      case 2:
        return (
          <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
            Silakan buka link yang lo terima via SMS di nomor HP{' '}
            <strong>{`+62${cleanNum(input)}`}</strong>!
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
              id="nomor-shopeepay"
              placeholder="Nomor HP ShopeePay"
              value={input}
            />
            <PasswordInput
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              minLength={5}
            />
            <ButtonConnect
              disabled={
                !input ||
                input.length < 9 ||
                !/^08\d|^8\d/g.test(input) ||
                !password ||
                password.length < 5
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
            <div className="flex items-start gap-2 select-none">
              <input
                id="check"
                type="checkbox"
                onChange={() => {
                  setCheck(!check);
                }}
                checked={check}
                className="text-blue-600 bg-gray-100 rounded border-gray-300 dark:focus:ring-0 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 mt-1 min-w-[1.25rem] min-h-[1.25rem]"
              />
              <label
                htmlFor="check"
                className="text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                Gua udah klik link dari SMS Shopee
              </label>
            </div>
            <ButtonConnect disabled={!check} onClick={handleClickSecond} />
          </motion.div>
        );

      default:
        return <p>Error</p>;
    }
  };

  const handleClickFirst = async () => {
    toast
      .promise(
        connectShopeePayOne({
          username: `+62${cleanNum(input)}`,
          token,
          password,
        }),
        {
          loading: 'Kirim SMS...',
          success: 'Sukses kirim SMS!',
          error: 'Error kirim SMS',
        }
      )
      .then((data: any) => {
        //ON FULFILLED
        setData({
          username: data.username,
          sessionId: data.sessionId,
          redirectRefId: data.redirectRefId,
          clientId: data.clientId,
        });
        setProgress(2);
      });
  };

  const handleClickSecond = async () => {
    toast
      .promise(
        connectShopeePayTwo({
          username: data.username,
          sessionId: data.sessionId,
          token,
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
          toast
            .promise(
              connectShopeePayThree({
                userId: data.userId,
                institutionId: data.institutionId,
                accessToken: data.accessToken,
                token,
              }),
              {
                loading: 'Ambil akun detail...',
                success: 'Sukses!',
                error: 'Error!',
              }
            )
            .then(
              (data: any) => {
                //ON FULFILLED
                toast
                  .promise(
                    connectShopeePayFour({
                      accountId: data.id,
                      accessToken: data.accessToken,
                      token,
                    }),
                    {
                      loading: 'Ambil transaksi...',
                      success: 'Sukses!',
                      error: 'Error!',
                    }
                  )
                  .then(
                    () => {
                      //ON FULFILLED
                      router.push(`/account/success`);
                    },
                    () => {
                      router.push('/account/fail');
                    }
                  );
              },
              () => {
                router.push('/account/fail');
              }
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
          src={ShopeePay}
          width={50}
          height={50}
          quality={100}
          alt="ShopeePay Logo"
          draggable={false}
        />
        <h4 className="text-xl w-fit h-fit select-none font-bold text-onPrimaryContainer dark:text-onPrimaryContainerDark">
          Shopee Pay
        </h4>
        {renderText()}
      </div>
      {renderProgress()}
    </motion.div>
  );
}
