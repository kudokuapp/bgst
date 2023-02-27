import type { NextApiRequest, NextApiResponse } from 'next';
import {
  brickUrl,
  brickPublicAccessToken,
  getClientIdandRedirectRefId,
} from '$utils/brick';
import axios from 'axios';
import { decodeAuthHeader } from '$utils/auth';

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
  const { username }: { username: string } = req.body;

  if (!username) {
    res.status(500).json({ Error: 'Data invalid' });
    throw new Error('Data invalid');
  }

  // Call the function to get ClientId and RedirectRefId needed for getting the access token
  const { clientId, redirectRefId } = await getClientIdandRedirectRefId(
    whatsapp
  ).catch((e) => {
    console.error(e);
    res.status(500).json(e);
    throw new Error('Error dari brick, see console');
  });

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
      institutionId: 11,
      username,
      redirectRefId,
    },
  };

  const {
    data: { data },
  }: { data: { data: BrickOTPData } } = await axios
    .request(options)
    .catch((e) => {
      console.error(e);
      res.status(500).json(e);
      throw new Error('Error dari brick, see console');
    });

  res.status(200).json({
    username: data.username,
    uniqueId: data.uniqueId,
    sessionId: data.sessionId,
    otpToken: data.otpToken,
    redirectRefId,
    clientId,
  });
}
