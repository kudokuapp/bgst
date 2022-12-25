'use client';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

export default function IncomevsExpense({
  totalIncome,
  totalExpense,
}: {
  totalIncome: number;
  totalExpense: number;
}) {
  const totalIncomeNum =
    totalIncome <= 0 || totalIncome === undefined ? 1 : totalIncome;

  const totalExpenseNum =
    totalIncome <= 0 || totalIncome === undefined ? 1 : totalExpense;

  const incomeFormatter = new Intl.NumberFormat('in-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(totalIncome);

  const expenseFormatter = new Intl.NumberFormat('in-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(totalExpense);

  const expensePercentageOfIncome = Math.ceil(
    (totalExpenseNum / totalIncomeNum) * 100
  );

  const incomePercentageOfExpense = Math.ceil(
    (totalIncomeNum / totalExpenseNum) * 100
  );

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} followCursor />
    // eslint-disable-next-line no-unused-vars
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: 'white',
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'white',
      maxWidth: 220,
      fontWeight: 600,
      color: 'rgb(44, 94, 168)',
      fontSize: '1.25rem',
    },
  }));
  return (
    <motion.div
      className="w-fit h-fit flex flex-col items-center gap-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-primary dark:text-primaryDark text-center">
          INCOME VS EXPENSE
        </p>
        <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
          Gali lubang tutup lubang terooos
        </h6>
      </div>
      <motion.div className="bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark w-full h-fit px-4 py-8 rounded-3xl shadow-md flex flex-col items-center gap-8 select-none max-w-[545px] sm:mx-0 mx-4">
        <h3 className="text-onPrimary dark:text-onPrimaryDark text-4xl font-bold text-center">
          Lo abisin {expensePercentageOfIncome}% income lo
        </h3>
        <div className="w-full flex flex-col justify-center items-center gap-12">
          <div className="w-full flex flex-col gap-4">
            <HtmlTooltip title={<Fragment>{incomeFormatter}</Fragment>}>
              <motion.div
                className="w-[100%] h-[80px] bg-green-500 rounded-[16px] relative overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{
                  width: `${
                    totalIncomeNum > totalExpenseNum
                      ? '100%'
                      : `${incomePercentageOfExpense}%`
                  }`,
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.25, type: 'spring', delay: 0.2 }}
              >
                <p className="absolute inset-0 font-bold text-2xl text-green-400 ml-[16px]">
                  PEMASUKAN
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <rect
                    width="100%"
                    height="100%"
                    fill="rgb(34, 197, 94)"
                  ></rect>
                </svg>
              </motion.div>
            </HtmlTooltip>
            <HtmlTooltip title={<Fragment>{expenseFormatter}</Fragment>}>
              <motion.div
                className="w-[100%] h-[80px] bg-red-500 rounded-[16px] relative overflow-hidden"
                initial={{ width: 0 }}
                whileInView={{
                  width: `${
                    totalExpenseNum > totalIncomeNum
                      ? '100%'
                      : `${expensePercentageOfIncome}%`
                  }`,
                }}
                viewport={{ once: true }}
                transition={{ duration: 1.25, type: 'spring', delay: 0.2 }}
              >
                <p className="absolute inset-0 font-bold text-2xl text-red-400 ml-[16px]">
                  PENGELUARAN
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                >
                  <rect width="100%" height="100%" fill="rgb(239, 68, 68)" />
                </svg>
              </motion.div>
            </HtmlTooltip>
          </div>
          <div className="rounded-2xl bg-onPrimary dark:bg-onPrimaryDark grid grid-cols-2 w-full h-fit mt-[-5px] gap-0 px-4 py-2">
            <div className="flex flex-col justify-center items-center border-r px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base font-bold">
                {incomeFormatter}
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Total pemasukan
              </p>
            </div>
            <div className="flex flex-col justify-center items-center border-l px-4 text-center">
              <p className="text-primary dark:text-primaryDark m-0 text-base font-bold">
                {expenseFormatter}
              </p>
              <p className="text-primary dark:text-primaryDark m-0 text-sm">
                Total pengeluaran
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
