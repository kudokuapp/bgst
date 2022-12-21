'use client';
import Lottie from 'lottie-react';
import animation from '$public/lottie/96085-green-check.json';
import moment from 'moment';
import axios from 'axios';

export function ButtonLanjut({
  isBca,
  isGopay,
  response,
  token,
}: {
  isBca: boolean;
  isGopay: boolean;
  response: any[];
  token: string;
}) {
  const renderLink = () => {
    if (isBca) {
      return '/s/bca';
    } else if (isGopay) {
      return '/s/gopay';
    } else {
      return '/';
    }
  };

  function handleClick() {
    const from = moment()
      .startOf('M')
      .subtract(2, 'months')
      .format('YYYY-MM-DD');

    const to = moment().endOf('M').subtract(1, 'months').format('YYYY-MM-DD');

    response.forEach(async (value) => {
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
    });
  }
  return (
    <a
      className="text-primary dark:text-primaryDark text-lg py-1.5 w-full h-fit font-medium text-center"
      href={renderLink()}
      onClick={handleClick}
    >
      Lanjut
    </a>
  );
}

export function LottieSuccess() {
  return (
    <div className="max-w-[200px] w-fit h-fit">
      <Lottie animationData={animation} loop={false} />
    </div>
  );
}
