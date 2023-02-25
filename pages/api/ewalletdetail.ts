import type { NextApiRequest, NextApiResponse } from 'next';
import { decodeAuthHeader } from '$utils/auth';
import { getAccountDetail } from '$utils/brick';
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
  const { whatsapp } = decodeAuthHeader(req.headers.authorization);

  if (!whatsapp) {
    res.status(500).json({ Error: 'Not allowed to do this operation' });
    throw new Error('Not allowed to do this operation');
  }

  // REQUIRED BODY DATA
  const {
    accessToken,
    userId,
    institutionId,
  }: { accessToken: string; userId: number; institutionId: number } = req.body;

  if (!accessToken || !userId || !institutionId) {
    res.status(500).json({ Error: 'Data is required or invalid' });
    throw new Error('Data is required or invalid');
  }

  /**
   * Get account detail
   */
  const accountDetailArr = await getAccountDetail(accessToken).catch((e) => {
    console.error(e);
    res.status(500).json(e);
    throw new Error('Error dari brick, see console');
  });

  let accountDetail: BrickAccountDetail | undefined | null;

  accountDetailArr.forEach((value, index) => {
    if (value.type === 'Wallet') {
      accountDetail = accountDetailArr[index];
    }
  });

  const accountNumber =
    accountDetail!.accountNumber ?? accountDetailArr[0].accountNumber;
  const accountId = accountDetail!.accountId ?? accountDetailArr[0].accountId;

  /**
   * Avoid duplication in the account
   */

  const searchAccount = await prisma.account.findFirst({
    where: { AND: [{ kudosId: userId }, { accountNumber }] },
  });

  if (searchAccount) {
    res.status(500).json({ Error: 'Account already exist' });
    throw new Error('Account already exist');
  }

  const account = await prisma.account.create({
    data: {
      createdAt: new Date(),
      institutionId,
      accessToken,
      kudosId: userId,
      brick_account_id: accountId,
      accountNumber,
      expired: false,
    },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { hasAccount: true },
  });

  res.status(200).json(account);
}
