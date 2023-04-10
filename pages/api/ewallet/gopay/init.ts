import type { NextApiRequest, NextApiResponse } from 'next';
import { decodeAuthHeader } from '$utils/auth';
import prisma from '$utils/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if HTTP POST and have a bearer token
  if (req.method !== 'POST' || !req.headers.authorization) {
    res.status(500).json({ Error: 'Method not allowed' });
    throw new Error('Method not allowed');
  }

  // Decode the bearer token and get the whatsapp
  const { email } = decodeAuthHeader(req.headers.authorization);

  if (!email) {
    res.status(500).json({ Error: 'Not allowed to do this operation' });
    throw new Error('Not allowed to do this operation');
  }

  const user = await prisma.user.findFirstOrThrow({ where: { email } });

  // REQUIRED BODY DATA
  const {
    accessToken,
    accountNumber,
    brick_account_id,
  }: {
    accessToken: string;
    accountNumber: string;
    brick_account_id: string;
  } = req.body;

  if (!accessToken || !accountNumber || !brick_account_id) {
    res.status(500).json({ Error: 'Data is required or invalid' });
    throw new Error('Data is required or invalid');
  }

  const account = await prisma.account.create({
    data: {
      createdAt: new Date(),
      institutionId: 11,
      accessToken,
      accountNumber,
      brick_account_id,
      kudosId: user.id,
    },
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { hasAccount: true },
  });

  res.status(200).json({
    status: 200,
    accountId: account.id,
    accessToken: account.accessToken,
  });
}
