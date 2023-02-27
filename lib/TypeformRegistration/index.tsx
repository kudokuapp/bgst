'use client';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PopupButton } from '@typeform/embed-react';
import type { Percentage } from '$lib/ProgressButton';

export default function TypeformRegistration({
  email,
  onSubmit = () => {},
  from = '10%',
  to = '100%',
}: {
  email: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (e: any) => void;
  from?: Percentage;
  to?: Percentage;
}) {
  return (
    <div className="w-full h-fit flex flex-col gap-10 mt-8">
      <div className="w-full h-fit flex justify-end items-end">
        <motion.button
          type="button"
          animate={{
            opacity: 1,
          }}
          initial={false}
          whileHover={{ scale: [null, 1.3, 1.1] }}
          transition={{ duration: 0.5 }}
        >
          <PopupButton
            id="e6haAlGW"
            hidden={{
              index: '3',
              email,
            }}
            onSubmit={onSubmit}
            className="py-2 px-4 cursor-pointer rounded-md shadow-xl font-bold flex gap-2 items-center justify-center text-base select-none bg-primary dark:bg-primaryDark text-onPrimary dark:text-onPrimaryDark"
          >
            Isi Form
            <FontAwesomeIcon icon={faArrowRight} />
          </PopupButton>
        </motion.button>
      </div>
      <motion.div
        className="h-[5px] bg-primary dark:bg-primaryDark rounded-md"
        animate={{ width: to }}
        style={{
          width: from,
        }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}
