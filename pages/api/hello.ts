import type { NextApiRequest, NextApiResponse } from 'next';
import { data } from '$utils/mockdata';
import _ from 'lodash';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the transaction is in the year 2022
  // If there is no transaction, it will return an empty array
  // Check using array.length > 0
  const twentytwentytwo = _.filter(data, ({ dateTimestamp }) => {
    return new Date(dateTimestamp).getFullYear() === 2022;
  });

  // Group by month in the year 2022
  // 0 based index i.e. to get january transaction use month2022['0']
  const month2022 = _.groupBy(twentytwentytwo, ({ dateTimestamp }) => {
    return new Date(dateTimestamp).getMonth();
  });

  // Available month simply do below
  // If there is no transaction in that month, simply there is no key
  const availableMonth2022 = Object.keys(month2022);

  // Group by types of transaction in a month (in and out)
  const groupDirection = _.groupBy(month2022['8'], ({ direction }) => {
    return direction;
  });

  // Check the total sum of income in a particular month
  const totalIncome = _.reduce(
    groupDirection['in'],
    (result, { amount }) => {
      return (result += amount);
    },
    0
  );

  // Check the total sum of EXPENSE in a particular month
  const totalExpense = _.reduce(
    groupDirection['out'],
    (result, { amount }) => {
      return (result += amount);
    },
    0
  );

  // Check the highest amount of transaction in a particular month
  // return an object
  // Jadi bisa ambil "kapannya" `new Date(highestAmount.dateTimestamp)`
  // Bisa juga ambil "apanya" `highestAmount.description`
  const highestAmount = _.maxBy(groupDirection['out'], ({ amount }) => {
    return amount;
  });

  // Ini buat heatmap
  // Ini buat transaction in a particular month
  // Jadi gua group by day dulu (ini mulai dari 1 bukan 0)
  const groupbyDay = _.groupBy(groupDirection['out'], ({ dateTimestamp }) => {
    return new Date(dateTimestamp).getDate();
  });
  // Abis itu gua for loop-in
  // Heatmap butuh array yang isinya object {date: ..., count: ...}
  let arr = [] as any;
  for (const date in groupbyDay) {
    arr.push({
      date: new Date(`2022-09-${Number(date) < 10 ? `0${date}` : date}`),
      count: groupbyDay[date].length,
    });
  }

  res.status(200).json(arr);
}
