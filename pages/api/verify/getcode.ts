import client from '$utils/twilio';
import { NextApiRequest, NextApiResponse } from 'next';

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

  const { type, receiver } = req.body;

  const whatsapp = `+62${receiver}`;

  try {
    const response = await client.verify
      .services(process.env.VERIFY_SERVICE_SID as string)
      .verifications.create({
        to: whatsapp,
        channel: type,
        locale: 'id',
      });
    res.status(200).json(response);
  } catch (err: any) {
    res.status(500).json({ Error: 'Server error, check console' });
    throw new Error(err);
  }
}
