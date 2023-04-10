import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

interface ILoadingPromise {
  state: ILoadingPromiseState;
  text: ILoadingPromiseText;
}

type ILoadingPromiseText = {
  loading: string;
  success: string;
  error: string;
  default: string;
};

type ILoadingPromiseState = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export function LoadingPromise({ state, text }: ILoadingPromise) {
  if (state.isLoading) {
    return (
      <>
        <div className="w-[30px] h-[30px] dark:bg-white bg-gray-300 rounded-full flex items-center justify-center shadow-inner">
          <motion.div
            style={{
              width: 20,
              height: 20,
              boxSizing: 'border-box',
              border: '3px solid',
              borderRadius: '100%',
              borderColor: '#FFECD1',
              borderRightColor: '#659EF5',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <p className="font-medium text-onPrimaryContainer dark:text-surfaceVariant text-lg">
          {text.loading}
        </p>
      </>
    );
  } else if (state.isError) {
    return (
      <>
        <div className="w-[30px] h-[30px] dark:bg-white bg-gray-300 rounded-full flex items-center justify-center shadow-inner">
          <motion.div
            variants={{
              initial: { scale: 0 },
              animate: { scale: 1, transition: { duration: 0.5 } },
              exit: { scale: 0, transition: { duration: 0.5 } },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FontAwesomeIcon icon={faXmark} color="red" size="lg" />
          </motion.div>
        </div>
        <p className="font-medium dark:text-red-500 text-red-800 text-lg">
          {text.error}
        </p>
      </>
    );
  } else if (state.isSuccess) {
    return (
      <>
        <div className="w-[30px] h-[30px] dark:bg-white bg-gray-300 rounded-full flex items-center justify-center shadow-inner">
          <motion.div
            variants={{
              initial: { scale: 0 },
              animate: { scale: 1, transition: { duration: 0.5 } },
              exit: { scale: 0, transition: { duration: 0.5 } },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <FontAwesomeIcon icon={faCheck} color="green" size="lg" />
          </motion.div>
        </div>
        <p className="font-medium dark:text-green-500 text-green-800 text-lg">
          {text.success}
        </p>
      </>
    );
  } else {
    return (
      <>
        <div className="w-[30px] h-[30px] dark:bg-white bg-gray-300 rounded-full shadow-inner" />
        <p className="font-medium text-onPrimaryContainer dark:text-surfaceVariant text-lg">
          {text.default}
        </p>
      </>
    );
  }
}
