import axios from 'axios';

export function connectDanaOne({
  username,
  token,
  pin,
}: {
  username: string;
  token: string;
  pin: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/brick/mfa/one',
          { institutionId: 46, username, pin, password: null },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectDanaTwo({
  institutionId,
  username,
  sessionId,
  token,
  redirectRefId,
  clientId,
}: {
  institutionId: number;
  username: string;
  sessionId: string;
  token: string;
  redirectRefId: string;
  clientId: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const options = {
          method: 'POST',
          url: '/api/brick/mfa/two',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: {
            institutionId,
            username,
            sessionId,
            token,
            redirectRefId,
            clientId,
          },
        };

        const { data } = await axios.request(options);
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}
