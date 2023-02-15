'use client';

import PasswordInput from '$lib/PasswordInput';
import TextInput from '$lib/TextInput';
import { useState } from 'react';
import { connectBni } from './promise';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ButtonConnect } from '../bca/[id]/client';

export default function Client({ token }: { token: string }) {
  const router = useRouter();
  const [textInput, setTextInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  function handleClick() {
    toast
      .promise(
        connectBni({
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
      .then(
        (data: any) => {
          //ON FULFILLED
          router.push(
            `/account/connect/bni/detail/${data.accessToken}/${data.userId}/${data.institutionId}`
          );
        },
        () => {
          router.push('/account/fail');
        }
      );
  }

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <TextInput
        placeholder="User ID"
        id="user-id"
        value={textInput}
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
        minLength={3}
      />
      <PasswordInput
        placeholder="Password"
        id="password"
        value={passwordInput}
        onChange={(e) => {
          setPasswordInput(e.target.value);
        }}
        minLength={3}
      />

      <ButtonConnect
        disabled={!textInput || !passwordInput}
        onClick={handleClick}
      />
    </div>
  );
}
