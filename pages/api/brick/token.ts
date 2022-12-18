import type { NextApiRequest, NextApiResponse } from 'next';
import {
  brickUrl,
  brickPublicAccessToken,
  getClientIdandRedirectRefId,
} from '$utils/brick';
import axios from 'axios';
import { decodeAuthHeader } from '$utils/auth';
import { PrismaClient } from '@prisma/client';

export interface IData {
  accessToken: string;
  ubc_id: number;
  bankId: string;
  target: string | URL;
  userId: string;
}

export interface IDetailAccountData {
  accountId: string;
  accountHolder: string;
  accountNumber: string;
  balances: {
    available: number;
    current: number;
    limit: null | number;
  };
  currency: string;
  type?: string;
}

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
    username,
    password,
  }: { institutionId: number; username: string; password: string } = req.body;

  if (!institutionId || !username || !password) {
    res.status(500).json({ Error: 'Data invalid' });
    throw new Error('Data invalid');
  }

  // Call the function to get ClientId and RedirectRefId needed for getting the access token
  const { clientId, redirectRefId } = await getClientIdandRedirectRefId(
    whatsapp
  );

  const url = brickUrl(`/v1/auth/${clientId}`);

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
      password,
      redirectRefId,
    },
  };

  const {
    data: { data },
  }: { data: { data: IData } } = await axios.request(options);

  const accountDetail = await getAccountDetail(data.accessToken);

  if (!data || !accountDetail) {
    res.status(500).json({ Error: 'Error dari brick' });
    throw new Error('Error dari brick');
  }

  const { accountId, accountNumber } = accountDetail[0];

  const response = await prisma.account.create({
    data: {
      institutionId: institutionId,
      accessToken: data.accessToken,
      kudosId: user.id,
      brick_account_id: accountId,
      accountNumber,
    },
  });

  res.status(200).json(response);
}

export async function getAccountDetail(
  accessToken: string
): Promise<IDetailAccountData[]> {
  const url = brickUrl(`/v1/account/list`);

  const options = {
    method: 'GET',
    url: url.href,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          data: { data },
        }: { data: { data: IDetailAccountData[] } } = await axios.request(
          options
        );

        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
