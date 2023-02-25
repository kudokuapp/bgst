import axios from 'axios';

export function connectBniOne({
  username,
  password,
  token,
}: {
  username: string;
  password: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/bank/bni/token',
          { username, password },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectBniTwo({
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

export function connectBniThree({
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
          '/api/bank/bni/init',
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

export function refreshBniOne({
  username,
  password,
  accountId,
  token,
}: {
  username: string;
  password: string;
  accountId: number;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/bank/bni/refreshtoken',
          { username, password, accountId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function refreshBniTwo({
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
          '/api/bank/bni/refresh',
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
