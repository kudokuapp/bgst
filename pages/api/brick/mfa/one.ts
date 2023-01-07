import type { NextApiRequest, NextApiResponse } from 'next';
import {
  // brickUrl,
  // brickPublicAccessToken,
  getClientIdandRedirectRefId,
} from '$utils/brick';
import axios from 'axios';
import { decodeAuthHeader } from '$utils/auth';

interface IData {
  username: string;
  sessionId: string;
  duration: number;
}

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
    username,
    institutionId,
    pin,
    password,
  }: {
    username: string;
    institutionId: number;
    pin: string | null;
    password: string | null;
  } = req.body;

  if (!username || !institutionId) {
    res.status(500).json({ Error: 'Data invalid' });
    throw new Error('Data invalid');
  }

  // Call the function to get ClientId and RedirectRefId needed for getting the access token
  const { clientId, redirectRefId } = await getClientIdandRedirectRefId(
    whatsapp
  );

  // const url = brickUrl(`/v1/auth/${clientId}`);

  const url = new URL(`/v1/auth/${clientId}`, 'https://api.onebrick.io');

  const brickPublicAccessToken =
    process.env.BRICK_PRODUCTION_PUBLIC_ACCESS_TOKEN;

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
      pin,
      password,
    },
  };

  const {
    data: { data },
  }: { data: { data: IData } } = await axios.request(options);

  if (!data) {
    res.status(500).json({ Error: 'Error dari brick' });
    throw new Error('Error dari brick');
  }

  res.status(200).json({
    username: data.username,
    sessionId: data.sessionId,
    redirectRefId,
    clientId,
    institutionId,
  });

  // res.status(200).json(data);
}
