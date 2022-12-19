import axios from 'axios';

export function connectBca({
  institutionId,
  username,
  password,
}: {
  institutionId: number;
  username: string;
  password: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post('/api/brick/token', {
          data: {
            institutionId,
            username,
            password,
          },
        });
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
