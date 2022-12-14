'use client';
import { motion } from 'framer-motion';

export default function TotalPemasukan({
  totalIncome,
}: {
  totalIncome: number;
}) {
  const totalIncomeNum =
    totalIncome <= 0 || totalIncome === undefined ? 1 : totalIncome;

  const formatter = new Intl.NumberFormat('in-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(totalIncome);

  const gajiPNS = 5_901_200;
  const gajiPresiden = 30_240_000;
  const gajiPengangguran = 1;

  return (
    <motion.div
      className="w-fit h-fit flex flex-col items-center gap-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-primary dark:text-primaryDark text-center">
          TOTAL PEMASUKAN
        </p>
        <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
          Total rejeki dari tuhan
        </h6>
      </div>
      <motion.div className="bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark w-fit h-fit px-4 py-8 rounded-3xl shadow-md flex flex-col items-center gap-8 select-none max-w-[545px]">
        <h3 className="text-onPrimary dark:text-onPrimaryDark text-4xl font-bold text-center">
          {formatter}
        </h3>
        <div className="flex flex-col justify-center items-center">
          <p className="px-1.5 py-1 font-bold text-primary bg-onPrimary dark:text-primaryDark dark:bg-onPrimaryDark rounded-2xl text-center w-fit h-fit">
            DIBANDINGIN SAMA
          </p>
          <div className="rounded-2xl bg-onPrimary dark:bg-onPrimaryDark grid grid-cols-3 w-fit h-fit mt-[-5px] gap-0 px-4 py-2">
            <div className="flex flex-col justify-center items-center border-r px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">
                  {(totalIncomeNum / gajiPNS).toFixed(2)}
                </span>
                x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Gaji PNS
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-x px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">
                  {(totalIncomeNum / gajiPresiden).toFixed(2)}
                </span>
                x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Gaji Presiden
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-l px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">
                  {totalIncomeNum / gajiPengangguran}
                </span>
                x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Gaji Pengangguran
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
