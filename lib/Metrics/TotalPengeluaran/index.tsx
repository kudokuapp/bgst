'use client';
import { motion } from 'framer-motion';

export default function TotalPengeluaran() {
  return (
    <motion.div
      className="w-fit h-fit flex flex-col items-center gap-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-primary dark:text-primaryDark text-center">
          TOTAL PENGELUARAN
        </p>
        <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
          Total pengeluaran boncooos lo
        </h6>
      </div>
      <motion.div className="bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark w-fit h-fit px-4 py-8 rounded-3xl shadow-md flex flex-col items-center gap-8 select-none max-w-[545px]">
        <h3 className="text-onPrimary dark:text-onPrimaryDark text-4xl font-bold text-center">
          Rp. 12.000.000
        </h3>
        <div className="flex flex-col justify-center items-center">
          <p className="px-1.5 py-1 font-bold text-primary bg-onPrimary dark:text-primaryDark dark:bg-onPrimaryDark rounded-2xl text-center w-fit h-fit">
            SAMA AJA KAYAK
          </p>
          <div className="rounded-2xl bg-onPrimary dark:bg-onPrimaryDark grid grid-cols-3 w-fit h-fit mt-[-5px] gap-0 px-4 py-2">
            <div className="flex flex-col justify-center items-center border-r px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">0.5</span>x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Honda vario 150
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-x px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">12</span>x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Jeans uniqlo
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-l px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base">
                <span className="font-bold">480</span>x
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Rokok filter
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
