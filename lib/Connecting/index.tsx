'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { LoadingPromise } from './atomic/LoadingPromise';

interface ConnectingProps {
  promises: {
    // eslint-disable-next-line no-unused-vars
    promiseFn: (arg0?: object | any | unknown) => Promise<any | unknown>;
    isLoadingText: string;
    isErrorText: string;
    isSuccessText: string;
    defaultText: string;
  }[];
  onFulfilled: () => void;
  onRejected: () => void;
}

export default function Connecting({
  promises,
  onFulfilled,
  onRejected,
}: ConnectingProps) {
  // loading state
  const [isLoading, setIsLoading] = useState<boolean[]>(
    promises.map(() => false)
  );

  //error state
  const [isError, setIsError] = useState<boolean[]>(promises.map(() => false));

  //success state
  const [isSuccess, setIsSuccess] = useState<boolean[]>(
    promises.map(() => false)
  );

  //all the data
  const dataRef = useRef<any[]>(promises.map(() => undefined));
  const [data, setData] = useState<any[]>(dataRef.current);

  //timer
  const [timer, setTimer] = useState(0);

  //any of the promises is rejected or stop running
  const [stopTimer, setStopTimer] = useState(false);

  useEffect(() => {
    let interval: any;
    interval = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
      if (stopTimer) {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [stopTimer]);

  useEffect(() => {
    let numResolved = 0;
    const executePromises = async () => {
      for (let i = 0; i < promises.length; i++) {
        const promise = promises[i];
        setIsLoading((prev) => prev.map((_, j) => (j === i ? true : prev[j])));
        try {
          if (i === 0) {
            const response = await promise.promiseFn();
            dataRef.current[i] = response;
            setData(dataRef.current);
          } else {
            const response = await promise.promiseFn(data[i - 1]);
            dataRef.current[i] = response;
            setData(dataRef.current);
          }
          setIsSuccess((prev) =>
            prev.map((_, j) => (j === i ? true : prev[j]))
          );
          numResolved++;
        } catch {
          setIsLoading((prev) =>
            prev.map((_, j) => (j === i ? false : prev[j]))
          );
          setIsError((prev) => prev.map((_, j) => (j === i ? true : prev[j])));
          setStopTimer(true);
          throw new Error();
        } finally {
          setIsLoading((prev) =>
            prev.map((_, j) => (j === i ? false : prev[j]))
          );
        }
      }
      if (numResolved === promises.length) {
        setStopTimer(true); // stop the timer if all promises are resolved successfully
      }
    };

    executePromises()
      .then(() => {
        onFulfilled();
      })
      .catch(() => {
        onRejected();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="w-full h-fit flex flex-col justify-center items-center my-10"
    >
      <p className=" text-onPrimaryContainer dark:text-surfaceVariant text-sm">
        {timer} detik
      </p>
      <div className="w-fit h-fit flex flex-col gap-8 items-start relative mt-5">
        {promises.map((val, index) => {
          return (
            <div
              className="w-fit h-fit flex gap-3 items-center justify-center z-10"
              key={index}
            >
              <LoadingPromise
                state={{
                  isLoading: isLoading[index],
                  isError: isError[index],
                  isSuccess: isSuccess[index],
                }}
                text={{
                  loading: val.isLoadingText,
                  success: val.isSuccessText,
                  error: val.isErrorText,
                  default: val.defaultText,
                }}
              />
            </div>
          );
        })}

        <div className="absolute h-full w-[5px] bg-gray-500 left-[12.5px]" />
      </div>
    </motion.div>
  );
}
