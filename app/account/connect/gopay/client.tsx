'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Form from './Form';
import Connecting from '$lib/Connecting';
import {
  connectGopayFive,
  connectGopayFour,
  connectGopayOne,
  connectGopayThree,
  connectGopayTwo,
  expiredGopayFour,
  expiredGopayOne,
  expiredGopayThree,
  expiredGopayTwo,
} from './promise';

export default function Client({
  token,
  expired,
  accountId,
}: {
  token: string;
  expired: boolean;
  accountId: number | null;
}) {
  const router = useRouter();
  const [connecting, setConnecting] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpData, setOtpData] = useState<ExtendedBrickGojekOTPData>(
    {} as ExtendedBrickGojekOTPData
  );

  const connect = [
    {
      promiseFn: connectGopayOne({
        otpData,
        token,
        otp,
      }),
      isLoadingText: 'Verifikasi OTP dan membangun koneksi Gopay...',
      isErrorText: 'Error verifikasi OTP dan membangun koneksi Gopay',
      isSuccessText: 'Sukses verifikasi OTP dan membangun koneksi Gopay',
      defaultText: 'Menyambungkan dengan Gopay',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return connectGopayTwo(param);
      },
      isLoadingText: 'Sedang mengambil detail akun Gopay-mu...',
      isErrorText: 'Error mengambil detail akun Gopay-mu',
      isSuccessText: 'Sukses mengambil detail akun Gopay-mu',
      defaultText: 'Mengambil detail akun Gopay-mu',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return connectGopayThree(param);
      },
      isLoadingText: 'Sedang membangun koneksi database Kudoku...',
      isErrorText: 'Error membangun koneksi database Kudoku',
      isSuccessText: 'Sukses membangun koneksi database Kudoku',
      defaultText: 'Membangun koneksi database Kudoku',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return connectGopayFour(param);
      },
      isLoadingText: 'Sedang membaca data transaksi Gopay...',
      isErrorText: 'Error membaca data transaksi Gopay',
      isSuccessText: 'Sukses membaca data transaksi Gopay',
      defaultText: 'Membaca data transaksi Gopay',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return connectGopayFive(param);
      },
      isLoadingText: 'Sedang membuat database transaksi Kudoku...',
      isErrorText: 'Error membuat database transaksi Kudoku',
      isSuccessText: 'Sukses membuat database transaksi Kudoku',
      defaultText: 'Membuat database transaksi Kudoku',
    },
  ];

  const refresh = [
    {
      promiseFn: expiredGopayOne({
        accountId: accountId ?? 0,
        otpData,
        otp,
        token,
      }),
      isLoadingText: 'Verifikasi OTP dan membangun koneksi Gopay...',
      isErrorText: 'Error verifikasi OTP dan membangun koneksi Gopay',
      isSuccessText: 'Sukses verifikasi OTP dan membangun koneksi Gopay',
      defaultText: 'Menyambungkan dengan Gopay',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return expiredGopayTwo(param);
      },
      isLoadingText: 'Sedang membangun koneksi database Kudoku...',
      isErrorText: 'Error membangun koneksi database Kudoku',
      isSuccessText: 'Sukses membangun koneksi database Kudoku',
      defaultText: 'Membangun koneksi database Kudoku',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return expiredGopayThree(param);
      },
      isLoadingText: 'Sedang membaca data transaksi Gopay...',
      isErrorText: 'Error membaca data transaksi Gopay',
      isSuccessText: 'Sukses membaca data transaksi Gopay',
      defaultText: 'Membaca data transaksi Gopay',
    },
    {
      promiseFn: (data: any) => {
        const param = { ...data };
        return expiredGopayFour(param);
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
          handleClick={() => {
            setConnecting(true);
          }}
          setOtpData={setOtpData}
          token={token}
          otp={otp}
          setOtp={setOtp}
        />
      </>
    );
  }
}
