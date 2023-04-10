'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from './Form';
import Connecting from '$lib/Connecting';
import {
  connectBcaFive,
  connectBcaFour,
  connectBcaOne,
  connectBcaThree,
  connectBcaTwo,
  expiredBcaFour,
  expiredBcaOne,
  expiredBcaThree,
  expiredBcaTwo,
} from './promise';

export default function Client({
  id,
  token,
  expired,
  accountId,
  inputSuggest,
}: {
  id: string;
  token: string;
  expired: boolean;
  accountId: number | null;
  inputSuggest: string;
}) {
  const router = useRouter();
  const [connecting, setConnecting] = useState(false);
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');

  const connect = [
    {
      promiseFn: connectBcaOne({
        institutionId: Number(id),
        username: text,
        password,
        token,
      }),
      isLoadingText: 'Membangun koneksi BCA...',
      isErrorText: 'Error membangun koneksi BCA',
      isSuccessText: 'Sukses membangun koneksi BCA',
      defaultText: 'Menyambungkan dengan BCA',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return connectBcaTwo(param);
      },
      isLoadingText: 'Sedang mengambil detail akun BCA-mu...',
      isErrorText: 'Error mengambil detail akun BCA-mu',
      isSuccessText: 'Sukses mengambil detail akun BCA-mu',
      defaultText: 'Mengambil detail akun BCA-mu',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return connectBcaThree(param);
      },
      isLoadingText: 'Sedang membangun koneksi database Kudoku...',
      isErrorText: 'Error membangun koneksi database Kudoku',
      isSuccessText: 'Sukses membangun koneksi database Kudoku',
      defaultText: 'Membangun koneksi database Kudoku',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return connectBcaFour(param);
      },
      isLoadingText: 'Sedang membaca data transaksi BCA...',
      isErrorText: 'Error membaca data transaksi BCA',
      isSuccessText: 'Sukses membaca data transaksi BCA',
      defaultText: 'Membaca data transaksi BCA',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return connectBcaFive(param);
      },
      isLoadingText: 'Sedang membuat database transaksi Kudoku...',
      isErrorText: 'Error membuat database transaksi Kudoku',
      isSuccessText: 'Sukses membuat database transaksi Kudoku',
      defaultText: 'Membuat database transaksi Kudoku',
    },
  ];

  const refresh = [
    {
      promiseFn: expiredBcaOne({
        accountId: accountId ?? 0,
        institutionId: Number(id),
        username: text,
        password,
        token,
      }),
      isLoadingText: 'Membangun koneksi BCA...',
      isErrorText: 'Error membangun koneksi BCA',
      isSuccessText: 'Sukses membangun koneksi BCA',
      defaultText: 'Menyambungkan dengan BCA',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return expiredBcaTwo(param);
      },
      isLoadingText: 'Sedang membangun koneksi database Kudoku...',
      isErrorText: 'Error membangun koneksi database Kudoku',
      isSuccessText: 'Sukses membangun koneksi database Kudoku',
      defaultText: 'Membangun koneksi database Kudoku',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return expiredBcaThree(param);
      },
      isLoadingText: 'Sedang membaca data transaksi BCA...',
      isErrorText: 'Error membaca data transaksi BCA',
      isSuccessText: 'Sukses membaca data transaksi BCA',
      defaultText: 'Membaca data transaksi BCA',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return expiredBcaFour(param);
      },
      isLoadingText: 'Sedang membuat database transaksi Kudoku...',
      isErrorText: 'Error membuat database transaksi Kudoku',
      isSuccessText: 'Sukses membuat database transaksi Kudoku',
      defaultText: 'Membuat database transaksi Kudoku',
    },
  ];

  if (connecting) {
    return (
      <>
        <Connecting
          promises={expired ? refresh : connect}
          onFulfilled={() => {
            setTimeout(() => {
              router.push('/account/success');
            }, 5000);
          }}
          onRejected={() => {
            setTimeout(() => {
              router.push('/account/fail');
            }, 5000);
          }}
        />
      </>
    );
  } else {
    return (
      <>
        <Form
          id={id}
          inputSuggest={inputSuggest}
          handleClick={() => {
            setConnecting(true);
          }}
          textInput={text}
          setTextInput={setText}
          password={password}
          setPassword={setPassword}
        />
      </>
    );
  }
}
