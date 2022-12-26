import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(500).json({ Error: 'Method not allowed' });
    throw new Error('Method not allowed');
  }

  const { whatsapp, id, email, firstName } = req.body;

  const response = await prisma.user.create({
    data: { id, whatsapp, email, firstName, hasAccount: false },
  });

  if (!response) {
    res.status(500).json({ Error: 'Error creating user' });
    throw new Error('Error creating user');
  }

  res.status(200).json(response);
}
