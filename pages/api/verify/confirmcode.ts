import client from '$utils/twilio';
import { NextApiRequest, NextApiResponse } from 'next';
import * as jwt from 'jsonwebtoken';

/*
 * @see https://beta.nextjs.org/docs/data-fetching/api-routes
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(500).json({ Error: 'Method not allowed' });
    throw new Error('Method not allowed');
  }

  const APP_SECRET = process.env.APP_SECRET as string;

  const { code, receiver } = req.body;

  try {
    const response = await client.verify.v2
      .services(process.env.VERIFY_SERVICE_SID as string)
      .verificationChecks.create({ to: receiver, code: code });

    if (!response.valid) {
      res.status(500).json({ Error: 'OTP is not valid' });
      throw new Error('OTP is not valid');
    }

    const token = jwt.sign({ receiver }, APP_SECRET);
    res.status(200).json(token);
  } catch (err: any) {
    res.status(500).json({ Error: 'Server error, see console' });
    throw new Error(err);
  }
}
