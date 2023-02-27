import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '$utils/pg';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(500).json({ Error: 'Method not allowed' });
    throw new Error('Method not allowed');
  }

  const { email } = req.query;

  const user = await dbQuery(email as string);

  if (!user) {
    res.status(500).json({ Error: 'User not found' });
    throw new Error('User not found');
  }

  res.status(200).json(user);
}

function dbQuery(email: string) {
  const queryString = `SELECT * FROM users_final WHERE email=$1`;
  const arr = [email];
  return new Promise((resolve, reject) => {
    pool.query(queryString, arr, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res.rows[0]);
      }
    });
  });
}
