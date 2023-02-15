import axios from 'axios';

export function connectBSIOne({
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
          '/api/bank/bsi/token',
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

export function connectBSITwo({
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

export function connectBSIThree({
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
          '/api/bank/bsi/init',
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
