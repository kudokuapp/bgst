import type { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const from = moment().startOf('M').subtract(2, 'months').format('YYYY-MM-DD');

  const to = moment().endOf('M').subtract(1, 'months').format('YYYY-MM-DD');

  const options = {
    method: 'GET',
    url: 'http://localhost:3000/api/brick/transaction',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3aGF0c2FwcCI6Iis2Mjg1MTcxMjMyNDQ5IiwiaWF0IjoxNjcxNjI3MzY2fQ.qZOKJStX7UiOOKcPATSuBCI1AYw6dFXvfiQFi0YMCaI`,
    },
    data: { institutionId: 2, from, to },
  };

  const response = await axios.request(options);

  res.status(200).json(response);
}
