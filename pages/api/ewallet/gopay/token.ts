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
  const { email } = decodeAuthHeader(req.headers.authorization);

  if (!email) {
    res.status(500).json({ Error: 'Not allowed to do this operation' });
    throw new Error('Not allowed to do this operation');
  }

  //   Find the user in our database
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    res.status(500).json({ Error: 'Cannot find user' });
    throw new Error('Cannot find user');
  }

  // REQUIRED BODY DATA
  const {
    redirectRefId,
    clientId,
    username,
    sessionId,
    uniqueId,
    otpToken,
    otp,
  }: {
    redirectRefId: number;
    clientId: number;
    username: string;
    sessionId: string;
    uniqueId: string;
    otpToken: string;
    otp: string;
  } = req.body;

  if (
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

  /**
   * Get access token
   */

  const tokenUrl = brickUrl(`/v1/auth/gopay/${clientId}`);

  const tokenOptions = {
    method: 'POST',
    url: tokenUrl.href,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${brickPublicAccessToken}`,
    },
    data: {
      institutionId: 11,
      username,
      redirectRefId,
      sessionId,
      uniqueId,
      otpToken,
      otp,
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

  res.status(200).json({ accessToken, userId: user.id, institutionId: 11 });
}
