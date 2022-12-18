import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '$utils/pg';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ test: process.env.ACCOUNT_SID });
}
