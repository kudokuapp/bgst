import type { NextApiRequest, NextApiResponse } from 'next';
import { brickUrl, brickPublicAccessToken } from '$utils/brick';
import axios from 'axios';
import { decodeAuthHeader } from '$utils/auth';
import { PrismaClient } from '@prisma/client';
import { getAccountDetail, IDetailAccountData, IData } from '../token';

const prisma = new PrismaClient();

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

  const user = await prisma.user.findFirst({ where: { whatsapp } });

  if (!user) {
    res.status(500).json({ Error: 'Cannot find user' });
    throw new Error('Cannot find user');
  }

  // REQUIRED BODY DATA
  const {
    institutionId,
    redirectRefId,
    clientId,
    username,
    sessionId,
    uniqueId,
    otpToken,
    otp,
  }: {
    institutionId: number;
    redirectRefId: number;
    clientId: number;
    username: string;
    sessionId: string;
    uniqueId: string;
    otpToken: string;
    otp: string;
  } = req.body;

  if (
    !institutionId ||
    !redirectRefId ||
    !clientId ||
    !username ||
    !sessionId ||
    !uniqueId ||
    !otpToken ||
    !otp
  ) {
    res.status(500).json({ Error: 'Data invalid' });
    throw new Error('Data invalid');
  }

  const url = brickUrl(`/v1/auth/gopay/${clientId}`);

  const options = {
    method: 'POST',
    url: url.href,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${brickPublicAccessToken}`,
    },
    data: {
      institutionId,
      username,
      redirectRefId,
      sessionId,
      uniqueId,
      otpToken,
      otp,
    },
  };

  const {
    data: { data },
  }: { data: { data: IData } } = await axios.request(options);

  const accountDetailArr = await getAccountDetail(data.accessToken);

  if (!data || !accountDetailArr) {
    res.status(500).json({ Error: 'Error dari brick' });
    throw new Error('Error dari brick');
  }

  let accountDetail: IDetailAccountData | undefined;

  accountDetailArr.forEach((value, index) => {
    if (value.type === 'Wallet') {
      accountDetail = accountDetailArr[index];
    }
  });

  const response = await prisma.account.create({
    data: {
      institutionId: institutionId,
      accessToken: data.accessToken,
      kudosId: user.id,
      brick_account_id:
        accountDetail?.accountId ?? accountDetailArr[0].accountId,
      accountNumber:
        accountDetail?.accountNumber ?? accountDetailArr[0].accountNumber,
    },
  });

  await prisma.user.update({ data: { hasAccount: true }, where: { whatsapp } });

  res.status(200).json(response);
}
