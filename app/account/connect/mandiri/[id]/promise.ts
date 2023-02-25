import axios from 'axios';

export function connectMandiriOne({
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
          '/api/bank/mandiri/token',
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

export function connectMandiriTwo({
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

export function connectMandiriThree({
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
          '/api/bank/mandiri/init',
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

export function refreshMandiriOne({
  accountId,
  institutionId,
  username,
  password,
  token,
}: {
  accountId: number;
  institutionId: number;
  username: string;
  password: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/bank/mandiri/refreshtoken',
          { institutionId, username, password, accountId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function refreshMandiriTwo({
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
          '/api/bank/mandiri/refresh',
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
