import axios from 'axios';

export function brickUrl(endpoint: string) {
  const host =
    process.env.NODE_ENV === 'production'
      ? 'https://api.onebrick.io'
      : 'https://sandbox.onebrick.io';

  return new URL(endpoint, host);
}

export const brickPublicAccessToken =
  process.env.NODE_ENV === 'production'
    ? process.env.BRICK_PRODUCTION_PUBLIC_ACCESS_TOKEN
    : process.env.BRICK_SANDBOX_PUBLIC_ACCESS_TOKEN;

export async function getClientIdandRedirectRefId(
  userId: string
): Promise<BrickGetClientIdandRedirectRefId> {
  const url = brickUrl('/v1/auth/token');

  const redirectUrl = 'https://bgst.kudoku.id';

  const options = {
    method: 'POST',
    url: url.href,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${brickPublicAccessToken}`,
    },
    data: {
      accessToken: brickPublicAccessToken,
      userId,
      redirectUrl,
    },
  };

  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const response = await axios.request(options);
        resolve(response.data.data as BrickGetClientIdandRedirectRefId);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export async function getAccountDetail(
  accessToken: string
): Promise<BrickAccountDetail[]> {
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
        }: { data: { data: BrickAccountDetail[] } } = await axios.request(
          options
        );

        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function findBrickTransactionIndex(
  reference_id: string,
  array: BrickTransactionData[]
): number {
  let index: number = 0;
  for (let i = 0; i < array.length; i++) {
    const element = array[i];

    if (reference_id === element.reference_id) {
      index = i;
    }
  }
  return index;
}
