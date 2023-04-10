import { motion } from 'framer-motion';

export function ButtonConnect({
  disabled,
  onClick,
}: {
  disabled: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick: (e: any) => void;
}) {
  return (
    <div className="w-full h-fit flex justify-end mt-6">
      <motion.button
        type="button"
        onClick={onClick}
        className={`py-1.5 px-4 cursor-pointer rounded-md shadow-xl font-bold flex gap-2 items-center justify-center text-base select-none ${
          disabled
            ? 'bg-gray-600 dark:bg-gray-300 cursor-not-allowed'
            : 'bg-primary dark:bg-primaryDark cursor-pointer'
        } text-onPrimary dark:text-onPrimaryDark`}
        disabled={disabled}
        animate={{
          opacity: 1,
        }}
        initial={false}
        whileHover={{
          scale: disabled ? 1 : [null, 1.3, 1.1],
        }}
        transition={{ duration: 0.5 }}
      >
        Connect
      </motion.button>
    </div>
  );
}
