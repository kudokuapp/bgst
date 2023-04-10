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

  // REQUIRED BODY DATA
  const { accountId, accessToken }: { accountId: number; accessToken: string } =
    req.body;

  if (!accountId) {
    res.status(500).json({ Error: 'Data is required or invalid' });
    throw new Error('Data is required or invalid');
  }

  await prisma.user.findFirstOrThrow({ where: { email } });

  const account = await prisma.account.update({
    where: { id: accountId },
    data: { expired: false, accessToken },
  });

  const transaction = await prisma.gopayTransaction.findMany({
    where: { accountId },
    orderBy: {
      dateTimestamp: 'desc',
      reference_id: 'desc',
    },
    take: 1,
  });

  res.status(200).json({
    status: 200,
    accountId: account.id,
    accessToken: account.accessToken,
    latestTransaction: transaction[0],
  });
}
