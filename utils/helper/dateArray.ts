export const month = [
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

export const shortMonth = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

export const year = ['2022', '2023'];

export function availableMonthArray(availableMonth: string[] | number[]) {
  const availableMonthArr = new Array(12);

  for (let i = 0; i < availableMonth.length; i++) {
    const element = availableMonth[i];

    availableMonthArr[Number(element)] = Number(element);
  }

  return month.map((value, index) => {
    return {
      id: index,
      value: value,
      available: index === Number(availableMonthArr[index]),
    };
  });
}
