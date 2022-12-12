'use client';
import styles from './index.module.css';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function WaInput({
  value,
  onChange,
}: {
  value: string | number | readonly string[] | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const [fixLabelTop, setFixLabelTop] = useState(false);
  const [plus62bg, setPlus62bg] = useState(false);

  const id = 'whatsapp';

  return (
    <div
      className={`${styles.container} border-outline dark:border-surface focus-within:border-primary dark:focus-within:border-secondaryDark bg-onPrimary dark:bg-onSurfaceVariant`}
    >
      <div
        className={`${styles.plus62} ${
          plus62bg
            ? 'bg-primary dark:bg-secondaryDark'
            : 'bg-outline dark:bg-surface'
        }`}
      >
        <p
          className={`${styles.plus62__text} text-onPrimary dark:text-onSurfaceVariant dark:focus-within:bg-onSecondaryDark`}
        >
          +62
        </p>
      </div>
      <motion.label
        htmlFor={id}
        initial={{
          top: '0.5rem',
          left: '3.25rem',
          opacity: '0.5',
          scale: '1',
        }}
        animate={{
          top: fixLabelTop ? '-2rem' : '0.5rem',
          left: fixLabelTop ? '-0.5rem' : '3.25rem',
          opacity: fixLabelTop ? '1' : '0.5',
          scale: fixLabelTop ? '0.8' : '1',
        }}
        transition={{ duration: 1, type: 'spring' }}
        className={`${styles.label} text-onPrimaryContainer dark:text-surfaceVariant`}
      >
        WhatsApp
      </motion.label>
      <input
        id={id}
        className={`${styles.input} text-onPrimaryContainer dark:text-surfaceVariant`}
        type="tel"
        maxLength={13}
        onChange={onChange}
        value={value}
        onFocus={(e) => {
          e.target.value.trim() === '' && setFixLabelTop(true);
          setPlus62bg(true);
        }}
        onBlur={(e) => {
          e.target.value.trim() === '' && setFixLabelTop(false);
          setPlus62bg(false);
        }}
        onKeyDown={(e) => {
          if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault();
          }
        }}
      />
    </div>
  );
}
