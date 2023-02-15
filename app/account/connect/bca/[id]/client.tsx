'use client';

import PasswordInput from '$lib/PasswordInput';
import TextInput from '$lib/TextInput';
import { useState } from 'react';
import { connectBca } from './promise';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Client({ id, token }: { id: string; token: string }) {
  const router = useRouter();
  const [textInput, setTextInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  function handleClick() {
    toast
      .promise(
        connectBca({
          institutionId: Number(id),
          username: textInput,
          password: passwordInput,
          token,
        }),
        {
          loading: 'Connecting...',
          success: 'Sukses!',
          error: 'Error!',
        }
      )
      .then((data: any) => {
        //ON FULFILLED
        router.push(
          `/account/connect/bca/detail/${data.accessToken}/${data.userId}/${data.institutionId}`
        );
      });
  }
  switch (id) {
    case '2':
      return (
        <div className="max-w-[400px] flex flex-col gap-4">
          <TextInput
            placeholder="User ID"
            id="user-id"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
            minLength={5}
          />
          <PasswordInput
            placeholder="PIN"
            id="pin"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            minLength={5}
          />

          <ButtonConnect
            disabled={!textInput || !passwordInput}
            onClick={handleClick}
          />
        </div>
      );

    case '37':
      return (
        <div className="max-w-[400px] flex flex-col gap-4">
          <TextInput
            placeholder="User ID"
            id="user-id"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
            minLength={5}
          />
          <PasswordInput
            placeholder="Password"
            id="password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            minLength={5}
          />

          <ButtonConnect
            disabled={!textInput || !passwordInput}
            onClick={handleClick}
          />
        </div>
      );

    case '38':
      return (
        <div className="max-w-[400px] flex flex-col gap-4">
          <TextInput
            placeholder="User ID"
            id="user-id"
            value={textInput}
            onChange={(e) => {
              setTextInput(e.target.value);
            }}
            minLength={5}
          />
          <PasswordInput
            placeholder="Password"
            id="password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.target.value);
            }}
            minLength={5}
          />

          <ButtonConnect
            disabled={!textInput || !passwordInput}
            onClick={handleClick}
          />
        </div>
      );

    default:
      return <p>Error</p>;
  }
}

export function ButtonConnect({
  disabled,
  onClick,
}: {
  disabled: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: any) => void;
}) {
  return (
    <div className="w-full h-fit flex justify-end mt-6">
      <motion.button
        type="button"
        onClick={onClick}
        className={`py-1.5 px-4 cursor-pointer rounded-md shadow-xl font-bold flex gap-2 items-center justify-center text-base select-none ${
          disabled
            ? 'bg-gray-600 dark:bg-gray-300 cursor-not-allowed'
            : 'bg-primary dark:bg-primaryDark cursor-pointer'
        } text-onPrimary dark:text-onPrimaryDark`}
        disabled={disabled}
        animate={{
          opacity: 1,
        }}
        initial={false}
        whileHover={{
          scale: disabled ? 1 : [null, 1.3, 1.1],
        }}
        transition={{ duration: 0.5 }}
      >
        Connect
      </motion.button>
    </div>
  );
}
