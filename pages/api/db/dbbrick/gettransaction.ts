import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { decodeAuthHeader } from '$utils/auth';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST' || !req.headers.authorization) {
    res.status(500).json({ Error: 'Method not allowed' });
    throw new Error('Method not allowed');
  }

  // Decode the bearer token and get the whatsapp
  const { whatsapp } = decodeAuthHeader(req.headers.authorization);

  if (!whatsapp) {
    res.status(500).json({ Error: 'Not allowed to do this operation' });
    throw new Error('Not allowed to do this operation');
  }

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) {
    res.status(500).json({ Error: 'Cannot find user' });
    throw new Error('Cannot find user');
  }

  const { institutionId }: { institutionId: number } = req.body;

  if (!institutionId) {
    res.status(500).json({ Error: 'Institution ID is required' });
    throw new Error('Institution ID is required');
  }

  const accounts = await prisma.account.findFirst({
    where: { kudosId: user.id, institutionId },
  });

  if (!accounts || user.hasAccount === false) {
    res
      .status(500)
      .json({ Error: 'User has not been connected with that account yet' });
    throw new Error('User has not been connected with that account yet');
  }

  const response = await prisma.transaction.findMany({
    where: { accountId: accounts.id },
  });

  if (!response) {
    res.status(500).json({ Error: 'Cannot fetch user transaction' });
    throw new Error('Cannot fetch user transaction');
  }

  res.status(200).json(response);
}
