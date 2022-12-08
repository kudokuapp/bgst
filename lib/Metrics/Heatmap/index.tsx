'use client';
import { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '$styles/page.css';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';

export default function Heatmap() {
  const [total, setTotal] = useState(0);
  const endMonth = new Date('2022-11-30');
  const startMonth = new Date('2022-10-31');

  function shiftDate(date: string | Date, numDays: number) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count: number) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const nameDate = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jumat',
    'Sabtu',
  ];

  const nameMonth = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const randomValues = getRange(30).map((index) => {
    return {
      date: shiftDate(endMonth, -index),
      count: getRandomInt(0, 9),
    };
  });

  useEffect(() => {
    let totalSum = 0;

    for (const value of randomValues) {
      totalSum += value.count;
    }

    setTotal(totalSum);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="w-fit h-fit flex flex-col items-center gap-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-sm font-bold text-primary dark:text-primaryDark text-center">
          TOTAL TRANSAKSI
        </p>
        <h6 className="text-4xl font-bold text-onPrimaryContainer dark:text-surfaceVariant text-center">
          Berapa kali lo abisin duit lo dan gimana
        </h6>
      </div>
      <motion.div className="bg-gradient-to-br from-primary to-secondary dark:from-primaryDark dark:to-secondaryDark w-fit h-fit px-4 py-8 rounded-3xl shadow-md select-none max-w-[545px] flex flex-col gap-8">
        <h3 className="text-onPrimary dark:text-onPrimaryDark text-4xl font-bold text-center">
          Di bulan November 2022, lo abisin {`${total}`}x transaksi
        </h3>
        <div className="flex items-center justify-center w-full h-full bg-yellow-200 pl-[50px] rounded-2xl pb-6">
          <div className="w-full h-full">
            <CalendarHeatmap
              startDate={startMonth}
              endDate={endMonth}
              values={randomValues}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty';
                }
                return `color-kudoku-${value.count}`;
              }}
              tooltipDataAttrs={(value: any) => {
                const date = new Date(value.date.toISOString());
                return {
                  'data-tip': `Jumlah transaksi hari ${
                    nameDate[date.getDay()]
                  }, ${date.getDate()} ${nameMonth[date.getMonth()]}: ${
                    value.count
                  }`,
                };
              }}
              showWeekdayLabels={true}
              showMonthLabels={false}
              horizontal={false}
              gutterSize={8}
              showOutOfRangeDays={false}
            />
          </div>
          <ReactTooltip />
        </div>
      </motion.div>
    </motion.div>
  );
}
