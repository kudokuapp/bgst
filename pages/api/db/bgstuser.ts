import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '$utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(500).json({ Error: 'Method not allowed' });
    throw new Error('Method not allowed');
  }

  const { email } = req.query;

  const user = await prisma.user.findFirst({
    where: { email: email as string },
  });

  if (!user) {
    res.status(500).json({ Error: 'User not found' });
    throw new Error('User not found');
  }

  res.status(200).json(user);
}
