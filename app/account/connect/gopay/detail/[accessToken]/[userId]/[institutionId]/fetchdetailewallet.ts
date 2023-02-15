import axios from 'axios';

export function fetchDetailsEWallet({
  userId,
  accessToken,
  institutionId,
  token,
}: {
  userId: number;
  accessToken: string;
  institutionId: number;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/ewalletdetail',
          { userId, accessToken, institutionId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
