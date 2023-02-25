import type { NextApiRequest, NextApiResponse } from 'next';
import { brickUrl, brickPublicAccessToken } from '$utils/brick';
import axios from 'axios';
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
    accountId,
    username,
    refId,
    deviceId,
    otpNumber,
    pin,
    redirectRefId,
    clientId,
  }: {
    accountId: number;
    username: string;
    refId: string;
    deviceId: string;
    otpNumber: string;
    pin: string;
    redirectRefId: string;
    clientId: number;
  } = req.body;

  if (
    !accountId ||
    !username ||
    !refId ||
    !deviceId ||
    !otpNumber ||
    !pin ||
    !redirectRefId ||
    !clientId
  ) {
    res.status(500).json({ Error: 'Data invalid' });
    throw new Error('Data invalid');
  }

  const account = await prisma.account.findFirst({ where: { id: accountId } });

  if (!account) {
    res.status(500).json({ Error: 'Cannot find the associated accountId' });
    throw new Error('Cannot find the associated accountId');
  }

  /**
   * Get access token
   */

  const tokenUrl = brickUrl(`/v1/auth/ovo/${clientId}`);

  const tokenOptions = {
    method: 'POST',
    url: tokenUrl.href,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${brickPublicAccessToken}`,
    },
    data: {
      username,
      refId,
      deviceId,
      otpNumber,
      pin,
      redirectRefId,
      clientId,
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

  const updatedAccount = await prisma.account.update({
    where: { id: account.id },
    data: { accessToken, expired: false },
  });

  res.status(200).json(updatedAccount);
}
