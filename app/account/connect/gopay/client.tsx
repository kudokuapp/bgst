'use client';

import { motion } from 'framer-motion';
import BCA from '$public/logo/bank/bca.png';
import KlikBCA from '$public/logo/bank/klikbca.png';
import MyBCA from '$public/logo/bank/mybca.png';
import Image from 'next/image';
import Link from 'next/link';
import Gojek from '$public/logo/bank/gojek.png';
import WaInput from '$lib/WaInput';
import { useState } from 'react';

export default function Client() {
  const [input, setInput] = useState('');
  const data = [
    {
      logo: KlikBCA,
      name: 'Klik BCA Internet Banking',
      subname: 'Bank BCA',
      link: '2',
    },
    {
      logo: MyBCA,
      name: 'MyBCA Internet Banking',
      subname: 'Bank BCA',
      link: '37',
    },
    {
      logo: MyBCA,
      name: 'MyBCA Mobile Banking',
      subname: 'Bank BCA',
      link: '38',
    },
  ];
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
        <h6 className="text-onPrimaryContainer dark:text-onPrimaryContainerDark text-base">
          Isi nomor hp gopay kamu
        </h6>
      </div>
      <div className="max-w-[400px] flex flex-col gap-4">
        <WaInput
          onChange={(e) => {
            setInput(e.target.value);
          }}
          id="nomor-gojek"
          placeholder="Nomor HP Gopay"
          value={input}
        />
      </div>
    </motion.div>
  );
}
