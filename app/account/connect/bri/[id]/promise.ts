import axios from 'axios';

export function connectBRI({
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
          '/api/bank/bri/token',
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
