import type { NextApiRequest, NextApiResponse } from 'next';
import { decodeAuthHeader } from '$utils/auth';
import {
  brickPublicAccessToken,
  brickUrl,
  getAccountDetail,
  getClientIdandRedirectRefId,
} from '$utils/brick';
import axios from 'axios';
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

  //   Find the user in our database
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
    res.status(500).json({ Error: 'Data is required or invalid' });
    throw new Error('Data is required or invalid');
  }

  // Make sure that the institutionId is only for BCA

  if (institutionId !== 2 && institutionId !== 37 && institutionId !== 38) {
    res.status(500).json({ Error: 'Invalid institution id for BCA' });
    throw new Error('Invalid institution id for BCA');
  }

  /**
   * Get access token
   */

  // Call the function to get ClientId and RedirectRefId needed for getting the access token
  const { clientId, redirectRefId } = await getClientIdandRedirectRefId(
    whatsapp
  ).catch((e) => {
    console.error(e);
    res.status(500).json(e);
    throw new Error('Error dari brick, see console');
  });

  const tokenUrl = brickUrl(`/v1/auth/${clientId}`);

  const tokenOptions = {
    method: 'POST',
    url: tokenUrl.href,
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
    data: { data: tokenData },
  }: { data: { data: BrickTokenData } } = await axios
    .request(tokenOptions)
    .catch((e) => {
      console.error(e);
      res.status(500).json(e);
      throw new Error('Error dari brick, see console');
    });

  const { accessToken } = tokenData;

  const accountDetail = await getAccountDetail(accessToken).catch((e) => {
    console.error(e);
    res.status(500).json(e);
    throw new Error('Error dari brick, see console');
  });

  const { accountId, accountNumber } = accountDetail[0];

  /**
   * Avoid duplication in the account
   */

  const searchAccount = await prisma.account.findFirst({
    where: { AND: [{ kudosId: user.id }, { accountNumber }] },
  });

  if (searchAccount) {
    res.status(500).json({ Error: 'Account already exist' });
    throw new Error('Account already exist');
  }

  const account = await prisma.account.create({
    data: {
      createdAt: new Date(),
      institutionId,
      accessToken: tokenData.accessToken,
      accountNumber,
      brick_account_id: accountId,
      kudosId: user.id,
    },
  });

  if (!user.hasAccount) {
    await prisma.user.update({
      where: { id: user.id },
      data: { hasAccount: true },
    });
  }

  res.status(200).json(account);
}
