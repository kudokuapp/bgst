'use client';
import Lottie from 'lottie-react';
import animation from '$public/lottie/96085-green-check.json';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export function ButtonLanjut({
  response,
  token,
}: {
  response: any[];
  token: string;
}) {
  const router = useRouter();

  function handleClick() {
    const from = moment()
      .startOf('M')
      .subtract(2, 'months')
      .format('YYYY-MM-DD');

    const to = moment().endOf('M').subtract(1, 'months').format('YYYY-MM-DD');

    toast
      .promise(promiseToast(response, token, from, to), {
        loading: 'Lagi ambil data kamu...',
        success: 'Sukses ambil data',
        error: 'Error ambil data',
      })
      .then(() => {
        // ON FULFILLED
        router.push('/t');
      });
  }
  return (
    <button
      className="text-primary dark:text-primaryDark text-lg py-1.5 w-full h-fit font-medium text-center"
      onClick={handleClick}
    >
      Lanjut
    </button>
  );
}

export function LottieSuccess() {
  return (
    <div className="max-w-[200px] w-fit h-fit">
      <Lottie animationData={animation} loop={false} />
    </div>
  );
}

function promiseToast(
  responseArr: any[],
  token: string,
  from: string,
  to: string
) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        responseArr.forEach(async (value) => {
          const options = {
            method: 'POST',
            url: '/api/brick/transaction',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            data: { institutionId: value, from, to },
          };

          await axios.request(options);

          resolve('Sukses');
        });
      } catch (e) {
        reject(e);
      }
    })();
  });
}
