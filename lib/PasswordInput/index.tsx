'use client';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styles from './index.module.css';

export interface IPasswordInput
  extends React.ComponentPropsWithoutRef<'input'> {
  error?: boolean;
  errorMessage?: string;
}

const PasswordInput: React.FC<IPasswordInput> = ({
  id = 'password',
  placeholder,
  className,
  value,
  onChange,
  error,
  errorMessage,
  ...props
}) => {
  const [fixLabelTop, setFixLabelTop] = useState(false);
  const [show, setShow] = useState(false);

  const renderError = () => {
    if (error) {
      return `${styles.shakeit} border-error dark:border-errorDark`;
    } else {
      return 'border-outline dark:border-surface focus-within:border-primary dark:focus-within:border-secondaryDark bg-onPrimary dark:bg-onSurfaceVariant';
    }
  };

  const renderIcon = () => {
    if (show) {
      return (
        <FontAwesomeIcon
          icon={faEye}
          className={`${styles.icon} text-onPrimaryContainer dark:text-surfaceVariant`}
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon={faEyeSlash}
          className={`${styles.icon} text-onPrimaryContainer dark:text-surfaceVariant`}
        />
      );
    }
  };

  return (
    <>
      <div className={`${styles.container} ${renderError()}`}>
        <motion.label
          htmlFor={id}
          animate={{
            top: fixLabelTop ? '-2rem' : '0.5rem',
            left: fixLabelTop ? '-0.5rem' : '0.5rem',
            opacity: fixLabelTop ? '1' : '0.5',
            scale: fixLabelTop ? '0.8' : '1',
          }}
          transition={{ duration: 1, type: 'spring' }}
          className={`${styles.label} text-onPrimaryContainer dark:text-surfaceVariant`}
        >
          {placeholder}
        </motion.label>
        <input
          {...props}
          id={id}
          className={`${styles.input} ${className} text-onPrimaryContainer dark:text-surfaceVariant`}
          type={show ? 'text' : 'password'}
          onChange={onChange}
          value={value}
          onFocus={(e) => e.target.value.trim() === '' && setFixLabelTop(true)}
          onBlur={(e) => e.target.value.trim() === '' && setFixLabelTop(false)}
        />
        <motion.button
          className={styles.button}
          onClick={() => {
            show ? setShow(false) : setShow(true);
          }}
          whileHover={{ scale: [null, 1.2, 1.1] }}
          transition={{ duration: 0.3 }}
          type="button"
        >
          {renderIcon()}
        </motion.button>
      </div>
      {error && (
        <p className={`${styles.errorMessage} text-error dark:text-errorDark`}>
          {errorMessage}
        </p>
      )}
    </>
  );
};

export default PasswordInput;
