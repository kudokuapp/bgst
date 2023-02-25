'use client';

import PasswordInput from '$lib/PasswordInput';
import TextInput from '$lib/TextInput';
import { useState } from 'react';
import {
  connectBRIOne,
  connectBRIThree,
  connectBRITwo,
  refreshBRIOne,
  refreshBRITwo,
} from './promise';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { ButtonConnect } from '../../bca/[id]/client';
import { Account } from '@prisma/client';

export default function Client({
  id,
  token,
  expired,
  accountId,
}: {
  id: string;
  token: string;
  expired: boolean;
  accountId: number | null;
}) {
  const router = useRouter();
  const [textInput, setTextInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  function handleClick() {
    if (accountId && expired) {
      toast
        .promise(
          refreshBRIOne({
            institutionId: Number(id),
            username: textInput,
            password: passwordInput,
            token,
            accountId,
          }),
          {
            loading: 'Connecting...',
            success: 'Sukses!',
            error: 'Error!',
          }
        )
        .then(
          (DATA: any) => {
            const data = DATA as Account;
            // ON FULFILLED

            toast
              .promise(
                refreshBRITwo({
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
                  // ON FULFILLED
                  router.push(`/account/success`);
                },
                () => {
                  // ON REJECTED
                  router.push('/account/fail');
                }
              );
          },
          () => {
            // ON REJECTED
            router.push('/account/fail');
          }
        );
    } else {
      toast
        .promise(
          connectBRIOne({
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
        .then(
          (data: any) => {
            //ON FULFILLED
            toast
              .promise(
                connectBRITwo({
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
                      connectBRIThree({
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
    }
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
