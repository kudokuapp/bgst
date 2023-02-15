import axios from 'axios';

export function connectBcaOne({
  institutionId,
  username,
  password,
  token,
}: {
  institutionId: number;
  username: string;
  password: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/bank/bca/token',
          { institutionId, username, password },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectBcaTwo({
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
          '/api/detail',
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

export function connectBcaThree({
  accountId,
  accessToken,
  token,
}: {
  accountId: number;
  accessToken: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/bank/bca/init',
          { accountId, accessToken },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
