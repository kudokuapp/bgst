import moment from 'moment';

export default function renderFromDateInit(brickInstitutionId: number) {
  switch (brickInstitutionId) {
    case 2:
    case 37:
    case 38:
      return {
        from: moment().subtract(2, 'M').startOf('M').format('YYYY-MM-DD'),
        to: moment().subtract(1, 'M').endOf('M').format('YYYY-MM-DD'),
      };

    case 11:
      return {
        from: moment('2023-01-01').format('YYYY-MM-DD'),
        to: moment().subtract(1, 'M').endOf('M').format('YYYY-MM-DD'),
      };

    default:
      return {
        from: moment().subtract(2, 'M').startOf('M').format('YYYY-MM-DD'),
        to: moment().subtract(1, 'M').endOf('M').format('YYYY-MM-DD'),
      };
  }
}

export function renderFromDateRefresh(
  brickInstitutionId: number,
  dateTimestamp: string | Date
) {
  const today = moment();
  const latestTransaction = moment(dateTimestamp);

  const diff = today.diff(latestTransaction, 'month');

  let from: string, to: string;

  if (
    brickInstitutionId === 2 ||
    brickInstitutionId === 37 ||
    brickInstitutionId === 38
  ) {
    if (diff >= 3) {
      from = moment().subtract(2, 'M').startOf('M').format('YYYY-MM-DD');
    } else {
      from = latestTransaction.add(1, 'M').startOf('M').format('YYYY-MM-DD');
    }

    to = moment().subtract(1, 'M').endOf('M').format('YYYY-MM-DD');
  } else if (brickInstitutionId === 11) {
    from = latestTransaction.add(1, 'M').startOf('M').format('YYYY-MM-DD');
    to = moment().subtract(1, 'M').endOf('M').format('YYYY-MM-DD');
  } else {
    from = moment().subtract(2, 'M').startOf('M').format('YYYY-MM-DD');
    to = moment().subtract(1, 'M').endOf('M').format('YYYY-MM-DD');
  }

  return {
    from,
    to,
  };
}
