import axios from 'axios';

export function connectGopayOne({
  username,
  token,
}: {
  username: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const { data } = await axios.post(
          '/api/ewallet/gopay/otp',
          { username },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resolve(data);
      } catch (e) {
        reject(e);
      }
    })();
  });
}

export function connectGopayTwo({
  redirectRefId,
  clientId,
  sessionId,
  uniqueId,
  otpToken,
  otp,
  username,
  token,
}: {
  redirectRefId: string;
  clientId: string;
  sessionId: string;
  uniqueId: string;
  otpToken: string;
  otp: string;
  username: string;
  token: string;
}) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const options = {
          method: 'POST',
          url: '/api/ewallet/gopay/init',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          data: {
            redirectRefId,
            clientId,
            username,
            sessionId,
            uniqueId,
            otpToken,
            otp,
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
