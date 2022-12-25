'use client';
import { useState, useEffect } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import '$styles/page.css';
import { motion } from 'framer-motion';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

export type IData = {
  year: string;
  month: string;
  date: string;
  count: number;
};

export default function Heatmap({
  data,
  month,
  year,
}: {
  data: IData[];
  month: number;
  year: string | number;
}) {
  const [total, setTotal] = useState(0);

  const startDateMoment = moment([year, month - 1]).format('YYYY-MM-DD');

  const endDateMoment = moment(startDateMoment)
    .endOf('month')
    .format('YYYY-MM-DD');

  const startDate = new Date(startDateMoment);
  const endDate = new Date(endDateMoment);

  const heatMapData = data.map((value) => {
    return {
      date: new Date(`${value.year}-${value.month}-${value.date}`),
      count: value.count,
    };
  });

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

  useEffect(() => {
    let totalSum = 0;

    for (const value of data) {
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
          Di bulan {nameMonth[month - 1]} {year}, lo abisin {`${total}`}x
          transaksi
        </h3>
        <div className="flex items-center justify-center w-full h-full bg-yellow-200 pl-[50px] rounded-2xl pb-6">
          <div className="w-full h-full">
            <CalendarHeatmap
              startDate={startDate}
              endDate={endDate}
              values={heatMapData}
              classForValue={(value) => {
                if (!value) {
                  return 'color-kudoku-0';
                } else if (value > 5) {
                  return 'color-kudoku-5';
                } else {
                  return `color-kudoku-${value.count}`;
                }
              }}
              tooltipDataAttrs={(value: any) => {
                if (!value.date) return;
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
