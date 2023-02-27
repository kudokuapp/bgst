import type { NextApiRequest, NextApiResponse } from 'next';
import { decodeAuthHeader } from '$utils/auth';
import {
  brickPublicAccessToken,
  brickUrl,
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
    institutionId,
    username,
    password,
  }: { institutionId: number; username: string; password: string } = req.body;

  if (!institutionId || !username || !password) {
    res.status(500).json({ Error: 'Data is required or invalid' });
    throw new Error('Data is required or invalid');
  }

  // Make sure that the institutionId is only for BSI

  if (institutionId !== 26 && institutionId !== 34) {
    res.status(500).json({ Error: 'Invalid institution id for BSI' });
    throw new Error('Invalid institution id for BSI');
  }

  /**
   * Get access token
   */

  // Call the function to get ClientId and RedirectRefId needed for getting the access token
  const { clientId, redirectRefId } = await getClientIdandRedirectRefId(
    email
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

  res.status(200).json({ accessToken, userId: user.id, institutionId });
}
