import moment from 'moment';
import { month } from './dateArray';

export default function getLastTransaction(date: Date, account: string) {
  let lastMonthTransaction: string, lastYearTransaction: string;

  switch (account) {
    case 'bca':
      lastMonthTransaction =
        month[moment(date).subtract(2, 'M').startOf('M').month()];
      lastYearTransaction = moment(date)
        .subtract(2, 'M')
        .startOf('M')
        .year()
        .toString();
      break;

    case 'bni':
      lastMonthTransaction =
        month[moment(date).subtract(5, 'M').startOf('M').month()];
      lastYearTransaction = moment(date)
        .subtract(5, 'M')
        .startOf('M')
        .year()
        .toString();
      break;

    case 'bsi':
      lastMonthTransaction =
        month[moment(date).subtract(5, 'M').startOf('M').month()];
      lastYearTransaction = moment(date)
        .subtract(5, 'M')
        .startOf('M')
        .year()
        .toString();
      break;

    case 'bri':
      lastMonthTransaction =
        month[moment(date).subtract(5, 'M').startOf('M').month()];
      lastYearTransaction = moment(date)
        .subtract(5, 'M')
        .startOf('M')
        .year()
        .toString();
      break;

    case 'mandiri':
      lastMonthTransaction =
        month[moment(date).subtract(5, 'M').startOf('M').month()];
      lastYearTransaction = moment(date)
        .subtract(5, 'M')
        .startOf('M')
        .year()
        .toString();
      break;

    case 'ovo':
      lastMonthTransaction =
        month[moment(date).subtract(5, 'M').startOf('M').month()];
      lastYearTransaction = moment(date)
        .subtract(5, 'M')
        .startOf('M')
        .year()
        .toString();
      break;

    case 'gopay':
      lastMonthTransaction = month[0];
      lastYearTransaction = '2022';
      break;

    case 'shopeepay':
      lastMonthTransaction = month[0];
      lastYearTransaction = '2022';
      break;

    default:
      lastMonthTransaction = month[0];
      lastYearTransaction = '2022';
      break;
  }

  return `${lastMonthTransaction} ${lastYearTransaction}`;
}
