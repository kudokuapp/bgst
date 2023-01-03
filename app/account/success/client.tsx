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

    response.forEach((value) => {
      let name: string = '';
      if (
        value.institutionId === 2 ||
        value.institutionId === 37 ||
        value.institutionId === 38
      ) {
        name = 'BCA';
      } else if (value.institutionId === 11) {
        name = 'Gopay';
      }

      toast.promise(promiseToast(value, token, from, to), {
        loading: `Lagi ambil data ${name} kamu...`,
        success: `Sukses ambil data ${name}`,
        error: `Error ambil data ${name}`,
      });
    });

    router.push('/t');
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
  institutionId: number,
  token: string,
  from: string,
  to: string
) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const options = {
          method: 'POST',
          url: '/api/brick/transaction',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: { institutionId, from, to },
        };

        const response = await axios.request(options);

        resolve(response);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
