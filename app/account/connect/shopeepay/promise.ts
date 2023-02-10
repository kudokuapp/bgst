import axios from 'axios';

export function connectShopeePayOne({
  username,
  token,
  password,
}: {
  username: string;
  token: string;
  password: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/ewallet/shopeepay/otp',
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

export function connectShopeePayTwo({
  username,
  sessionId,
  token,
  redirectRefId,
  clientId,
}: {
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
          url: '/api/ewallet/shopeepay/init',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: {
            username,
            sessionId,
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
