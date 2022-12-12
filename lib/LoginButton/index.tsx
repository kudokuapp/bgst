'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import LoginModal from './atomic/LoginModal';

export default function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <motion.button
        className="w-full h-fit bg-primary dark:bg-primaryDark py-2 rounded-md shadow-xl text-onPrimary dark:text-onPrimaryDark font-bold text-xl select-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openModal}
      >
        Cobain sekarang
      </motion.button>

      <LoginModal isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
